import {
  type CreateEmailOptions,
  type CreateEmailRequestOptions,
  Resend,
} from 'resend'
import InternalEmail from '../../react-email-starter/emails/internal-email'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async (
  payload: CreateEmailOptions,
  options?: CreateEmailRequestOptions
) => {
  if (process.env.NODE_ENV === 'development') {
    payload.subject = `[DEV] ${payload.subject}`
  }

  const {error} = await resend.emails.send(
    {
      ...payload,
      from: 'onboarding@resend.dev',
      to: 'delivered@resend.dev',
    },
    options
  )

  if (error) {
    console.error(error)
    throw error
  }
}

export const sendInternalEmail = async (subject: string, text: string) => {
  if (process.env.NODE_ENV !== 'production') {
    subject = `[DEV] ${subject}`
  }
  const emailFrom = process.env.EMAIL_FROM || 'delivered@resend.dev'
  const emailTo = process.env.EMAIL_TO || 'delivered@resend.dev'
  const {error} = await resend.emails.send({
    subject,
    from: emailFrom,
    to: emailTo,
    text,
    react: InternalEmail({
      preview: subject,
      content: text,
    }),
  })

  if (error) {
    console.error(error)
    throw error
  }
}
