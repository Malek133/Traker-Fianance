'use client'

import {Badge} from '@/components/ui/badge'
import type {ColumnDef} from '@tanstack/react-table'
import {DataTableRowActions} from '@/src/components/ui/data-table-row-actions'
import {Finance,
  //  FinanceDTO

} from '@/src/types/domain/finance-types'

import { DataTableColumnHeader } from '@/src/components/ui/data-table-column-header'
import { formattedDate } from '@/src/utils/date-utils'

export const financeColumns: ColumnDef<Finance>[] = [
  {
    accessorKey: 'date',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({row}) => {
      const date = new Date(row.getValue('date'))
      const formatted = formattedDate(date)
      return <div className="min-w-fit text-left md:w-[200px]">{formatted}</div>
    },
    filterFn: (row, date, value) => {
      return value.includes(row.getValue(date))
    },
  },
  {
    accessorKey: 'amount',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Montant" />
    ),
    cell: ({row}) => {
      const amount = Number.parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
      }).format(amount)
      return <div className="min-w-fit text-left">{formatted}</div>
    },
    filterFn: (row, amount, value) => {
      return value.includes(row.getValue(amount))
    },
  },
  {
    accessorKey: 'label',
    header: ({column}) => (
      <DataTableColumnHeader
        column={column}
        title="Libéllé"
        className="hidden md:block"
      />
    ),
    cell: ({row}) => {
      const label = row.getValue('label') as string
      return (
        <div className="-m-4 hidden min-w-fit text-left md:table-cell">
          {label}
        </div>
      )
    },
    filterFn: (row, amount, value) => {
      return value.includes(row.getValue(amount))
    },
  },
  {
    accessorKey: 'category',
    header: ({column}) => (
      <DataTableColumnHeader
        column={column}
        title="Catégorie"
        className="hidden md:block"
      />
    ),
    cell: ({row}) => {
      const category = row.getValue('category') as string
      return (
        <Badge
          variant={'secondary'}
          className="hidden md:table-cell md:min-w-fit"
        >
          {category}
        </Badge>
      )
    },
    filterFn: (row, amount, value) => {
      return value.includes(row.getValue(amount))
    },
  },
  {
    id: 'actions',
    cell: ({row}) => {
      return (
        <div className="min-w-fit text-right md:ml-0 md:px-8">
          <DataTableRowActions data={{...row.original}} />
        </div>
      )
    },
  },
]
