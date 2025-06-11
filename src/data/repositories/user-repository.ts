
import {eq, sql} from 'drizzle-orm'


import { users } from '../models/user-model'
import db from '../db/client'
import { CreateUser, UpdateUser } from '@/src/types/domain/user-types'


// POST
export const createUserDao = async (user: CreateUser) => {
  const row = await db
    .insert(users)
    .values({email: user.email, name: user.name})
    .returning()
  return row[0]
}

export const updateUserByUidDao = async (user: UpdateUser, uid: string) => {
  await db
    .update(users)
    .set({...user})
    .where(eq(users.id, uid))
}

// GET
export const getUserByEmailDao = async (email: string) => {
  const row = await db.query.users.findFirst({
    where: (user, {eq}) => eq(user.email, email),
  })
  return row
}
export const getUserByIdDao = async (uid: string) => {
  const row = await db.query.users.findFirst({
    where: (user, {eq}) => eq(user.id, uid),
  })
  return row
}
export const getPublicUsersWithPaginationDao = async (pagination: {
  limit: number
  offset: number
}) => {
  const [rows, [{count}]] = await Promise.all([
    db
      .select()
      .from(users)
      .where(eq(users.visibility, 'public'))
      .limit(pagination.limit)
      .offset(pagination.offset),
    db
      .select({count: sql<number>`count(*)`})
      .from(users)
      .where(eq(users.visibility, 'public')),
  ])
  return {
    data: rows.length === 0 ? [] : rows,
    pagination: {
      rowCount: count,
      pageSize: pagination.limit,
    },
  }
}
