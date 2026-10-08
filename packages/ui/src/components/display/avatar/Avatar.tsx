import { useMemo, useState } from 'react'
import { cn } from '@/lib/cn'
import type { AvatarProps } from './Avatar.types'

function getInitials(name?: string): string {
    if (!name) return '?'
    return name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

/**
 * Avatar contract:
 * - `src` renders an `<img>` (alt from `alt`).
 * - Fallback when there is no image or it fails to load: explicit `children`
 *   if provided, otherwise initials derived from `name`.
 * - `name` also provides the accessible name unless `alt` (or an explicit
 *   `aria-label`) is set.
 * - `status` optionally renders an indicator dot ('online' | 'offline').
 */
export function Avatar({
    src,
    alt = '',
    name,
    size = 'md',
    status,
    className,
    children,
    ref,
    ...props
}: AvatarProps) {
    const [imgError, setImgError] = useState(false)
    const initials = useMemo(() => getInitials(name), [name])
    const showImage = Boolean(src && !imgError)
    const accessibleName = alt || name

    return (
        <div
            ref={ref}
            className={cn('mr-avatar', className)}
            data-size={size}
            role={accessibleName ? 'img' : undefined}
            aria-label={accessibleName || undefined}
            {...props}
        >
            {showImage ? (
                <img
                    className="mr-avatar__img"
                    src={src}
                    alt={alt}
                    onError={() => setImgError(true)}
                />
            ) : (
                <span className="mr-avatar__initials" aria-hidden="true">
                    {children ?? initials}
                </span>
            )}
            {status ? (
                <span className="mr-avatar__status" data-status={status} aria-hidden="true" />
            ) : null}
        </div>
    )
}

export type { AvatarProps, AvatarSize, AvatarStatus } from './Avatar.types'
