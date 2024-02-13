import HypeClient from '../config'

/**
 *
 * @param payload {email: }
 */
export async function getAuthCode(payload: { email: string }) {
  const customHeaders = {
    'Content-Type': 'application/json',
    Accept: '*/*',
  }

  return HypeClient.auth
    .sendCode(payload, customHeaders)
    .then((res) => res)
    .catch((error) => console.log(error))
}

export async function goLogin(payload: { email: string; password: string }) {
  const customHeaders = {
    'Content-Type': 'application/json',
    Accept: '*/*',
  }

  return HypeClient.auth
    .goLogin(payload, customHeaders)
    .then((res) => res)
    .catch(() => console.log('login Error'))
}
