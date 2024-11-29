import Input from "@/modules/common/components/input"
import InnerInputButton from "@/modules/common/components/innerInputButton"
import { LoginType } from "@/types/account/type"
import { useCallback, useState } from "react"
import { requestAuthCode } from "../../loginAction"

type LoginAuthProps = {
    email: string
    loginType : LoginType
    message : string | null 
}
const LoginAuth = ({email, loginType, message}: LoginAuthProps) => {
    const [isPending, setIsPending] = useState(false)
    const requestAuth = useCallback(function requestAuth_f(email: string) {
        setIsPending(true)
        requestAuthCode(email).then(() => setIsPending(false))
      }, [])

    return (
        <Input
          name={loginType === 'password' ? 'password' : 'code'}
          type={loginType === 'password' ? 'password' : 'text'}
          error={!!message}
          readOnly={isPending}
          required
          innerButton={
            loginType === 'password' ? null : (
              <InnerInputButton
                pending={isPending}
                title="코드 재 전송"
                onClick={() => {
                  requestAuth(email!)
                }}
              />
            )
          }
        />
    )
}

export default LoginAuth