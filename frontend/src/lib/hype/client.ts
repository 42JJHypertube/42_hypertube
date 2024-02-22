import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios' // axiosError 추가 필요
import TokenManager from './tokenManger'
import { AxiosResponse } from 'axios'
export interface Config {
  baseURL: string // 기본 baseURL 설정
  maxRetries: number // 몇번 반복할지 설정
}

export interface RequestOptions {
  timeout?: number // 해당 시간이후에는 연결이 실패한 것으로 판정
  numberOfRetries?: number // 몇회까지 반복할지 설정
}

export type RequestMethod = 'DELETE' | 'POST' | 'GET'

class Client {
  private axiosClient: AxiosInstance

  constructor(config: Config) {
    this.axiosClient = this.createClient({ ...config })
  }

  // eslint-disable-next-line class-methods-use-this
  createClient(config: Config): AxiosInstance {
    const client = axios.create({
      baseURL: config.baseURL,
    })

    return client
  }

  /**
   * Axios request
   * @param userHeaders timeout 과 retry 횟수 설정.
   * @param method request method
   * @param path 경로
   * @param customHeaders 추가적인 헤더 설정
   * @return
   */
  // eslint-disable-next-line class-methods-use-this
  setHeaders(
    userHeaders: RequestOptions,
    method: RequestMethod,
    path: string,
    customHeaders: Record<string, unknown> = {},
  ): AxiosRequestHeaders {
    let defaultHeaders: Record<string, unknown> = {
      Accept: '*/*',
      'Content-Type': 'application/json',
    }

    /* JWT token 이 존재할 경우 베어럴로 추가해준다 */
    /* JWT token 이 존재하지않고 , 2FA 토큰이 존재하면 베어럴로 추가 */
    if (TokenManager.getAccessToken()) {
      defaultHeaders = {
        ...defaultHeaders,
        Authorization: `Bearer ${TokenManager.getAccessToken()}`,
      }
    }

    return { ...defaultHeaders, ...customHeaders } as AxiosRequestHeaders
  }

  /**
   * Axios request
   * @param method request method
   * @param path request path
   * @param payload request payload
   * @param options axios configuration
   * @param customHeaders custom request headers
   * @return
   */
  async request(
    method: RequestMethod,
    path: string,
    payload: Record<string, unknown> = {},
    options: RequestOptions = {},
    customHeaders: Record<string, unknown> = {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> {
    const reqOpts: {
      method: RequestMethod
      withCredentials: boolean
      url: string
      json: boolean
      headers: AxiosRequestHeaders
      data?: Record<string, unknown>
    } = {
      method,
      withCredentials: true,
      url: path,
      json: true,
      headers: this.setHeaders(options, method, path, customHeaders),
    }

    if (['POST', 'DELETE'].includes(method)) {
      reqOpts.data = payload
    }
    const { data, ...response } = await this.axiosClient(reqOpts)
    return { data, response }
  }
}

export default Client
