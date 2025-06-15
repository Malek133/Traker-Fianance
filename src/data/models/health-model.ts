import {integer, pgEnum, pgTable, timestamp, uuid} from 'drizzle-orm/pg-core'

import {sql} from 'drizzle-orm'
import {users} from './user-model'

export const healthCategoryEnum = pgEnum('health_category', [
  'calories',
  'poids',
  'temps',
])
export const health = pgTable('health', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  value: integer('value').notNull(),
  date: timestamp('date', {withTimezone: true}).notNull(),
  category: healthCategoryEnum('category').notNull(),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id, {onDelete: 'cascade'}),
})

export type HealthModel = typeof health.$inferSelect
export type CreateEditHealthModel = typeof health.$inferInsert
