import {Card} from '@/src/components/ui/card'
import {getUserDal} from '@/src/app/dal/user-dal'
import {AccountForm} from './account-form'
import {notFound} from 'next/navigation'
import withAuth from '@/src/components/auth/withAuth'
import { Separator } from '@/components/ui/separator'

const Page = async () => {
  const user = await getUserDal()
  if (!user) notFound()
  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold">Compte</h1>
      <Separator className="my-4" />
      <Card className="flex flex-col gap-4">
        <AccountForm {...user} uid={user.id} />
      </Card>
    </div>
  )
}

export default withAuth(Page)
