import { Button } from './Button'
import { cn } from '@/lib/cn'

function buildPages(currentPage, totalPages) {
    const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1])

    return [...pages]
        .filter((page) => page >= 1 && page <= totalPages)
        .sort((left, right) => left - right)
}

export function Pagination({
    page = 1,
    totalPages = 1,
    onPageChange,
    className,
}) {
    const pages = buildPages(page, totalPages)

    return (
        <nav className={cn('ui-pagination', className)} aria-label="Pagination">
            <Button
                variant="ghost"
                size="sm"
                disabled={page <= 1}
                onClick={() => onPageChange?.(page - 1)}
            >
                Precedent
            </Button>

            <div className="ui-pagination__pages">
                {pages.map((itemPage, index) => {
                    const previousPage = pages[index - 1]
                    const shouldRenderGap = previousPage && itemPage - previousPage > 1

                    return (
                        <div key={itemPage} className="ui-pagination__slot">
                            {shouldRenderGap ? (
                                <span className="ui-pagination__ellipsis" aria-hidden="true">
                                    ...
                                </span>
                            ) : null}
                            <button
                                type="button"
                                className={cn(
                                    'ui-pagination__page',
                                    itemPage === page && 'is-active',
                                )}
                                aria-current={itemPage === page ? 'page' : undefined}
                                onClick={() => onPageChange?.(itemPage)}
                            >
                                {itemPage}
                            </button>
                        </div>
                    )
                })}
            </div>

            <Button
                variant="ghost"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => onPageChange?.(page + 1)}
            >
                Suivant
            </Button>
        </nav>
    )
}
