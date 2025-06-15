'use client'

import {Button} from '@/components/ui/button'
import {Cross2Icon} from '@radix-ui/react-icons'

import {Input} from '@/components/ui/input'
import React from 'react'
import type {Table} from '@tanstack/react-table'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({table}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const isTableCategory = table
    .getAllFlatColumns()
    .some((column) => column.id === 'category')

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col justify-start gap-2 px-4 md:flex-row md:px-0">
        {isTableCategory && (
          <Input
            placeholder="Filtre de categorie..."
            value={
              (table.getColumn('category')?.getFilterValue() as string) ?? ''
            }
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              table.getColumn('category')?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Réinitialiser
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}