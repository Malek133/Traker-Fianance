import Legal from '../_components/legal'
import {Metadata} from 'next'
import {SignInForm} from './sign-in-form'
import LoginButton from '@/src/components/dashoard/LoginButtonGoogle'

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Page de connexion',
}

export default async function Page() {
  // await redirectToDashboardIfAuthenticatedDal()
  return (
    <>
      <div className="lg:p-8">
        
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Se connecter
            </h1>
            <p className="text-sm text-muted-foreground">
              Entrer votre email pour vous connecter
            </p>
          </div>
          <SignInForm />
        <LoginButton />  
        </div>
        
      </div>
      <Legal />
    </>
  )
}
