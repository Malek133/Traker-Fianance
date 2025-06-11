import { UserModel } from "@/src/data/models/user-model"


export type User = UserModel
export type UserRoles = User['role']
export type UserVisibility = User['visibility']
export type CreateUser = Pick<User, 'email' | 'name'>
export type UpdateUser = Omit<User, 'role' | 'emailVerified'>

export type UserDTO = {
  email: string
  name?: string
  role?: string
}
