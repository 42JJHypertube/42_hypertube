// 리 렌더링을 유발할 필요가없고, 기존의 객체를 수정하는것이 원하는 동작이기 때문에 Object.assign 을 사용한다.
// 성공했을 때만 해당 함수를 사용하기 때문에, message 를 null로 만들어준다.
// 폼 관리용 함수.
export function updateForm<T extends object>(
  currentState: T,
  updates: Partial<T>,
): T {
  return Object.assign(currentState, updates, { message: null })
}

// 에러 관리용 함수.
export function updateError<T extends { message: string | null }>(
  currentState: T,
  message: string | null,
): T {
  return Object.assign(currentState, { message })
}
