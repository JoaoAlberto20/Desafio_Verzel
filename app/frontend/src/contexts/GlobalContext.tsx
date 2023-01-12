import { createContext, ReactNode } from 'react'

interface GlobalContextData {}

export const GlobalContext = createContext<GlobalContextData>(
  {} as GlobalContextData,
)

interface GlobalProviderProps {
  children: ReactNode
}

export function GlobalProvider({ children }: GlobalProviderProps) {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>
}
