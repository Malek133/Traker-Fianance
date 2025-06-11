'use server'

import {AuthError} from 'next-auth'
import {processUnknownError} from '@/src/lib/utils'
import {redirect} from 'next/navigation'
import {signOut} from '@/src/services/authentication/auth-service'

export const signOutAction = async () => {
  try {
    await signOut({redirect: false})
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'SignOutError': {
          return 'Erreur lors de la déconnexion' as const
        }
        default: {
          return 'Erreur innatendue.' as const
        }
      }
    }
    return processUnknownError(error)
  }
  redirect('/sign-in')
}