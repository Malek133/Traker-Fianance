import {getWeek, parse} from 'date-fns'

export const formattedDate = (date: Date) => {
  const formatted = date.toLocaleDateString('fr-FR', {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
  })
  return formatted
}

export const getWeekFromLabel = (label: string, year: string) => {
  const week = label.slice(0, 5)
  const [day, month] = week.split('-')
  const parsedDate = parse(
    `${year}-${month}-${Number(day)}`,
    'yyyy-MM-dd',
    new Date()
  )
  const startWeek = getWeek(parsedDate)
  return startWeek
}