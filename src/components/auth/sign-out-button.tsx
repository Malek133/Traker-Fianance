
import {Button, ButtonProps, buttonVariants} from '@/components/ui/button'

import {cn} from '@/lib/utils'
import {useActionState} from 'react'
import { signOutAction } from './auth-actions'

type SignOutButtonProps = ButtonProps

const SignOutButton = ({
  className,
  children,
  variant,
  size,
  ...props
}: SignOutButtonProps) => {
  const [state, execute] = useActionState(signOutAction, undefined)
  console.log(state)
  return (
    <form action={execute}>
      <Button
        className={cn(buttonVariants({variant, size, className}))}
        {...props}
        type="submit"
      >
        {children}
      </Button>
    </form>
  )
}

export default SignOutButton
