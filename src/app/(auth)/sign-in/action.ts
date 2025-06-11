'use server'

import {AuthError} from 'next-auth'
// import {baseUserFormSchema} from '@/components/forms/form-validators/user-form-schema'
// import {processUnknownError} from '@/lib/utils'
import {redirect} from 'next/navigation'
// import {signIn} from '@/services/authentication/auth-service'
// import {getUserByEmail} from '@/services/user-service'
import {isRedirectError} from 'next/dist/client/components/redirect-error'
import { baseUserFormSchema } from '@/src/components/forms/form-validators/user-form-schema'
import { getUserByEmail } from '@/src/services/user-service'
import { signIn } from '@/src/services/authentication/auth-service'
import { processUnknownError } from '@/src/lib/utils'

export const signInAction = async (
  prevState: string | undefined,
  formData: FormData
) => {
  const validateField = baseUserFormSchema.safeParse({
    email: formData.get('email'),
  })

  if (!validateField.success) {
    return validateField.error.flatten().fieldErrors?.email?.[0]
  }
  try {
    const emailLowerCase = validateField.data.email.toLowerCase()

    const request = await getUserByEmail(emailLowerCase)

    if (!request) {
      return "Aucun compte n'est associé à cet e-mail." as const
    }
    const result = await signIn('resend', {
      email: request.email,
      redirect: false,
    })

    if (result.includes('error')) {
      redirect(result)
    }
  } catch (error) {
    //https://github.com/nextauthjs/next-auth/discussions/9389#discussioncomment-8046451
    if (isRedirectError(error)) {
      throw error
    }
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'EmailSignInError': {
          return 'Email invalide.' as const
        }
        default: {
          return 'Erreur innatendue.' as const
        }
      }
    }
    return processUnknownError(error)
  }
  redirect('/verify-request')
}
