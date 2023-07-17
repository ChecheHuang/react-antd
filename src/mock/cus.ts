import { CusResponse } from '@/api/cus'
import mock from './mock'
import { createArray } from '@/lib/utils'
import { fakerZH_TW as faker } from '@faker-js/faker'
export const labels = [
  { id: 1, label_name: '勇敢的' },
  { id: 2, label_name: '誠實的' },
  { id: 3, label_name: '謙遜的' },
  { id: 4, label_name: '慷慨的' },
  { id: 5, label_name: '善良的' },
  { id: 6, label_name: '聰明的' },
  { id: 7, label_name: '創意的' },
  { id: 8, label_name: '堅定的' },
  { id: 9, label_name: '謹慎的' },
  { id: 10, label_name: '熱情的' },
]
const levelOptions = ['銅', '銀', '金', '白金']
const statusOptions = ['新客戶', '舊客戶', '潛在客戶']
const total = 500
let data: CusResponse[] = createArray(total).map((_, index) => {
  const birthDay = randomDate()
  return {
    id: index + 1,
    key: index + 1,
    cus_name: faker.person.fullName(),
    cus_number: randomPhone(),
    cus_email: faker.internet.email(),
    cus_idnumber: generateTWID(),
    cus_birthday: birthDay,
    cus_age: calculateAge(birthDay as unknown as Date) + 1,
    cus_remark: faker.commerce.product(),
    cus_status: getRandomItemFromArray(statusOptions),
    cus_level: getRandomItemFromArray(levelOptions),
    cus_avatar: faker.image.avatar(),
    label_names: getRandomLabels(5),
  }
})
mock.get('/cus', (req) => {
  return {
    status: 'success',
    data: { data, total: data.length },
  }
})
mock.delete('/cus/:id', (req) => {
  const id = req.params?.id
  data = data.filter((cus) => cus.key !== parseInt(id))
  return {
    status: 'success',
    message: 'success',
  }
})
function generateTWID() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const firstLetter = letters[Math.floor(Math.random() * letters.length)]
  const firstDigit = Math.floor(Math.random() * 2) + 1
  let rest = ''

  for (let i = 0; i < 8; i++) {
    rest += Math.floor(Math.random() * 10)
  }

  return `${firstLetter}${firstDigit}${rest}`
}

function randomDate() {
  const today = new Date()
  const hundredYearsAgo = new Date()
  hundredYearsAgo.setFullYear(today.getFullYear() - 70)
  const startDate = hundredYearsAgo.getTime()
  const endDate = today.getTime()
  const randomDate = new Date(startDate + Math.random() * (endDate - startDate))
  const year = randomDate.getFullYear()
  const month = parseInt(String(randomDate.getMonth() + 1).padStart(2, '0'))
  const day = parseInt(String(randomDate.getDate()).padStart(2, '0'))
  return new Date(year, month, day)
}

function randomPhone() {
  let phoneNumber = '09'

  for (let i = 0; i < 8; i++) {
    phoneNumber += Math.floor(Math.random() * 10)
  }

  return phoneNumber
}
function getRandomItemFromArray(arr: any[]) {
  const randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}
function calculateAge(birthday: Date): number {
  const birthDate = new Date(birthday)
  const currentDate = new Date()

  const yearsDiff = currentDate.getFullYear() - birthDate.getFullYear()
  const monthsDiff = currentDate.getMonth() - birthDate.getMonth()
  const daysDiff = currentDate.getDate() - birthDate.getDate()

  if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
    return yearsDiff
  }

  return yearsDiff
}

interface Label {
  id: number
  label_name: string
}

function getRandomLabels(numItems: number): Label[] {
  const randomLabels: Label[] = []

  while (randomLabels.length < numItems) {
    const randomIndex = Math.floor(Math.random() * labels.length)
    const randomLabel = labels[randomIndex]

    if (!randomLabels.some((label) => label.id === randomLabel.id)) {
      randomLabels.push(randomLabel)
    }
  }

  return randomLabels
}
