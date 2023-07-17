import request from '@/lib/request'

export interface CusResponse {
  key: number
  cus_name: string
  cus_number: string
  cus_email: string
  cus_idnumber: string
  cus_birthday: Date
  cus_age: number
  cus_remark: string
  cus_status: string
  cus_level: string
  cus_avatar: string
  label_names: LabelName[]
}

interface LabelName {
  id: number
  label_name: string
}

export const cusGet = (data: { page?: number; size?: number } = {}) => {
  return request.get<{ data: CusResponse[]; total: number }>('/cus', data)
}

export const cusDelete = (id: number) => {
  return request.delete(`/cus/${id}`)
}
