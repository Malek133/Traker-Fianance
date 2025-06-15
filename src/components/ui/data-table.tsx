'use client'

import * as React from 'react'

import type {ColumnDef, SortingState} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { DataTableToolbar } from './data-table-toolbar'
import { DataTablePagination } from './data-table-pagination'
// import {DataTableToolbar} from '@/components/ui/data-table-toolbar'

export interface Pagination {
  page: number
  pageSize: number
  rowCount: number
}
interface DataTableProps<TData, TValue, TPagination extends Pagination> {
  columns: ColumnDef<TData, TValue>[]
  dataTable: {
    data: TData[]
    pagination: TPagination
  }
}

export function DataTable<TData, TValue, TPagination extends Pagination>({
  columns,
  dataTable,
}: DataTableProps<TData, TValue, TPagination>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const {data, pagination} = dataTable
  const pageParam = dataTable.pagination.page

  const pageIndexParam = pageParam ? Number(pageParam) - 1 : 0
  const pageIndex = pageIndexParam < 0 ? 0 : pageIndexParam

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination: {
        pageIndex, //initial page index
        pageSize: pagination.pageSize, //default page size
      },
    },
    rowCount: pagination.rowCount,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(), //not needed for server-side pagination
    getSortedRowModel: getSortedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className="w-full space-y-4">
      <DataTableToolbar table={table} />
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? undefined
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Pas de résultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
