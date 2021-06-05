export function confirmPasswordValidator(confirmPassword, password) {
    if (!confirmPassword) return "Không được trống."
    if (confirmPassword !== password) return "Mật khẩu xác nhận chưa đúng."
    return ''
  }
  