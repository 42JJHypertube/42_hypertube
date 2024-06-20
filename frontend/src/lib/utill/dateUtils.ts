export function dateToString(date: Date) {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }

  const offset = date.getTimezoneOffset() * 60000
  const d = new Date(date.getTime() - offset)

  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}`
}
