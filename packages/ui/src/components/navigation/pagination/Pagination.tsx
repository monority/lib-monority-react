import { Button } from '@/components/actions/button/Button'
import { cn } from '@/lib/cn'

function buildPages(cp: number, tp: number) { return [...new Set([1, tp, cp - 1, cp, cp + 1])].filter((p) => p >= 1 && p <= tp).sort((a, b) => a - b) }
interface PaginationProps { page?: number; totalPages?: number; onPageChange?: (page: number) => void; className?: string }

export function Pagination({ page = 1, totalPages = 1, onPageChange, className }: PaginationProps) {
  const pages = buildPages(page, totalPages)
  return <nav className={cn('ui-pagination', className)} aria-label="Pagination">
    <Button variant="ghost" size="sm" disabled={page <= 1} onClick={() => onPageChange?.(page - 1)}>Precedent</Button>
    <div className="ui-pagination__pages">{pages.map((itemPage, index) => { const prev = pages[index - 1]; const gap = prev && itemPage - prev > 1; return <div key={itemPage} className="ui-pagination__slot">{gap ? <span className="ui-pagination__ellipsis" aria-hidden="true">...</span> : null}<button type="button" className={cn('ui-pagination__page', itemPage === page && 'is-active')} aria-current={itemPage === page ? 'page' : undefined} onClick={() => onPageChange?.(itemPage)}>{itemPage}</button></div> })}</div>
    <Button variant="ghost" size="sm" disabled={page >= totalPages} onClick={() => onPageChange?.(page + 1)}>Suivant</Button>
  </nav>
}
