'use client'

import {Card, CardContent, CardHeader, CardTitle} from '@/src/components/ui/card'
// import React, {useEffect} from 'react'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'

import SelectTime from '@/src/components/selects/select-time'
import {pageParamName, yearParamName} from '@/src/utils/constants'

type FinanceChartTriggerProps = {
  years: {
    year: string
  }[]
  currentYear?: string
  children?: React.ReactNode
}

const FinanceYearSelect = ({
  years,
  currentYear,
  children,
}: FinanceChartTriggerProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const handleChangeYear = (newYear: string) => {
    if (currentYear === newYear) return

    const params = new URLSearchParams(searchParams)
    params.set(yearParamName, newYear)
    params.set(pageParamName, '1') // Retour à la première page
    router.push(`${pathname}?${params.toString()}`, {scroll: false})
  }

  return (
    <Card>
      <CardHeader className="space-y-4 text-xl font-semibold">
        <CardTitle>Finance</CardTitle>
        <SelectTime
          currentTime={currentYear ?? years?.[0].year}
          times={years}
          handleChange={handleChangeYear}
          placeholder="Sélectionnez une année"
        />
      </CardHeader>
      <CardContent className="p-4">{children}</CardContent>
    </Card>
  )
}

export default FinanceYearSelect
