'use client'

import * as React from 'react'

import {FormMessageState} from '@/components/forms/form-message-state'
import {FormSubmitServerButton as FormSubmitButton} from '@/components/forms/form-submit-button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import Link from 'next/link'
import {cn} from '@/lib/utils'
import {signUpAction} from './action'
import {useActionState} from 'react'

type SignUpFormProps = React.HTMLAttributes<HTMLDivElement>

export type SignUpState = {
  message?: string
  errors?: {
    email?: string[]
    name?: string[]
  }
}

export function SignUpForm({className, ...props}: SignUpFormProps) {
  const initialState = {
    message: undefined,
    errors: undefined,
  } as SignUpState
  const [state, formAction] = useActionState(signUpAction, initialState)

  return (
    <div className={cn('grid gap-4', className)} {...props}>
      <form action={formAction}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Pseudo
            </Label>
            <Input name="name" placeholder="John Doe" />
            <FormMessageState state={state} name="name" />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              name="email"
              placeholder="name@example.com"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
            <FormMessageState state={state} name="email" />
            <div id="fields-error" aria-live="polite">
              {state.message && (
                <p className="mt-2 text-sm text-red-500">{state.message}</p>
              )}
            </div>
          </div>
          <FormSubmitButton>S&apos;inscrire</FormSubmitButton>
        </div>
      </form>
      <p className="text-sm text-muted-foreground">
        Déja un compte?{' '}
        <Link href="/sign-in" className="text-primary underline">
          Se connecter
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
