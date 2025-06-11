import {
  createUserDao,
  // getPublicUsersWithPaginationDao,
  getUserByEmailDao,
  getUserByIdDao,
  updateUserByUidDao,
} from '@/src/data/repositories/user-repository'
import {getSessionAuth} from './authentication/auth-utils'
import {
  baseUserServiceSchema,
  createUserServiceSchema,
  updateUserServiceSchema,
  userUuidSchema,
} from './validations/user-validation'
import {GrantedError} from './errors/granted-error'
import {ParsedError} from './errors/parsed-error'
import { CreateUser, UpdateUser } from '../types/domain/user-types'
import { canReadUser, canUpdateUser } from './authorization/service-authorizations/user-authorization'

export const createUser = async (userParams: CreateUser) => {
  const parsed = createUserServiceSchema.safeParse(userParams)
  if (!parsed.success) {
    throw new ParsedError(parsed.error.message)
  }
  const userParamsSanitized = parsed.data
  const user = await createUserDao(userParamsSanitized)
  return user
}
export const updateUser = async (userParams: UpdateUser) => {
  const resourceUid = userParams.id
  const granted = await canUpdateUser(resourceUid)

  if (!granted) {
    throw new GrantedError()
  }

  const userBeforeUpdate = await getUserByIdDao(userParams.id)

  if (!userBeforeUpdate) {
    throw new Error('Utilisateur introuvable')
  }

  const parsed = updateUserServiceSchema.safeParse(userParams)
  if (!parsed.success) {
    throw new ParsedError(parsed.error.message)
  }

  const userParamsSanitized = parsed.data
  await updateUserByUidDao(userParamsSanitized, resourceUid)
  return userBeforeUpdate
}
export const getUser = async () => {
  const session = await getSessionAuth()
  //console.log("session", session)
  if (!session) return
  const uid = session.user?.id ?? ''
  //console.log("uid", uid)
  return await getUserByIdDao(uid)
}
export const getUserId = async () => {
  const user = await getUser()
  if (!user) return
  return user.id
}

export const getUserById = async (id: string) => {
  const parsed = userUuidSchema.safeParse(id)
  if (!parsed.success) {
    throw new ParsedError(parsed.error.message)
  }
  const parsedUuid = parsed.data
  const granted = await canReadUser(parsedUuid)

  if (!granted) {
    throw new GrantedError()
  }
  return await getUserByIdDao(parsedUuid)
}

export const getUserByEmail = async (email: string) => {
  const parsed = baseUserServiceSchema.safeParse({email})
  if (!parsed.success) {
    throw new ParsedError(parsed.error.message)
  }
  const emailParamsSanitized = parsed.data.email
  return await getUserByEmailDao(emailParamsSanitized)
}
