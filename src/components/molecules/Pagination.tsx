import React from 'react'
import { Button } from '../atoms'
import './Pagination.css'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  siblings?: number
}

/**
 * Pagination Molecule
 * Combina: Button
 * Controles de paginación con números y navegación
 */
export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({ currentPage, totalPages, onPageChange, siblings = 1 }, ref) => {
    const getPageNumbers = () => {
      const delta = siblings
      const range: number[] = []
      const rangeWithDots: (number | string)[] = []
      let l: number | undefined

      for (let i = 1; i <= totalPages; i++) {
        if (
          i === 1 ||
          i === totalPages ||
          (i >= currentPage - delta && i <= currentPage + delta)
        ) {
          range.push(i)
        }
      }

      range.forEach((i) => {
        if (l) {
          if (i - l === 2) {
            rangeWithDots.push(l + 1)
          } else if (i - l !== 1) {
            rangeWithDots.push('...')
          }
        }
        rangeWithDots.push(i)
        l = i
      })

      return rangeWithDots
    }

    const pages = getPageNumbers()

    return (
      <div ref={ref} className="pagination">
        <Button
          variant="outline"
          size="base"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="pagination-prev"
        >
          ← Anterior
        </Button>

        <div className="pagination-numbers">
          {pages.map((page, idx) => (
            <React.Fragment key={idx}>
              {page === '...' ? (
                <span className="pagination-dots">...</span>
              ) : (
                <Button
                  variant={page === currentPage ? 'primary' : 'secondary'}
                  size="base"
                  onClick={() => onPageChange(page as number)}
                  className={`pagination-number ${
                    page === currentPage ? 'active' : ''
                  }`}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>

        <Button
          variant="outline"
          size="base"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="pagination-next"
        >
          Siguiente →
        </Button>
      </div>
    )
  }
)

Pagination.displayName = 'Pagination'
