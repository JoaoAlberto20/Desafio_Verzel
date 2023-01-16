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

  const userAndTokenUpdate = (userData: UsersDTO, token: string) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    setUser(userData)
  }

  const saveUserEndTokenCookies = async (userData: UsersDTO, token: string) => {
    setCookie(undefined, 'nextauth.user', JSON.stringify({ userData, token }), {
      maxAge: 60 * 60 * 1, // 1 hour
    })
  }

  const signIn = useCallback(async ({ email, password }: SignInDTO) => {
    try {
      setIsLoadingUserStorageData(true)
      const { data } = await api.post('auth/login/', {
        email,
        password,
      })
      if (data.user && data.token) {
        userAndTokenUpdate(data.user, data.token.access)
        saveUserEndTokenCookies(data.user, data.token.access)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }, [])

  const signOut = useCallback(async () => {
    destroyCookie(null, 'nextauth.user', {
      path: '/',
    })
    setUser(null)
  }, [])

  useEffect(() => {
    const loadUserData = () => {
      const { 'nextauth.user': user } = parseCookies()

      if (user) {
        const userCookie = JSON.parse(user)
        userAndTokenUpdate(userCookie.userData, userCookie.token)
      }
    }
    loadUserData()
  }, [])

  const isAuthenticated = !!user && user.is_superuser

  const context = useMemo(
    () => ({
      user,
      signIn,
      signOut,
      isAuthenticated,
      isLoadingUserStorageData,
    }),
    [user, signIn, signOut, isAuthenticated, isLoadingUserStorageData],
  )

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  )
}
