import {CreateEditHealthModel, HealthModel} from '@/src/data/models/health-model'

export type Health = HealthModel
export type HealthCategory = Health['category']
export type CreateEditHealth = Omit<CreateEditHealthModel, 'userId'> & {
  userId?: string
}
export type CreateHealth = Omit<Health, 'id' | 'userId'>
export type UpdateHealth = Partial<CreateHealth> & Pick<Health, 'id'>
export type DeleteHealth = Pick<Health, 'id'>

export type HealthDTO = Health
