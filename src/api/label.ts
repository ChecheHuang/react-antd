import request from '@/lib/request'

export type LabelResponse = Label[]
interface Label {
  id: number
  label_name: string
}
export const label = () => {
  return request.get<Label[]>('/label')
}
