/* eslint-disable no-useless-catch */
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { useRouter } from 'next/router'

import { parseCookies, setCookie } from 'nookies'

import { SignInDTO } from '@dtos/SignInDTO'
import { UsersDTO } from '@dtos/UsersDTO'

import { recoverUserInformation, signInRequest } from '@services/auth'

interface GlobalContextData {
  user: UsersDTO | null
  isAuthenticated: boolean
  signIn: (data: SignInDTO) => Promise<void>
}

export const GlobalContext = createContext<GlobalContextData>(
  {} as GlobalContextData,
)

interface GlobalProviderProps {
  children: ReactNode
}

export function GlobalProvider({ children }: GlobalProviderProps) {
  const [user, setUser] = useState<UsersDTO | null>(null)

  const navigate = useRouter()

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()

    if (token) {
      recoverUserInformation(token).then((response) => setUser(response.user))
    }
  }, [])

  const signIn = useCallback(
    async ({ email, password }: SignInDTO) => {
      try {
        const { token, user } = await signInRequest({ email, password })

        setCookie(undefined, 'nextauth.token', token.access, {
          maxAge: 60 * 60 * 24 * 7, // 7 Dias
        })

        setUser(user)

        navigate.push('/admin')
      } catch (error) {
        throw error
      }
    },
    [navigate],
  )

  const isAuthenticated = !!user && user.is_superuser

  const context = useMemo(
    () => ({
      user,
      signIn,
      isAuthenticated,
    }),
    [isAuthenticated, user, signIn],
  )

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  )
}
