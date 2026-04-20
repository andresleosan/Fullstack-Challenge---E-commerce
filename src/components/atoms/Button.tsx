import React from 'react'
import './Button.css'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'base' | 'lg' | 'xl'
  fullWidth?: boolean
  isLoading?: boolean
  children: React.ReactNode
}

/**
 * Button Component
 * Variantes: primary (cyan), secondary, outline, ghost
 * Tamaños: sm, base, lg, xl
 * Estados: hover, active, disabled, loading
 * Reutiliza CSS de Fase 1
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'base',
      fullWidth = false,
      isLoading = false,
      disabled = false,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full-width' : ''} ${isLoading ? 'btn--loading' : ''} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="btn-loader" aria-hidden="true" />
            {children}
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
