import { forwardRef, useMemo } from 'react'
import { cn } from '@/lib/cn'
import type { PaginationProps } from './Pagination.types'

function buildPages(current: number, total: number): (number | 'ellipsis')[] {
  const t = Math.max(1, total)
  const pages = new Set([1, t, current - 1, current, current + 1])
  const sorted = Array.from(pages).filter((p): p is number => p >= 1 && p <= t).sort((a, b) => a - b)
  const result: (number | 'ellipsis')[] = []
  let prev: number | undefined
  for (const p of sorted) {
    if (prev !== undefined && p - prev > 1) result.push('ellipsis')
    result.push(p)
    prev = p
  }
  return result
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  function Pagination({ page = 1, totalPages = 1, onPageChange, className, ...props }, ref) {
    const pages = useMemo(() => buildPages(page, totalPages), [page, totalPages])

    return (
      <nav ref={ref} className={cn('mr-pagination', className)} aria-label="Pagination" {...props}>
        <button
          type="button"
          className="mr-pagination__btn"
          disabled={page <= 1}
          onClick={() => onPageChange?.(page - 1)}
          aria-label="Previous page"
        >
          ← Prev
        </button>
        {pages.map((p, i) =>
          p === 'ellipsis' ? (
            <span key={`e-${i}`} className="mr-pagination__ellipsis" aria-hidden="true">
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              className={cn('mr-pagination__btn', p === page && 'mr-pagination__btn--active')}
              aria-current={p === page ? 'page' : undefined}
              onClick={() => onPageChange?.(p)}
            >
              {p}
            </button>
          ),
        )}
        <button
          type="button"
          className="mr-pagination__btn"
          disabled={page >= totalPages}
          onClick={() => onPageChange?.(page + 1)}
          aria-label="Next page"
        >
          Next →
        </button>
      </nav>
    )
  },
)

export type { PaginationProps } from './Pagination.types'
