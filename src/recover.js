export async function recover({ email }) {
  const specialEmailsWithErrorMessages = {
    'null@error.com': `User doesn't exist`,
    '500@error.com': 'Service unavailable. Please, try again later',
    'net@error.com':
      'Network error. Check your internet connection and try again',
  }

  return new Promise((res, rej) => {
    setTimeout(() => {
      if (Object.keys(specialEmailsWithErrorMessages).includes(email)) {
        rej({
          message: specialEmailsWithErrorMessages[email],
        })
      } else {
        res({
          user: {
            username: email,
          },
        })
      }
    }, Math.random() * 1500)
  })
}
