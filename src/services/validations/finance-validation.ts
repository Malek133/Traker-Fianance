import {z} from 'zod'
import {
  FinanceCategory,
  CreateEditFinance,
  DeleteFinance,
  UpdateFinance,
} from '@/src/types/domain/finance-types'

export const deleteFinanceSchema = z.object({
  id: z.string(),
}) satisfies z.Schema<DeleteFinance>

export const createFinanceServiceSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  date: z.coerce.date(),
  amount: z.coerce.number(),
  category: z.enum([
    'revenus',
    'dépenses',
    'actifs',
  ]) satisfies z.Schema<FinanceCategory>,
  label: z
    .string()
    .min(2, {
      message: 'Le nom doit contenir au moins 3 caractères.',
    })
    .max(30, {
      message: 'Le nom ne doit pas contenir plus de 30 caractères.',
    }),
}) satisfies z.Schema<CreateEditFinance>

export const updateFinanceServiceShema = createFinanceServiceSchema.extend({
  id: z.string(),
  userId: z.string(),
}) satisfies z.Schema<UpdateFinance>