import {type ClassValue, clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function processUnknownError(error: unknown) {
  console.error('processUnknownError error:', error)
  if (error instanceof Error) {
    return error.message
  } else if (typeof error === 'string') {
    return error
  } else {
    return 'Une erreur inconnue.' as const
  }
}
