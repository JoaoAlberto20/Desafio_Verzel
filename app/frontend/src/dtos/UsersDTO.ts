export interface UsersDTO {
  id: string
  username: string
  email: string
  is_superuser: boolean
  first_name: string
  last_name: string
  user_permissions: Array<string>
}
