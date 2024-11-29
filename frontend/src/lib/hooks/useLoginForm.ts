'use client'
import { useFormState } from 'react-dom'
import { useCallback } from 'react'
import { LoginForm, LoginViewEnum } from '@/types/account/type'
import {
  getLoginType,
  loginWithEmail,
  loginWithPassword,
  requestAuthCode,
} from '@/modules/account/loginAction'
import { useAccountContext } from '@/modules/account/components/accountProvider'
// formReset을 위한 form 객체.
const resetForm = new FormData()
resetForm.set('init', 'true')

const loginInitial: LoginForm = {
  email: null,
  emailToken: null,
  codeSended: false,
  loginType: null,
  message: null,
  noAccount: false,
}

const useLoginForm = () => {
  const { setEmail, setCurrentView } = useAccountContext()

  const loginFunction = useCallback(
    async (state: LoginForm, payload: FormData) => {
      const loginType = state.loginType
      
      if (payload.get('init')) return {...loginInitial, email: state.email}
      if (loginType === null) {
        const nextState = await getLoginType(state, payload)
        if (nextState.noAccount) {
          setEmail(nextState.email ? nextState.email : '')
          if (await requestAuthCode(nextState.email!))
            setCurrentView(LoginViewEnum.REGISTER)
        }
        return getLoginType(state, payload)
      }
      if (loginType === 'email') return loginWithEmail(state, payload)
      if (loginType === 'password') return loginWithPassword(state, payload)

      return state
    },
    [setEmail, setCurrentView],
  )

  const [loginForm, loginAction] = useFormState<LoginForm, FormData>(
    loginFunction,
    loginInitial,
  )

  const resetFormState = useCallback(() => loginAction(resetForm), [])

  return { ...loginForm, resetFormState, loginAction }
}

export default useLoginForm
