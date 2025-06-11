'use client'

import Image from 'next/image'
import Link from 'next/link'
 import {Power} from 'lucide-react'
import {Separator} from '@/components/ui/separator'
 import SignOutButton from '@/src/components/auth/sign-out-button'
import {buttonVariants} from '@/components/ui/button'
import {cn} from '@/lib/utils'
import {dashboardLinks} from '@/src/utils/constants'
import {usePathname} from 'next/navigation'
// import { useSession } from 'next-auth/react'

 import {UserDTO} from '@/src/types/domain/user-types'

const Sidebar = ({user}: {user?: UserDTO}) => {
  const pathname = usePathname()
  //  const session = useSession()
  return (
    <div className="flex h-full flex-col gap-4 rounded-md p-4 md:border">
      <Link
        className="flex flex-row items-center justify-center gap-2 p-2 md:flex-col"
        href={'/'}
      >
        <Image
          src="/images/logo.svg"
          alt="Logo"
          width={24}
          height={24}
          className="size-16 rounded-full md:size-28"
          priority={true}
        />
        <p className="text-xl">Trackeur </p>
      </Link>
      <Separator />
      <div className="mx-auto flex h-full flex-wrap justify-stretch gap-3 md:mx-0 md:flex-col">
        {dashboardLinks.map((link) => {
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                buttonVariants({variant: 'ghost'}),
                pathname === link.href && 'bg-muted',
                'grow justify-center border hover:bg-muted md:grow-0 md:justify-start md:border-0'
              )}
            >
              <link.icon className="size-6 md:hidden" />
              <span className="hidden md:block">{link.title}</span>
            </Link>
          )
        })}
        <div className="hidden h-auto w-full grow rounded-md md:block" />
        <Separator className="hidden md:block" />
        <p className="hidden grow text-center md:block md:grow-0">
          {/* {session?.data?.user?.name} */}
          {user?.name}
        </p>
         <SignOutButton
          variant={'ghost'}
          className="w-full border bg-transparent text-primary md:border-0"
        >
          <Power className="size-6 md:hidden" />
          <span className="hidden md:block">Deconnexion</span>
        </SignOutButton> 
      </div>
    </div>
  )
}

export default Sidebar



