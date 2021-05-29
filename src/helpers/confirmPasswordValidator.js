export function confirmPasswordValidator(confirmPassword, password) {
    if (!confirmPassword) return "Không được để trống."
    if (confirmPassword !== password) return "Mật khẩu xác nhận chưa đúng."
    return ''
  }
  