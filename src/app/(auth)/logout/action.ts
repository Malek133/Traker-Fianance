'use server'
import {signOut} from '@/src/services/authentication/auth-service'

export async function logout() {
  await signOut()
}
