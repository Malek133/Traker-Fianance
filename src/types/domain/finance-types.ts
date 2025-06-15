import { CreateEditFinanceModel, FinanceModel } from "@/src/data/models/finance-model"

  
  export type Finance = FinanceModel
  export type CreateFinance = CreateEditFinanceModel
  export type UpdateFinance = Finance
  export type DeleteFinance = Pick<Finance, 'id'>
  
  export type FinanceCategory = FinanceModel['category']
  export type CreateEditFinance = Omit<CreateEditFinanceModel, 'userId'> & {
    userId?: string
  }
  
  export type FinanceDTO = Finance
  