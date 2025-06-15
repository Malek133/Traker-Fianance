'use client'

import {DataTable, Pagination} from '@/src/components/ui/data-table'

import {FinanceDTO} from '@/src/types/domain/finance-types'
import {financeColumns} from './finance-columns'
// import {canCreateFinance} from '@/services/authorization/finance-authorization'

type FinanceDataTableProps = {
  finances: {
    data: FinanceDTO[]
    pagination: Pagination
  }
}

const FinanceDataTable = ({finances}: FinanceDataTableProps) => {
  return <DataTable columns={financeColumns} dataTable={finances} />
}

export default FinanceDataTable
