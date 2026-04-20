import React from 'react'
import { Input, Button, Badge } from '../atoms'
import './FilterGroup.css'

export interface FilterOption {
  id: string
  label: string
  count?: number
}

export interface FilterGroupProps {
  title: string
  options: FilterOption[]
  selectedId?: string
  onSelectOption?: (id: string) => void
  type?: 'radio' | 'checkbox'
  showCount?: boolean
}

/**
 * FilterGroup Molecule
 * Combina: Input (checkbox/radio), Button, Badge
 * Grupo de filtros para categorías, precios, etc
 */
export const FilterGroup = React.forwardRef<HTMLDivElement, FilterGroupProps>(
  (
    {
      title,
      options,
      selectedId,
      onSelectOption,
      type = 'radio',
      showCount = true,
    },
    ref
  ) => {
    const [expanded, setExpanded] = React.useState(true)

    return (
      <div ref={ref} className="filter-group">
        <button
          className="filter-group-header"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          <span className="filter-group-title">{title}</span>
          <span className={`filter-group-toggle ${expanded ? 'expanded' : ''}`}>
            ▼
          </span>
        </button>

        {expanded && (
          <div className="filter-group-options">
            {options.map((option) => (
              <label key={option.id} className="filter-option">
                <input
                  type={type}
                  name={title}
                  value={option.id}
                  checked={type === 'radio' ? selectedId === option.id : false}
                  onChange={() => onSelectOption?.(option.id)}
                  className="filter-option-input"
                />
                <span className="filter-option-label">{option.label}</span>
                {showCount && option.count !== undefined && (
                  <Badge variant="secondary" size="sm" className="filter-option-count">
                    {option.count}
                  </Badge>
                )}
              </label>
            ))}
          </div>
        )}
      </div>
    )
  }
)

FilterGroup.displayName = 'FilterGroup'
