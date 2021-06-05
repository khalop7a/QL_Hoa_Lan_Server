export function passwordValidator(password) {
  if (!password) return "Mật khẩu không được trống"
  if (password.length < 5) return 'Mật khẩu phải ít nhất 5 kí tự'
  return ''
}
