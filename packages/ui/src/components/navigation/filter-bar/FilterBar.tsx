import { cn } from '@/lib/cn'
import type {
    FilterBarChipProps,
    FilterBarChipsProps,
    FilterBarLeadingProps,
    FilterBarMainProps,
    FilterBarMetaProps,
    FilterBarProps,
} from './FilterBar.types'

export function FilterBar({ ref, className, role = 'group', children, ...props }: FilterBarProps) {
    return (
        <div
            ref={ref}
            className={cn('mr-filter-bar', className)}
            role={role}
            aria-label={props['aria-label'] ?? 'Filters'}
            {...props}
        >
            {children}
        </div>
    )
}

export function FilterBarMain({ ref, className, children, ...props }: FilterBarMainProps) {
    return (
        <div ref={ref} className={cn('mr-filter-bar__main', className)} {...props}>
            {children}
        </div>
    )
}

export function FilterBarLeading({ ref, className, children, ...props }: FilterBarLeadingProps) {
    return (
        <div ref={ref} className={cn('mr-filter-bar__leading', className)} {...props}>
            {children}
        </div>
    )
}

export function FilterBarChips({ ref, className, children, ...props }: FilterBarChipsProps) {
    return (
        <div ref={ref} className={cn('mr-filter-bar__chips', className)} {...props}>
            {children}
        </div>
    )
}

export function FilterBarChip({
    ref,
    active = false,
    className,
    children,
    type = 'button',
    ...props
}: FilterBarChipProps) {
    return (
        <button
            ref={ref}
            type={type}
            className={cn('mr-filter-bar__chip', className)}
            data-active={active || undefined}
            aria-pressed={active}
            {...props}
        >
            {children}
        </button>
    )
}

export function FilterBarMeta({ ref, className, children, ...props }: FilterBarMetaProps) {
    return (
        <div ref={ref} className={cn('mr-filter-bar__meta', className)} {...props}>
            {children}
        </div>
    )
}

FilterBar.Main = FilterBarMain
FilterBar.Leading = FilterBarLeading
FilterBar.Chips = FilterBarChips
FilterBar.Chip = FilterBarChip
FilterBar.Meta = FilterBarMeta

export type {
    FilterBarProps,
    FilterBarMainProps,
    FilterBarLeadingProps,
    FilterBarChipsProps,
    FilterBarChipProps,
    FilterBarMetaProps,
} from './FilterBar.types'
