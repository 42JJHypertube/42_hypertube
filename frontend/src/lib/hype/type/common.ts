export type Response<T> = T & {
  response: Record<string, string>
}

export type ResponsePromise<T> = Promise<Response<T>>
