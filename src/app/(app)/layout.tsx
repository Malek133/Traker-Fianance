import {getUserDal} from '@/src/app/dal/user-dal'
import withAuth from '@/src/components/auth/withAuth'
import Sidebar from '@/src/components/dashoard/sidebar'


import {Metadata} from 'next'
import {PropsWithChildren} from 'react'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard regroupant les traqueurs de finance et de santé',
}

const DashboardLayout = async ({children}: PropsWithChildren) => {
  const user = await getUserDal()
  return (
    <div className="flex h-screen flex-col md:flex-row xl:justify-center">
      <div className="w-full p-4 md:w-64">
        <Sidebar user={user} />
      </div>
      <div className="w-full max-w-7xl p-4 pt-8">{children}</div>
    </div>
  )
}

export default withAuth(DashboardLayout)
