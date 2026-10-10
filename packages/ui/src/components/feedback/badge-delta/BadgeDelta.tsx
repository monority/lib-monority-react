import { cn } from '@/lib/cn'
import type { BadgeDeltaProps, BadgeDeltaType } from './BadgeDelta.types'

function DeltaArrow({ type }: { type: BadgeDeltaType }) {
    if (type === 'increase') {
        return (
            <svg
                className="mr-badge-delta__icon"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
            >
                <path
                    d="M6 9.5V2.5M6 2.5L2.5 6M6 2.5L9.5 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        )
    }

    if (type === 'moderate-increase') {
        return (
            <svg
                className="mr-badge-delta__icon"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
            >
                <path
                    d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        )
    }

    if (type === 'decrease') {
        return (
            <svg
                className="mr-badge-delta__icon"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
            >
                <path
                    d="M6 2.5V9.5M6 9.5L2.5 6M6 9.5L9.5 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        )
    }

    if (type === 'moderate-decrease') {
        return (
            <svg
                className="mr-badge-delta__icon"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
            >
                <path
                    d="M3.5 3.5L8.5 8.5M8.5 8.5H4.5M8.5 8.5V4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        )
    }

    return (
        <svg
            className="mr-badge-delta__icon"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
        >
            <path d="M3 6H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}

function resolveVisualType(type: BadgeDeltaType, isPositive: boolean): BadgeDeltaType {
    if (isPositive) return type
    if (type === 'increase') return 'decrease'
    if (type === 'moderate-increase') return 'moderate-decrease'
    if (type === 'decrease') return 'increase'
    if (type === 'moderate-decrease') return 'moderate-increase'
    return 'unchanged'
}

export function BadgeDelta({
    ref,
    deltaType = 'increase',
    size = 'md',
    isIncreasePositive = true,
    children,
    className,
    ...props
}: BadgeDeltaProps) {
    const visualType = resolveVisualType(deltaType, isIncreasePositive)

    return (
        <span
            ref={ref}
            className={cn('mr-badge-delta', className)}
            data-type={visualType}
            data-size={size}
            {...props}
        >
            <DeltaArrow type={deltaType} />
            <span>{children}</span>
        </span>
    )
}
