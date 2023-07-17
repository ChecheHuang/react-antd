import Mock, { MockjsRequestOptions } from 'mockjs'
import { parseQueryParams } from '@/lib/utils'

interface MockRequestMethodOptions extends MockjsRequestOptions {
  query?: { [key: string]: any }
  params?: { [key: string]: any }
}

const prefix = '/api'

const createMockRequestMethod =
  (method: string) =>
  (url: string, callback: (options: MockRequestMethodOptions) => void) => {
    const regex = /\/:[^/]+$/
    const parseUrl = RegExp(prefix + url.replace(regex, '') + '.*')

    Mock.mock(parseUrl, method, (options) => {
      const requestOptions: MockRequestMethodOptions = { ...options }
      const params = compareInputs(prefix + url, options.url)
      requestOptions.params = params
      if (method === 'get') {
        requestOptions.query = parseQueryParams(options.url)
      } else {
        requestOptions.body = JSON.parse(options.body)
      }
      return callback(requestOptions)
    })
  }

const mock = {
  get: createMockRequestMethod('get'),
  post: createMockRequestMethod('post'),
  put: createMockRequestMethod('put'),
  patch: createMockRequestMethod('patch'),
  delete: createMockRequestMethod('delete'),
}

export default mock

function compareInputs(input1: string, input2: string): Record<string, string> {
  const output: Record<string, string> = {}
  const input1Arr: string[] = input1.split('/')
  const input2Arr: string[] = input2.split('/')
  input1Arr.forEach((item: string, index: number) => {
    const regex = /^:/
    if (regex.test(item)) {
      output[item.replace(regex, '')] = input2Arr[index]
    }
  })
  return output
}
