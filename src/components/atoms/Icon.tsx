import React from 'react'

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
}

const iconSizes = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
}

/**
 * Icon Component
 * SVG inline icons
 * Soporta tamaños: sm (16px), md (24px), lg (32px), xl (48px)
 * Color personalizable
 */
export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    {
      name,
      size = 'md',
      color = 'currentColor',
      className = '',
      viewBox = '0 0 24 24',
      ...props
    },
    ref
  ) => {
    const dimensions = iconSizes[size]

    // SVG icons map - can be expanded
    const icons: Record<string, string> = {
      'shopping-bag': '<path d="M6 2l-1 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4l-1-2H6zm0 2h12v14H8V4z"/><path d="M9 1v3h6V1H9z"/>',
      'shopping-cart': '<path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>',
      'search': '<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>',
      'close': '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>',
      'menu': '<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>',
      'check': '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>',
    }

    const pathData = icons[name] || ''

    return (
      <svg
        ref={ref}
        width={dimensions}
        height={dimensions}
        viewBox={viewBox}
        fill={color}
        className={`icon icon--${size} ${className}`}
        {...props}
      >
        <g dangerouslySetInnerHTML={{ __html: pathData }} />
      </svg>
    )
  }
)

Icon.displayName = 'Icon'
