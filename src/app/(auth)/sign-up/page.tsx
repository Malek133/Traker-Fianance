import Legal from '../_components/legal'
import {Metadata} from 'next'
import {SignUpForm} from './sign-up-form'

export const metadata: Metadata = {
  title: 'Authentication',
  description: "Page d'inscription",
}

export default async function Page() {
  return (
    <>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Créer un compte
            </h1>
            <p className="text-sm text-muted-foreground">
              Entrer un pseudo et votre email pour creer votre compte
            </p>
          </div>
          <SignUpForm />
        </div>
      </div>
      <Legal />
    </>
  )
}
