import { SignInDTO } from '@dtos/SignInDTO'
import { UsersDTO } from '@dtos/UsersDTO'

import { api } from './api'

interface ResponseSingRequest {
  token: {
    access: string
    refresh: string
  }
  user: UsersDTO
}

const setTokenHeaders = async (token: string) => {
  api.defaults.headers.Authorization = `Bearer ${token}`
}

export const signInRequest = async ({ email, password }: SignInDTO) => {
  const { data } = await api.post<ResponseSingRequest>('auth/login/', {
    email,
    password,
  })

  setTokenHeaders(data.token.access)

  return {
    token: data.token,
    user: data.user,
  }
}

export const recoverUserInformation = async (token: string) => {
  const { data } = await api.get<UsersDTO>('auth/user/', {
    headers: { Authorization: `Bearer ${token}` },
  })

  return {
    user: data,
  }
}
