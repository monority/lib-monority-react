import { forwardRef, useMemo } from 'react'
import { cn } from '@/lib/cn'
import type { PaginationProps } from './Pagination.types'

function buildPages(current: number, total: number): (number | 'ellipsis')[] {
  const resolvedTotal = Math.max(1, total)
  const pages = new Set([
    1,
    resolvedTotal,
    current - 1,
    current,
    current + 1,
  ])
  const sorted = Array.from(pages)
    .filter((page): page is number => page >= 1 && page <= resolvedTotal)
    .sort((left, right) => left - right)

  const result: (number | 'ellipsis')[] = []
  let previousPage: number | undefined

  for (const page of sorted) {
    if (previousPage !== undefined && page - previousPage > 1) {
      result.push('ellipsis')
    }
    result.push(page)
    previousPage = page
  }

  return result
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  function Pagination(
    { page = 1, totalPages = 1, onPageChange, className, ...props },
    ref,
  ) {
    const pages = useMemo(
      () => buildPages(page, totalPages),
      [page, totalPages],
    )

    return (
      <nav
        ref={ref}
        className={cn('mr-pagination', className)}
        aria-label="Pagination"
        {...props}
      >
        <div className="mr-pagination__slot">
          <button
            type="button"
            className="mr-pagination__btn mr-pagination__btn--nav"
            disabled={page <= 1}
            onClick={() => onPageChange?.(page - 1)}
            aria-label="Previous page"
          >
            <span aria-hidden="true">←</span>
            <span>Previous</span>
          </button>
        </div>
        <div className="mr-pagination__pages" role="list" aria-label="Page list">
          {pages.map((entry, index) =>
            entry === 'ellipsis' ? (
              <span
                key={`ellipsis-${index}`}
                className="mr-pagination__ellipsis"
                aria-hidden="true"
              >
                ...
              </span>
            ) : (
              <button
                key={entry}
                type="button"
                className={cn(
                  'mr-pagination__btn mr-pagination__btn--page',
                  entry === page && 'mr-pagination__btn--active',
                )}
                aria-current={entry === page ? 'page' : undefined}
                onClick={() => onPageChange?.(entry)}
              >
                {entry}
              </button>
            ),
          )}
        </div>
        <div className="mr-pagination__slot">
          <button
            type="button"
            className="mr-pagination__btn mr-pagination__btn--nav"
            disabled={page >= totalPages}
            onClick={() => onPageChange?.(page + 1)}
            aria-label="Next page"
          >
            <span>Next</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </nav>
    )
  },
)

export type { PaginationProps } from './Pagination.types'
