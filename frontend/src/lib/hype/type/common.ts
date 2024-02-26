export interface HTTPResponse {
  status: number
  statusText: string
  headers: Record<string, string> & {
    'set-cookie'?: string[]
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request?: any
}

export type Response<T> = T & {
  response: HTTPResponse
}

export type ResponsePromise<T> = Promise<Response<T>>
