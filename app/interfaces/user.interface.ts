export type Role = 'ADMIN' | 'MANAGER' | 'FINANCE' | 'USER'

export interface CreateUserDto {
  email: string
  password: string
  role: Role
}

export interface UpdateUserDto {
  email?: string
  password?: string
  role?: Role
}
