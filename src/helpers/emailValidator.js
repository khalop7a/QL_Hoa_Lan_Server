export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "Email không được trống."
  if (!re.test(email)) return 'Ooops! Địa chỉ Email không hợp lệ.'
  return ''
}
