type FormState = {
  errors?: {
    [key: string]: string[]
  }
  message?: string
}

type FormMessageProps<State> = {
  state: State
  name: string
}

export const FormMessageState = <
  TName extends string,
  State extends FormState,
>({
  state,
  name,
}: FormMessageProps<State> & {name: TName}) => {
  return (
    <div aria-live="polite" id={`${name}-error`} aria-atomic="true">
      {state?.errors && (
        <p className="text-sm font-medium text-destructive">
          {state?.errors[name]?.[0]}
        </p>
      )}
    </div>
  )
}
