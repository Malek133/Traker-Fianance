import {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {PropsWithChildren} from 'react'

export const metadata: Metadata = {
  title: 'Authentication',
  description: "Page d'authentification",
}
const AuthLayout = async ({children}: PropsWithChildren) => {
  return (
    <div className="mx-auto flex h-screen min-w-72 max-w-96 flex-col items-center justify-center p-4 pb-0">
      <Link href="/">
        <Image
          src="/images/logo.svg"
          alt="Logo"
          width={150}
          height={150}
          className="size-20 md:size-28 lg:size-36"
          priority={false}
        />
      </Link>
      {children}
    </div>
  )
}

export default AuthLayout
