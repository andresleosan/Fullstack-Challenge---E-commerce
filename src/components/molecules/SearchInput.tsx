import React from 'react'
import { Input, Button, Icon } from '../atoms'
import './SearchInput.css'

export interface SearchInputProps {
  value?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  placeholder?: string
  onClear?: () => void
}

/**
 * SearchInput Molecule
 * Combina: Input, Button, Icon
 * Buscador con botón clear y submisión
 */
export const SearchInput = React.forwardRef<HTMLDivElement, SearchInputProps>(
  (
    {
      value = '',
      onChange,
      onSearch,
      placeholder = 'Buscar productos...',
      onClear,
    },
    ref
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearch) {
        onSearch(value)
      }
    }

    const handleClear = () => {
      if (onChange) {
        onChange('')
      }
      if (onClear) {
        onClear()
      }
    }

    return (
      <div ref={ref} className="search-input">
        <Icon name="search" size="md" className="search-icon" />
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="search-field"
        />
        {value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="search-clear"
            aria-label="Limpiar búsqueda"
          >
            <Icon name="close" size="md" />
          </Button>
        )}
        {onSearch && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onSearch(value)}
            className="search-btn"
          >
            Buscar
          </Button>
        )}
      </div>
    )
  }
)

SearchInput.displayName = 'SearchInput'
