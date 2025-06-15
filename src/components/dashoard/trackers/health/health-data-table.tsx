'use client'

import {DataTable, Pagination} from '@/src/components/ui/data-table'

import type {ColumnDef} from '@tanstack/react-table'
import {HealthDTO} from '@/src/types/domain/health-types'
import {healthColumns} from './health-columns'

type HealthDataTableClientProps = {
  healthTable: {
    data: HealthDTO[]
    pagination: Pagination
  }
}
const HealthDataTableClient = ({healthTable}: HealthDataTableClientProps) => {
  return <DataTable columns={healthColumns} dataTable={healthTable} />
}

export default HealthDataTableClient
