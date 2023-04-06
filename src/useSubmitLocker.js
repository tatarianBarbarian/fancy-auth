import { useState } from 'react'

const useSubmitLocker = (onSubmit, onSuccess, onError) => {
  const [preventSubmit, setPreventSubmit] = useState(false)

  const handler = async (values, actions) => {
    setPreventSubmit(true)

    if (preventSubmit) return

    try {
      await onSubmit(values, actions)
      onSuccess()
      actions.setSubmitting(false)
      setPreventSubmit(false)
    } catch (error) {
      actions.setSubmitting(false)
      setPreventSubmit(false)
      onError(error)
    }
  }

  return handler
}

export default useSubmitLocker
