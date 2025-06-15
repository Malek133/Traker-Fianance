import {ArrowDownIcon, ArrowUpIcon, CaretSortIcon} from '@radix-ui/react-icons'

import {Button} from './button'
import type {Column} from '@tanstack/react-table'
import React from 'react'
import {cn} from '@/lib/utils'

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn('flex w-fit items-center md:space-x-2', className)}>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 data-[state=open]:bg-accent"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        disabled={!column.getCanSort()}
      >
        <span>{title}</span>
        {column.getIsSorted() === 'desc' ? (
          <ArrowDownIcon className="ml-1 h-4 w-4 md:ml-2" />
        ) : column.getIsSorted() === 'asc' ? (
          <ArrowUpIcon className="ml-1 h-4 w-4 md:ml-2" />
        ) : (
          <CaretSortIcon className="ml-1 h-4 w-4 md:ml-2" />
        )}
      </Button>
    </div>
  )
}
