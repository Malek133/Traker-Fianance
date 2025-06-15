'use client'

import {Card, CardContent, CardHeader, CardTitle} from '@/src/components/ui/card'
import React from 'react'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {
  healthWeekParamName,
  healthYearParamName,
  pageParamName,
} from '@/src/utils/constants'
import SelectTime from '@/src/components/selects/select-time'

type HealthYearSelectProps = {
  years: {
    year: string
  }[]
  weeks: {
    week: string
  }[]
  currentYear?: string
  currentWeek?: string
  children?: React.ReactNode
}

const HealthYearSelect = ({
  years,
  weeks,
  currentYear,
  currentWeek,
  children,
}: HealthYearSelectProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleChangeYear = async (newYear: string) => {
    if (currentYear === newYear) return
    const params = new URLSearchParams(searchParams)
    params.set(healthYearParamName, newYear)
    params.set(pageParamName, '1')
    router.push(`${pathname}?${params.toString()}`, {scroll: false})
  }
  const handleChangeWeek = (newWeek: string) => {
    if (currentWeek === newWeek) return

    const params = new URLSearchParams(searchParams)
    params.set(healthWeekParamName, newWeek)
    params.set(pageParamName, '1')
    router.push(`${pathname}?${params.toString()}`, {scroll: false})
  }

  return (
    <Card>
      <CardHeader className="space-y-4 text-xl font-semibold">
        <CardTitle>Santé</CardTitle>
        <div className="flex flex-row gap-2">
          <SelectTime
            currentTime={currentYear ?? years[0].year}
            times={years}
            handleChange={handleChangeYear}
            placeholder="Sélectionner une année"
            key="healthYearChartTrigger"
          />
          <SelectTime
            currentTime={currentWeek ?? weeks[0].week}
            times={weeks}
            handleChange={handleChangeWeek}
            placeholder="Sélectionner une semaine"
            key="healthWeekChartTrigger"
          />
        </div>
      </CardHeader>

      <CardContent className="p-4">{children}</CardContent>
    </Card>
  )
}

export default HealthYearSelect
