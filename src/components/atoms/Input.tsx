import React from 'react'
import './Input.css'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  isRequired?: boolean
}

/**
 * Input Component
 * Soporta text, email, password, number, tel, url
 * Estados: normal, focus, error, disabled, readonly
 * Validación integrada
 * Reutiliza CSS de Fase 1
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      isRequired = false,
      className = '',
      id,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className="input-wrapper">
        {label && (
          <label htmlFor={inputId} className="input-label">
            {label}
            {isRequired && <span className="input-required">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={`input ${error ? 'input--error' : ''} ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {error && (
          <span id={`${inputId}-error`} className="input-error">
            {error}
          </span>
        )}
        {helperText && !error && (
          <span id={`${inputId}-helper`} className="input-helper">
            {helperText}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
