import React from 'react'
import './Badge.css'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
  outline?: boolean
  children: React.ReactNode
}

/**
 * Badge Component
 * Variantes: primary, secondary, success, warning, error, info
 * Tamaños: sm, md, lg
 * Modo outline disponible
 * Reutiliza CSS de Fase 1
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      outline = false,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={`badge badge--${variant} badge--${size} ${outline ? 'badge--outline' : ''} ${className}`}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
