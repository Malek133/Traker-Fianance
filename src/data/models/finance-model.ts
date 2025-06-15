import {
    integer,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uuid,
  } from 'drizzle-orm/pg-core'
  import {relations, sql} from 'drizzle-orm'
  
  import {users} from './user-model'
  
  export const financeCategoryEnum = pgEnum('finance_category', [
    'revenus',
    'dépenses',
    'actifs',
  ])
  
  export const finance = pgTable('finance', {
    id: uuid('id')
      .default(sql`uuid_generate_v4()`)
      .primaryKey(),
    amount: integer('amount').notNull(),
    date: timestamp('date', {withTimezone: true}).notNull(),
    category: financeCategoryEnum('category').notNull(),
    label: text('label').notNull(),
    userId: uuid('userId')
      .notNull()
      .references(() => users.id, {onDelete: 'cascade'}),
  })
  
  export const financeRelations = relations(finance, ({one}) => ({
    user: one(users, {
      fields: [finance.userId],
      references: [users.id],
    }),
  }))
  
  export type FinanceModel = typeof finance.$inferSelect
  export type CreateEditFinanceModel = typeof finance.$inferInsert