import Mock, { MockjsRequestOptions } from 'mockjs'
import { parseQueryParams } from '@/lib/utils'

interface MockRequestMethodOptions extends MockjsRequestOptions {
  query?: { [key: string]: any }
}

const prefix = '/api'

const createMockRequestMethod =
  (method: string) =>
  (url: string, callback: (options: MockRequestMethodOptions) => void) => {
    const parseUrl =
      method === 'get' ? RegExp(prefix + url + '.*') : prefix + url

    Mock.mock(parseUrl, method, (options) => {
      const requestOptions: MockRequestMethodOptions = { ...options }
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
