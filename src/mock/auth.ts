import mock from './mock'

mock.post('/user/login', (req) => {
  return {
    status: 'success',
    data: {
      user: {
        id: 1,
        user_name: 'Carl',
        user_password:
          '$2b$10$xZ.bJZerVzFShYujW5.jM.7jGH9VNda/gQ2JZyzG3RDWfVzil5ZAG',
        user_email: 'carl@verygood.com.tw',
        user_avatar:
          'https://images.pexels.com/photos/6875732/pexels-photo-6875732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJuYW1lIjoiQ2FybCIsInRpbWUiOiIyMDIzLzA3LzE3IDA5OjI4OjM0IiwiaWF0IjoxNjg5NTU3MzE0fQ.o-Yu-vkJoLtXIrDCPgN8-6zNH1P5fu_O2VAGGN5_glM',
    },
  }
})
