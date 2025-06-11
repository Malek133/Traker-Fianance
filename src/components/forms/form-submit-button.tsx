'use client'

import {Loader2} from 'lucide-react'
import React from 'react'
import {useFormStatus} from 'react-dom'
import { Button } from '../ui/button'
import { cn } from '@/src/lib/utils'

export const FormSubmitServerButton = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const {pending} = useFormStatus()
  return (
    <Button type="submit" aria-disabled={pending}>
      <Loader2
        className={cn('mr-2 h-4 w-4 animate-spin', !pending && 'hidden')}
      />
      {children}
    </Button>
  )
}

export const FormSubmitClientButton = ({
  children,
  pending = false,
}: {
  pending?: boolean
  children: React.ReactNode
}) => {
  return (
    <Button type="submit" aria-disabled={pending}>
      <Loader2
        className={cn('mr-2 h-4 w-4 animate-spin', !pending && 'hidden')}
      />
      {children}
    </Button>
  )
}
