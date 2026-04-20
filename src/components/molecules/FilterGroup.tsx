import React from 'react'
import { Badge } from '../atoms'
import './FilterGroup.css'

export interface FilterOption {
  id: string
  label: string
  count?: number
}

export interface FilterGroupProps {
  title?: string
  categories?: string[]
  options?: FilterOption[]
  selectedId?: string
  selectedCategories?: string[]
  onSelectOption?: (id: string) => void
  onChange?: (categories: string[]) => void
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
      categories,
      options,
      selectedId,
      selectedCategories,
      onSelectOption,
      onChange,
      type = 'checkbox',
      showCount = true,
    },
    ref
  ) => {
    const [expanded, setExpanded] = React.useState(true)
    
    // Support both categories and options approaches
    const items: FilterOption[] = categories?.map(cat => ({ id: cat, label: cat })) || options || []
    const selected = selectedCategories || (selectedId ? [selectedId] : [])
    
    const handleChange = (id: string) => {
      if (type === 'checkbox') {
        const newSelected = selected.includes(id)
          ? selected.filter(s => s !== id)
          : [...selected, id]
        onChange?.(newSelected)
      } else {
        onSelectOption?.(id)
        onChange?.([id])
      }
    }

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
            {items.map((option) => (
              <label key={option.id} className="filter-option">
                <input
                  type={type}
                  name={title}
                  value={option.id}
                  checked={type === 'radio' ? selected.includes(option.id) : selected.includes(option.id)}
                  onChange={() => handleChange(option.id)}
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
