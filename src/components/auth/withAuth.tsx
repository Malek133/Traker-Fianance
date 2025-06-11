import React from 'react'

import {redirect} from 'next/navigation'

import {
  // getConnectedUser,
  getUserDal} from '@/src/app/dal/user-dal'

import {User, UserRoles} from '@/src/types/domain/user-types'
import {hasRequiredRole} from '@/src/services/authentication/auth-utils'

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  requiredRole?: UserRoles
) => {
  return async function WithAuth(props: P) {
    const user = await getUserDal()
    const hasRole = hasRequiredRole(user as User, requiredRole ?? 'public')
    if (!user) {
      redirect('/sign-in')
    }
    if (!hasRole && requiredRole) {
      redirect(`/restricted?role=${requiredRole ?? ''}`)
    }
    if (!hasRole) {
      redirect(`/restricted`)
    }

    return <WrappedComponent {...props} />
  }
}

export default withAuth

export const withAuthAdmin = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => withAuth(WrappedComponent, 'admin')
