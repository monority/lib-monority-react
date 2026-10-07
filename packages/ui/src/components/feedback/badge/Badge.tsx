import { cn } from '@/lib/cn'
import type { BadgeDotProps, BadgeProps, BadgeTone, BadgeVariant } from './Badge.types'

const variantToTone: Record<BadgeVariant, BadgeTone> = {
    default: 'neutral',
    primary: 'accent',
    success: 'success',
    warning: 'warning',
    danger: 'danger',
}

const toneToVariant: Partial<Record<BadgeTone, BadgeVariant>> = {
    neutral: 'default',
    accent: 'primary',
    success: 'success',
    warning: 'warning',
    danger: 'danger',
}

function BadgeDot({ className, ref, ...props }: BadgeDotProps) {
    return (
        <span ref={ref} className={cn('mr-badge__dot', className)} aria-hidden="true" {...props} />
    )
}

export function Badge({
    className,
    tone,
    variant,
    size = 'sm',
    dot = false,
    children,
    ref,
    ...props
}: BadgeProps) {
    const resolvedTone: BadgeTone = tone ?? (variant ? variantToTone[variant] : 'neutral')
    const resolvedVariant: BadgeVariant = variant ?? toneToVariant[resolvedTone] ?? 'default'

    return (
        <span
            ref={ref}
            className={cn('mr-badge', className)}
            data-tone={resolvedTone}
            data-variant={resolvedVariant}
            data-size={size}
            data-dot={dot ? 'true' : undefined}
            {...props}
        >
            {dot ? <BadgeDot /> : null}
            {children}
        </span>
    )
}

Badge.Dot = BadgeDot

export type { BadgeDotProps, BadgeProps, BadgeSize, BadgeTone, BadgeVariant } from './Badge.types'
