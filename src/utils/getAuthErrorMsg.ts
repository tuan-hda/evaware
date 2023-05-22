const getAuthErrorMsg = (msg: string) => {
  if (msg.includes('auth/invalid-email')) return 'Invalid email'
  if (msg.includes('auth/invalid-password')) return 'Invalid password'
  if (msg.includes('auth/wrong-password')) return 'Wrong password'

  return msg
}

export default getAuthErrorMsg
