'use client'

import {Button} from '@/components/ui/button'
import {JSX} from 'react'
import {Theme} from './apperance-setting'
import {useTheme} from 'next-themes'

type AppearanceOption = {
  value: Theme
  label: string
  component: JSX.Element
}
export const AppearanceButton = ({
  value,
  label,
  component,
}: AppearanceOption) => {
  const {setTheme} = useTheme()
  return (
    <Button
      asChild
      variant={'ghost'}
      className="h-fit w-fit"
      onClick={() => setTheme(value)}
    >
      <div className="flex flex-col">
        <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
          {component}
        </div>
        <span className="block w-full p-2 text-center font-normal">
          {label}
        </span>
      </div>
    </Button>
  )
}
