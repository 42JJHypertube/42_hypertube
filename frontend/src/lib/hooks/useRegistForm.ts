'use client'

import { RegistForm } from '@/types/account/type'
import { useFormState } from 'react-dom'
import { useCallback } from 'react'
import { registActions } from '@/modules/account/registAction'
import { useAccountContext } from '@/modules/account/components/accountProvider'

// formReset을 위한 form 객체.
const resetForm = new FormData()
resetForm.set('init', 'true')

const initForm: RegistForm = {
  email :'',
  emailToken: '',
  message: null,
  status: 'INPUT_EMAIL'
}

const useRegistForm = (registInitial : RegistForm) => {
  const { setEmail } = useAccountContext();
  const registFunction = useCallback(
    async (state: RegistForm, payload: FormData) => {
      if (payload.get('init')) {
        setEmail('')
        return { ...initForm, email: state.email }
      }
      return registActions(state, payload)
    },
    [],
  )

  const [registForm, registAction] = useFormState(registFunction, registInitial)
  const resetFormState = useCallback(() => registAction(resetForm), [])
  return { ...registForm, resetFormState, registAction }
}

export default useRegistForm
