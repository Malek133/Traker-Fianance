import {
  CreateEditHealth,
  DeleteHealth,
  HealthCategory,
} from '@/src/types/domain/health-types'
import {z} from 'zod'

export const deleteHealthSchema = z.object({
  id: z.string(),
}) satisfies z.Schema<DeleteHealth>

export const createHealthServiceSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  date: z.coerce.date(),
  value: z.coerce
    .number({
      invalid_type_error: 'La valeur doit être un nombre.',
      required_error: 'La valeur est requise.',
    })
    .min(1, {
      message: 'La valeur doit être supérieure à 0.',
    }),
  category: z.enum([
    'calories',
    'poids',
    'temps',
  ]) satisfies z.Schema<HealthCategory>,
}) satisfies z.Schema<CreateEditHealth>

export const updateHealthServiceSchema = createHealthServiceSchema.extend({
  id: z.string(),
  userId: z.string(),
})
