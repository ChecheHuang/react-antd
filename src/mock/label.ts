import { labels } from './cus'
import mock from './mock'

mock.get('/label', (res) => {
  return {
    status: 'success',
    data: labels,
  }
})
