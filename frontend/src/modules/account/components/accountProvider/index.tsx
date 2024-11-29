import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'
import { LoginView, LoginViewEnum } from '@/types/account/type'

type AccountProviderType = {
  email: string
  currentView: LoginView
  setCurrentView: Dispatch<SetStateAction<LoginView>>
  setEmail: Dispatch<React.SetStateAction<string>>
}

const AccountContext = createContext<AccountProviderType | null>(null)

export const useAccountContext = (): AccountProviderType => {
  const context = useContext(AccountContext)
  if (!context) throw new Error('AccountProvider 내부에서 사용해야 합니다.')
  return context
}

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [currentView, setCurrentView] = useState<LoginView>(
    LoginViewEnum.SIGN_IN,
  )
  const [email, setEmail] = useState<string>('')

  return (
    <AccountContext.Provider
      value={{ email, currentView, setEmail, setCurrentView }}
    >
      {children}
    </AccountContext.Provider>
  )
}

export default AccountProvider
