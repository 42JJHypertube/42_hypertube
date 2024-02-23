export interface HTTPResponse {
  status: number
  statusText: string
  headers: Record<string, string> & {
    "set-cookie"?: string[]
  }
  config: any
  request?: any
}

export type Response<T> = T & {
  response: HTTPResponse
}

export type ResponsePromise<T> = Promise<Response<T>>
