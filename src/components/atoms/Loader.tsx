import React from 'react'
import './Loader.css'

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'spinner' | 'dots' | 'bar'
}

/**
 * Loader Component
 * Variantes: spinner (rotación), dots (puntitos), bar (barra)
 * Tamaños: sm (24px), md (40px), lg (64px)
 */
export const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  (
    {
      size = 'md',
      variant = 'spinner',
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`loader loader--${variant} loader--${size} ${className}`}
        role="status"
        aria-busy="true"
        aria-label="Loading"
        {...props}
      >
        {variant === 'spinner' && <div className="loader-spinner" />}
        {variant === 'dots' && (
          <>
            <div className="loader-dot" />
            <div className="loader-dot" />
            <div className="loader-dot" />
          </>
        )}
        {variant === 'bar' && <div className="loader-bar" />}
      </div>
    )
  }
)

Loader.displayName = 'Loader'
