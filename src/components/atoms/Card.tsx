import React from 'react'
import './Card.css'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'product'
  children: React.ReactNode
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

/**
 * Card Component - Composable
 * Variantes: default, elevated, outlined, product
 * Subcomponentes: Card.Header, Card.Body, Card.Footer
 * Reutiliza CSS de Fase 1
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`card card--${variant} ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={`card-header ${className}`} {...props}>
        {children}
      </div>
    )
  }
)

CardHeader.displayName = 'CardHeader'

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={`card-body ${className}`} {...props}>
        {children}
      </div>
    )
  }
)

CardBody.displayName = 'CardBody'

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={`card-footer ${className}`} {...props}>
        {children}
      </div>
    )
  }
)

CardFooter.displayName = 'CardFooter'

// Attach subcomponents
Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter
