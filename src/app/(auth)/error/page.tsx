'use client'

import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card'

import Link from 'next/link'
import {buttonVariants} from '@/components/ui/button'
import {cn} from '@/lib/utils'
import {getAuthError} from '@/services/authentication/auth-error'
import {useSearchParams} from 'next/navigation'
import {Suspense} from 'react'

// ref: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
const Page = () => {
  return (
    <Suspense>
      <Error />
    </Suspense>
  )
}
const Error = () => {
  const searchParams = useSearchParams()
  const errorParam = searchParams.get('error')

  const error = errorParam
    ? getAuthError(errorParam)
    : 'Veillez contacter un administrateur'
  return (
    <div className="flex flex-col justify-center p-8">
      <Card className="flex w-full flex-col justify-center sm:w-[350px] lg:w-[500px]">
        <CardHeader className="text-xl font-semibold">Erreur</CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/" className={cn(buttonVariants({variant: 'default'}))}>
            Revenir à l&apos;accueil
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Page
