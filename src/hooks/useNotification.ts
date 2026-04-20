import { useState, useCallback } from 'react'

export interface Notification {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

export const useNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const show = useCallback(
    (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', duration: number = 3000) => {
      const id = `notification-${Date.now()}-${Math.random()}`
      const notification: Notification = {
        id,
        message,
        type,
        duration,
      }

      setNotifications((prev) => [...prev, notification])

      if (duration) {
        setTimeout(() => {
          setNotifications((prev) =>
            prev.filter((n) => n.id !== id)
          )
        }, duration)
      }

      return id
    },
    []
  )

  const success = useCallback(
    (message: string, duration?: number) => {
      return show(message, 'success', duration)
    },
    [show]
  )

  const error = useCallback(
    (message: string, duration?: number) => {
      return show(message, 'error', duration)
    },
    [show]
  )

  const warning = useCallback(
    (message: string, duration?: number) => {
      return show(message, 'warning', duration)
    },
    [show]
  )

  const info = useCallback(
    (message: string, duration?: number) => {
      return show(message, 'info', duration)
    },
    [show]
  )

  const dismiss = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.filter((n) => n.id !== id)
    )
  }, [])

  const clear = useCallback(() => {
    setNotifications([])
  }, [])

  return {
    notifications,
    show,
    success,
    error,
    warning,
    info,
    dismiss,
    clear,
  }
}
