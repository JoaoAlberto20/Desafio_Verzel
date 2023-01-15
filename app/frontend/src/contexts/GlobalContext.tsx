import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { destroyCookie, parseCookies, setCookie } from 'nookies'

import { SignInDTO } from '@dtos/SignInDTO'
import { UsersDTO } from '@dtos/UsersDTO'

import { api } from '@services/api'

interface GlobalContextData {
  user: UsersDTO | null
  isAuthenticated: boolean
  isLoadingUserStorageData: boolean
  signIn: (data: SignInDTO) => Promise<void>
  signOut: () => Promise<void>
}

export const GlobalContext = createContext<GlobalContextData>(
  {} as GlobalContextData,
)

interface GlobalProviderProps {
  children: ReactNode
}

export function GlobalProvider({ children }: GlobalProviderProps) {
  const [user, setUser] = useState<UsersDTO | null>(null)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  const userAndTokenUpdate = async (userData: UsersDTO, token: string) => {
    setCookie(undefined, 'nextauth.token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    })
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    setUser(userData)
  }

  const signIn = useCallback(async ({ email, password }: SignInDTO) => {
    try {
      const { data } = await api.post('auth/login/', {
        email,
        password,
      })
      if (data.user && data.token) {
        userAndTokenUpdate(data.user, data.token.access)
      }
    } catch (error) {
      throw error
    }
  }, [])

  const signOut = async () => {
    destroyCookie(null, 'nextauth.token')
    setUser(null)
  }

  const loadUserData = useCallback(async () => {
    try {
      const { 'nextauth.token': token } = parseCookies()
      if (token) {
        setIsLoadingUserStorageData(true)
        const { data } = await api.get<UsersDTO>('auth/user/', {
          headers: { Authorization: `Bearer ${token}` },
        })
        userAndTokenUpdate(data, token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }, [])

  useEffect(() => {
    loadUserData()
  }, [loadUserData])

  const isAuthenticated = !!user && user.is_superuser

  const context = useMemo(
    () => ({
      user,
      signIn,
      signOut,
      isAuthenticated,
      isLoadingUserStorageData,
    }),
    [isAuthenticated, user, signIn, isLoadingUserStorageData],
  )

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  )
}
