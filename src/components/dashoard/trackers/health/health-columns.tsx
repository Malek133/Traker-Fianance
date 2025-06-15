'use client'

import {Badge} from '@/components/ui/badge'
import type {ColumnDef} from '@tanstack/react-table'
import {DataTableColumnHeader} from '@/src/components/ui/data-table-column-header'
import {Health} from '@/src/types/domain/health-types'
import {formattedDate} from '@/src/utils/date-utils'
import {DataTableRowActions} from '@/src/components/ui/data-table-row-actions'

export const healthColumns: ColumnDef<Health>[] = [
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
    accessorKey: 'value',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Valeur" />
    ),
    cell: ({row}) => {
      const value = Number.parseInt(row.getValue('value'))
      const category = row.getValue('category') as string
      let suffix
      switch (category) {
        case 'calories': {
          suffix = 'kcal'
          break
        }
        case 'temps': {
          suffix = 'min'
          break
        }
        case 'poids': {
          suffix = 'kg'
          break
        }
      }
      return (
        <div className="min-w-fit text-left">
          {value} {suffix}
        </div>
      )
    },
    filterFn: (row, value) => {
      return value.includes(row.getValue(value))
    },
  },
  {
    accessorKey: 'category',
    header: ({column}) => (
      <DataTableColumnHeader
        column={column}
        title="Catégories"
        className="hidden md:block"
      />
    ),
    cell: ({row}) => {
      const category = row.getValue('category') as string
      return (
        <Badge variant={'secondary'} className="hidden min-w-fit md:table-cell">
          {category}
        </Badge>
      )
    },
    filterFn: (row, time, value) => {
      return value.includes(row.getValue(time))
    },
  },
  {
    id: 'actions',
    cell: ({row}) => {
      return (
        <div className="-ml-4 min-w-fit text-right md:ml-0 md:px-8">
          <DataTableRowActions data={{...row.original
          }} type="health" />
        </div>
      )
    },
  },
]


