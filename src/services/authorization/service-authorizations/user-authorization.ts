// import type {User} from '@/src/types/domain/user-types'

// import {getUserByIdDao} from '@/src/data/repositories/user-repository'
import {getUserAuthExtented} from '@/src/services/authentication/auth-utils'

// export const canReadUser = async (resourceUid: string) => {
//   // const authUser = await getUserAuthExtented()
//   return true
// }

export const canUpdateUser = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  if (authUser?.user.id === resourceUid || authUser?.role === 'admin')
    return true
  return false
}
