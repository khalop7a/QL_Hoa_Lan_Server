export function confirmPasswordValidator(confirmPassword, password) {
    if (!confirmPassword) return "Confirm password can't be empty."
    if (confirmPassword !== password) return "Passwords don't match."
    return ''
  }
  