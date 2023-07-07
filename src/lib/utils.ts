import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { fromPairs } from 'lodash'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createArray = (length: number) => [...Array(length)]

export function parseQueryParams(url: string) {
  const queryString = url.split('?')[1]
  if (!queryString) {
    return {}
  }
  const pairs = queryString.split('&')
  const pairsArray = pairs.map((pair) => pair.split('='))
  return fromPairs(pairsArray)
}
