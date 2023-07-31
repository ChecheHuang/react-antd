/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

function readMeta(filePath) {
  const regex = /\/([^/]+)$/
  const match = filePath.match(regex)
  const lastSegment = match ? match[1] : null
  const metaPath = '../views' + filePath.replace(regex, '/meta.ts')

  return new Promise((resolve) => {
    fs.readFile(path.join(__dirname, metaPath), 'utf8', (err, data) => {
      try {
        let importString = ''

        const importRegex = /import\s.*from\s+['"]([^'"]+)['"]/g
        const matches = data.match(importRegex)
        if (matches && matches.length > 0) {
          matches.forEach((match) => {
            importString += match + '\n'
            data = data.replace(match, '') // 刪除匹配的 import 語句
          })
        }
        const metaRegex = /const\s+meta\s+=\s+/
        let updatedData = data.replace(metaRegex, '')
        const modifiedString = updatedData.replace(
          /icon:\s*([^,\n}]+)/g,
          "icon: '$1'"
        )
        const jsonMeta = eval(`(${modifiedString})`)
        const res = {
          meta: jsonMeta[lastSegment],
          importString,
        }

        resolve(res)
        // resolve(jsonMeta[lastSegment])

        resolve()
      } catch (err) {
        resolve()
      }
    })
  })
}
function findClosestLayout(directory) {
  const files = fs.readdirSync(directory)
  const hasLayout = files.includes('layout.tsx')
  if (hasLayout) {
    return path.join(directory, 'layout.tsx')
  }
  const parentDirectory = path.dirname(directory)
  if (parentDirectory === directory || !directory.includes('views')) {
    return ''
  }
  return findClosestLayout(parentDirectory)
}
async function printDirectoryContents(
  directory,
  parentPath = '/',
  result = {
    arr: [],
    importString: '',
  }
) {
  const files = fs.readdirSync(directory)
  const hasLayout = files.includes('layout.tsx')
  const hasPage = files.includes('page.tsx')
  const closestLayout = findClosestLayout(directory)
    .replace(path.join(__dirname, '../views'), '')
    .replace(/\\/g, '/')
    .replace('.tsx', '')
  for (const file of files) {
    const filePath = path.join(directory, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      const folderPath = path.join(parentPath, file)
      await printDirectoryContents(filePath, folderPath, result)
    } else {
      if (!hasLayout && !hasPage) return
      const filePath = path
        .join(parentPath, file)
        .replace(/\\/g, '/')
        .replace('.tsx', '')
      if (!filePath.endsWith('page') && !filePath.endsWith('layout')) continue
      const fileData = await readMeta(filePath)
      const fileDataImportString = fileData?.importString || ''

      if (!result.importString.includes(fileDataImportString)) {
        result.importString += fileDataImportString
      }
      const routePathRegex = /\/\([^)]*\)/g
      const paramsRegex = /\[(\w+)\]/g
      const routePath =
        filePath
          .replace(routePathRegex, '')
          .replace(paramsRegex, ':$1')
          .replace(/\/(?:page|layout)$/, '') || '/'
      const isLayout = filePath.endsWith('layout')
      const meta = fileData?.meta ? fileData.meta : {}
      if (!meta.label) {
        meta.label = meta.name ? meta.name : routePath
      }
      if (!meta.name) {
        meta.name = meta.label ? meta.label : routePath
      }
      const item = {
        routePath,
        filePath,
        isLayout,
        meta,
        closestLayout,
      }
      if (routePath === '/404') {
        item.meta = {
          label: 'Not Found',
          name: 'Not Found',
          isHidden: true,
        }
        item.routePath = '/*'
        item.closestLayout = ''
      }
      result.arr.push(item)
    }
  }
}
function extractIconNames(code) {
  const regex = /import\s*{([\w\s,]+)}\s*from\s*'@ant-design\/icons'/g
  const matches = code.match(regex)
  let iconNames = []

  if (matches) {
    matches.forEach((match) => {
      const iconRegex = /import\s*{([\w\s,]+)}\s*from\s*'@ant-design\/icons'/
      const [, icons] = match.match(iconRegex)
      const names = icons.split(',').map((name) => name.trim())
      iconNames = iconNames.concat(names)
    })
  }

  return [...new Set(iconNames)]
}
function parentKey(filePath, obj) {
  const keys = Object.keys(obj)
  for (let key of keys) {
    if (key === filePath) continue
    if (filePath.replace('/layout', '').includes(key.replace('/layout', ''))) {
      return key
    }
  }
  return false
}

const createPathArray = async () => {
  const viewsDirectory = path.join(__dirname, '../views')
  const result = {
    arr: [],
    importString: '',
  }
  await printDirectoryContents(viewsDirectory, '/', result)
  result.arr.sort((a, b) => {
    if (a.filePath === a.closestLayout && b.filePath !== b.closestLayout) {
      return -1
    } else if (
      a.filePath !== a.closestLayout &&
      b.filePath === b.closestLayout
    ) {
      return 1
    } else {
      return a.routePath.localeCompare(b.routePath)
    }
  })
  return result
}

function transform(filePath) {
  const regex = /^\(.*\)$/
  const regex2 = /\[(.*?)\]/g
  const component = filePath
    .split('/')
    .filter((str) => !regex.test(str))
    .map((str) => {
      const result =
        str.length > 1
          ? str.slice(0, 1).toUpperCase() + str.slice(1)
          : str.toUpperCase()
      return result.replace(regex2, '$1')
    })
    .reverse()
    .join('')

  return component
}
const createOutput = (arr, initOutputString) => {
  const map = {}
  const result = arr.reduce((acc, cur) => {
    const { routePath, filePath, closestLayout, isLayout, meta } = cur
    const isLazy = meta?.isLazy === undefined ? true : meta.isLazy
    const path = `@/views${filePath}`
    const component = transform(filePath)
    const isNotLazyImport = `
import ${component} from "${path}"`
    const isNotLazyComponent = `<${component}/>`
    const lazyComponent = `LazyLoad(import('${path}'))`
    const element = isLazy ? lazyComponent : isNotLazyComponent
    if (!isLazy) {
      initOutputString += isNotLazyImport
      delete meta.isLazy
    }
    const item = {
      path: routePath === '/' ? '' : routePath,
      element,
      ...meta,
    }
    const condition = {
      isLayout: {
        true: () => {
          map[filePath] = {
            ...item,
            children: [],
          }
          const key = parentKey(filePath, map)
          if (key) {
            map[key].children = addObjectByPathLength(
              map[key].children,
              map[filePath]
            )
          } else {
            acc = [...acc, map[filePath]]
          }
        },
        false: () => {
          if (!closestLayout) {
            map[routePath] = item
            acc = [...acc, map[routePath]]
          } else {
            map[closestLayout].children = addObjectByPathLength(
              map[closestLayout].children,
              item
            )
          }
        },
      },
    }
    condition.isLayout[isLayout]()
    return acc
  }, [])
  const output =
    initOutputString +
    `
const router: Route[] = ${JSON.stringify(result, null, 2)
      .replace(/"LazyLoad\(.*?\)"/g, (match) => match.replace(/"/g, ''))
      .replace(/"(<[^>]+>)"/g, '$1')
      .replace(/("icon":\s*)"([^"]*)"/g, '$1<$2/>')}
export default router
export interface Route {
  path: string
  element: JSX.Element
  name: string
  label: string
  icon?: JSX.Element
  children?: Route[]
  isHidden?: boolean
}

`
  const targetFile = '../router/router.tsx'
  const targetPath = path.resolve(__dirname, targetFile)
  return { output, targetPath }
}
function sortArr(arr) {
  const sortedArr = arr.sort((a, b) => {
    const aHasBrackets = /\[.*\]/.test(a.filePath)
    const bHasBrackets = /\[.*\]/.test(b.filePath)

    if (aHasBrackets && !bHasBrackets) {
      return 1
    } else if (!aHasBrackets && bHasBrackets) {
      return -1
    } else {
      return 0
    }
  })
  const finalArr = sortedArr.sort((a, b) => {
    if (a.filePath === '/404/page') {
      return 1
    } else if (b.filePath === '/404/page') {
      return -1
    } else {
      return 0
    }
  })
  return finalArr
}

function addObjectByPathLength(arr, newObj) {
  arr.sort((a, b) => a.path.length - b.path.length)
  let insertIndex = arr.findIndex(
    (obj) => obj.path.length >= newObj.path.length
  )

  if (insertIndex === -1) {
    arr.push(newObj)
  } else {
    arr.splice(insertIndex, 0, newObj)
  }

  return arr
}

const createRouter = async () => {
  const { arr, importString } = await createPathArray()
  const icons = extractIconNames(importString)
  const iconInput =
    icons.length === 0
      ? ''
      : `import { ${icons.join(',')} } from '@ant-design/icons'`
  let initOutput = `import LazyLoad from "./LazyLoad/LazyLoad"\n${iconInput}`

  const { output, targetPath } = createOutput(sortArr(arr), initOutput)

  fs.writeFileSync(targetPath, output)
}
createRouter()
