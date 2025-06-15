import {getUserIdDal} from '@/src/app/dal/user-dal'
// import {Card} from '@/src/components/ui/card'
import {Separator} from '@/components/ui/separator'
// import {canCreateFinance} from '@/services/authorization/finance-authorization'
import {DATA_ROWS_PER_PAGE} from '@/src/utils/constants'
import {notFound} from 'next/navigation'
import React from 'react'
import FinanceYearSelect from '@/src/components/dashoard/trackers/finance/finance-year-select'
import FinanceDataTable from '@/src/components/dashoard/trackers/finance/finance-data-table'
import { getFinancesWithPaginationByYear, getYearsFinancesByUid } from '@/src/services/finance-service'

type SearchParams = Promise<{
  financeYear?: string
  page?: string
  pageSize?: string
}>

const Page = async (props: {searchParams?: SearchParams}) => {
  const userId = await getUserIdDal()
  if (!userId) notFound()

  const params = await props.searchParams
  const defaultYear = new Date().getFullYear().toString()

  const page = Number(params?.page) || 1
  const limit = Number(params?.pageSize) || DATA_ROWS_PER_PAGE

  const years = (await getYearsFinancesByUid(userId)) ?? [
    {year: new Date().getFullYear().toString()},
  ]

  const requestedYear = params?.financeYear
  // Si l'année demandée existe dans `years`, on l'utilise, sinon on prend la première année disponible
  const financeYear =
    requestedYear && years.some((y) => y.year === requestedYear)
      ? requestedYear
      : years?.[0]?.year || defaultYear

  const hasCurrentYear = years?.find((year) => year.year === financeYear)?.year

  const finances = await getFinancesWithPaginationByYear(
    financeYear,
    userId,
    page,
    limit
  )

  return (
    <div className="flex w-full flex-col justify-center gap-4 pb-4">
      <h1 className="text-2xl font-semibold">Finance</h1>
      <Separator className="my-4" />

      <FinanceYearSelect years={years} currentYear={financeYear}>
        {hasCurrentYear ? (
          <FinanceDataTable finances={finances} />
        ) : (
          <div>No data for this year</div>
        )}
      </FinanceYearSelect>
    </div>
  )
}

export default Page
