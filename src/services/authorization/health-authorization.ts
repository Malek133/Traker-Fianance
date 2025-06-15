import {
  getUserAuthExtented,
  idAdmin,
} from '@/src/services/authentication/auth-utils'

export const canReadHealth = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const hasRoleAdmin = idAdmin(authUser?.user)
  if (hasRoleAdmin) return true
  return true
}
export const canDeleteHealth = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const hasRoleAdmin = idAdmin(authUser?.user)
  if (hasRoleAdmin) return true
  return true
}

export const canCreateHealth = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const hasRoleAdmin = idAdmin(authUser?.user)
  if (hasRoleAdmin) return true
  return true
}

export const canUpdateHealth = async (resourceUid: string) => {
  const authUser = await getUserAuthExtented()
  const hasRoleAdmin = idAdmin(authUser?.user)
  if (hasRoleAdmin) return true
  return true
}
