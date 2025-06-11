'use client'

import * as React from 'react'

 import {FormSubmitServerButton as FormSubmitButton} from '@/src/components/forms/form-submit-button'
// import {Input} from '@/components/ui/input'
// import {Label} from '@/components/ui/label'
import Link from 'next/link'

import {signInAction} from './action'
import {useActionState} from 'react'
import { cn } from '@/src/lib/utils'
import { Label } from '@/src/components/ui/label'
import { Input } from '@/src/components/ui/input'

type SignInFormProps = React.HTMLAttributes<HTMLDivElement>

export function SignInForm({className, ...props}: SignInFormProps) {
 
  const [state, formAction] = useActionState(signInAction, undefined)

  return (
    <div className={cn('grid gap-4', className)} {...props}>
      <form action={formAction}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              name="email"
              placeholder="name@example.com"
              autoCapitalize="none"
              autoCorrect="off"
              autoComplete="email"
            />
            <div aria-live="polite" id={`email-error`} aria-atomic="true">
              {state && (
                <p className="text-sm font-medium text-destructive">{state}</p>
              )}
            </div>
          </div>
          
          <FormSubmitButton>Se connecter</FormSubmitButton>
        </div>
      </form>
      <p className="text-sm text-muted-foreground">
        Pas de compte ?{' '}
        <Link href="/sign-up" className="text-primary underline">
          S&apos;inscrire
        </Link>
      </p>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>
    </div>
  )
}
