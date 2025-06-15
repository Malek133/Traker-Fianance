'use client'

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'


import {Button} from '@/components/ui/button'
import type {Table} from '@tanstack/react-table'

import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {paramPage, paramPageSize} from '@/src/utils/constants'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const gotoPage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set(paramPage, page.toString())
    router.push(`${pathname}?${params.toString()}`)
  }
  const changePageSize = (pageSize: number) => {
    const params = new URLSearchParams(searchParams)
    params.set(paramPageSize, pageSize.toString())
    // Retour à la première page quand on change la taille
    params.set(paramPage, '1')
    router.push(`${pathname}?${params.toString()}`)
  }
  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex flex-col items-center md:flex-row md:space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2 py-2 md:py-0">
          <p className="text-sm font-medium">Ligne par page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
              changePageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[1, 2, 5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center py-2 text-sm font-medium md:py-0">
          Page {table.getState().pagination.pageIndex + 1} sur{' '}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            onClick={() => {
              table.setPageIndex(0)
              gotoPage(1)
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Aller à la première page</span>
            <DoubleArrowLeftIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => {
              table.previousPage()
              gotoPage(table.getState().pagination.pageIndex)
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Aller à la page précédente</span>
            <ChevronLeftIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => {
              table.nextPage()
              gotoPage(table.getState().pagination.pageIndex + 2)
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Aller à la page suivante</span>
            <ChevronRightIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => {
              table.setPageIndex(table.getPageCount() - 1)
              gotoPage(table.getPageCount())
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Aller à la dernière page</span>
            <DoubleArrowRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
