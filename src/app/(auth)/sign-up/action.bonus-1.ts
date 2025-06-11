'use server'

import {processUnknownError} from '@/lib/utils'
import {signIn} from '@/services/authentication/auth-service'
import {createUser, getUserByEmail} from '@/services/user-service'
import {createUserFormSchema} from '@/components/forms/form-validators/user-form-schema'
import {SSRAction} from '@/types/actions-types'
import {redirect} from 'next/navigation'
import {SignUpState} from './sign-up-form'
import {isRedirectError} from 'next/dist/client/components/redirect-error'
import {sendInternalEmail} from '@/services/email-service'

export const signUpAction = async (
  prevState: SignUpState,
  formData: FormData
) => {
  const validateField = createUserFormSchema.safeParse({
    email: formData.get('email'),
    name: formData.get('name'),
  })

  if (!validateField.success) {
    return {
      errors: validateField.error.flatten().fieldErrors,
    } as SSRAction
  }
  try {
    const request = await getUserByEmail(validateField.data.email)
    if (request) {
      return {
        errors: {
          email: ['Cet email est déjà utilisé.'],
        },
      } as SSRAction
    }
    const result = await createUser(validateField.data)
    await sendInternalEmail(
      'Nouvel utilisateur',
      `Nouvel utilisateur ${result.email}`
    )
    const resultSignIn = await signIn('resend', {
      email: result.email,
      redirect: false,
    })
    if (resultSignIn.includes('error')) {
      redirect(resultSignIn)
    }
  } catch (error) {
    //https://github.com/nextauthjs/next-auth/discussions/9389#discussioncomment-8046451
    if (isRedirectError(error)) {
      throw error
    }
    return {
      message: processUnknownError(error),
    } as SSRAction
  }
  redirect('/verify-request')
}
