export interface Config {
  baseURL: string // 기본 baseURL 설정
  maxRetries: number // 몇번 반복할지 설정
}

export interface RequestOptions {
  timeout?: number // 해당 시간이후에는 연결이 실패한 것으로 판정
  numberOfRetries?: number // 몇회까지 반복할지 설정
}

export type RequestMethod = 'DELETE' | 'POST' | 'GET' | 'PUT'
