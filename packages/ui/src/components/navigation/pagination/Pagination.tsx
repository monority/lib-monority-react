import { useMemo, type Ref } from 'react'
import { cn } from '@/lib/cn'
import type {
    PaginationContentProps,
    PaginationEllipsisProps,
    PaginationItemProps,
    PaginationLinkProps,
    PaginationNextProps,
    PaginationPreviousProps,
    PaginationProps,
} from './Pagination.types'

function buildPages(current: number, total: number): (number | 'ellipsis')[] {
    const resolvedTotal = Math.max(1, total)
    const pages = new Set([1, resolvedTotal, current - 1, current, current + 1])
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

export function Pagination({
    ref,
    page = 1,
    totalPages = 1,
    onPageChange,
    className,
    children,
    ...props
}: PaginationProps) {
    const pages = useMemo(() => buildPages(page, totalPages), [page, totalPages])

    if (children) {
        return (
            <nav
                ref={ref}
                className={cn('mr-pagination', className)}
                aria-label="Pagination"
                {...props}
            >
                {children}
            </nav>
        )
    }

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
                    data-variant="nav"
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
                                entry === page && 'mr-pagination__btn--active'
                            )}
                            data-variant="page"
                            data-active={entry === page ? 'true' : undefined}
                            aria-current={entry === page ? 'page' : undefined}
                            onClick={() => onPageChange?.(entry)}
                        >
                            {entry}
                        </button>
                    )
                )}
            </div>
            <div className="mr-pagination__slot">
                <button
                    type="button"
                    className="mr-pagination__btn mr-pagination__btn--nav"
                    data-variant="nav"
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
}

function PaginationContent({ ref, className, children, ...props }: PaginationContentProps) {
    return (
        <div
            ref={ref}
            className={cn('mr-pagination__pages', className)}
            role="list"
            aria-label="Page list"
            {...props}
        >
            {children}
        </div>
    )
}

function PaginationItem({ ref, className, children, ...props }: PaginationItemProps) {
    return (
        <div ref={ref} className={cn('mr-pagination__slot', className)} {...props}>
            {children}
        </div>
    )
}

function PaginationLink({
    ref,
    isActive = false,
    className,
    children,
    ...props
}: PaginationLinkProps) {
    return (
        <a
            ref={ref}
            className={cn(
                'mr-pagination__btn mr-pagination__btn--page',
                isActive && 'mr-pagination__btn--active',
                className
            )}
            data-variant="page"
            data-active={isActive ? 'true' : undefined}
            aria-current={isActive ? 'page' : undefined}
            {...props}
        >
            {children}
        </a>
    )
}

function PaginationPrevious({ ref, className, children, ...props }: PaginationPreviousProps) {
    return (
        <a
            ref={ref}
            className={cn('mr-pagination__btn mr-pagination__btn--nav', className)}
            data-variant="nav"
            aria-label="Previous page"
            {...props}
        >
            {children ?? (
                <>
                    <span aria-hidden="true">←</span>
                    <span>Previous</span>
                </>
            )}
        </a>
    )
}

function PaginationNext({ ref, className, children, ...props }: PaginationNextProps) {
    return (
        <a
            ref={ref}
            className={cn('mr-pagination__btn mr-pagination__btn--nav', className)}
            data-variant="nav"
            aria-label="Next page"
            {...props}
        >
            {children ?? (
                <>
                    <span>Next</span>
                    <span aria-hidden="true">→</span>
                </>
            )}
        </a>
    )
}

function PaginationEllipsis({
    ref,
    className,
    children = '...',
    ...props
}: PaginationEllipsisProps) {
    return (
        <span
            ref={ref}
            className={cn('mr-pagination__ellipsis', className)}
            aria-hidden="true"
            {...props}
        >
            {children}
        </span>
    )
}

PaginationContent.displayName = 'Pagination.Content'
PaginationItem.displayName = 'Pagination.Item'
PaginationLink.displayName = 'Pagination.Link'
PaginationPrevious.displayName = 'Pagination.Previous'
PaginationNext.displayName = 'Pagination.Next'
PaginationEllipsis.displayName = 'Pagination.Ellipsis'

Pagination.Content = PaginationContent
Pagination.Item = PaginationItem
Pagination.Link = PaginationLink
Pagination.Previous = PaginationPrevious
Pagination.Next = PaginationNext
Pagination.Ellipsis = PaginationEllipsis

export {
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
}

export type {
    PaginationProps,
    PaginationContentProps,
    PaginationItemProps,
    PaginationLinkProps,
    PaginationPreviousProps,
    PaginationNextProps,
    PaginationEllipsisProps,
} from './Pagination.types'
