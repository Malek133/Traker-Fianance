import 'server-only'

import {cache} from 'react'
import {notFound,
  //  redirect

} from 'next/navigation'
import {getUser, getUserById, getUserId} from '@/src/services/user-service'
// import {getSessionAuth, isAuthAdmin} from '@/src/services/authentication/auth-utils'
import {User, UserDTO} from '@/src/types/domain/user-types'
import {z} from 'zod'

export const getConnectedUser = cache(async () => {
  const user = await getUser()
  if (!user) return
  return userDTO(user as User)
})

const userIdSchema = z.object({
  id: z.string(),
})

export const getUserByIdDal = cache(async (userId: string) => {
  const validateFields = userIdSchema.safeParse({id: userId})
  if (!validateFields.success) {
    throw new Error('Invalid User')
  }
  const user = await getUserById(userId)
  if (!user) notFound()
  return user
})

export const getUserIdDal = cache(async () => {
  const userId = await getUserId()
  return userId
})

export const getUserDal = cache(async () => {
  const user = await getUser()
  return user
})

export function userDTO(user: User): UserDTO | undefined {
  if (!user) return undefined

  return {
    email: user?.email ?? '',
    name: user?.name ?? '',
    role: user?.role,
  }
}
