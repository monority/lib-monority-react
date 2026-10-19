import { cn } from '@/lib/cn'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type {
    AvatarFallbackProps,
    AvatarImageProps,
    AvatarProps,
    AvatarSize,
    AvatarStatusIndicatorProps,
} from './Avatar.types'

function getInitials(name?: string): string {
    if (!name) return '?'
    return name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

interface AvatarContextValue {
    size: AvatarSize
    imgError: boolean
    setImgError: (error: boolean) => void
    hasImage: boolean
    setHasImage: (has: boolean) => void
}

const AvatarContext = createContext<AvatarContextValue | null>(null)

export function AvatarImage({
    ref,
    src,
    alt = '',
    className,
    onError,
    ...props
}: AvatarImageProps) {
    const ctx = useContext(AvatarContext)

    useEffect(() => {
        if (ctx) ctx.setHasImage(Boolean(src))
    }, [ctx, src])

    if (ctx?.imgError || !src) return null

    return (
        <img
            ref={ref}
            className={cn('mr-avatar__img', className)}
            src={src}
            alt={alt ?? ''}
            onError={(e) => {
                onError?.(e)
                ctx?.setImgError(true)
            }}
            {...props}
        />
    )
}

export function AvatarFallback({ ref, children, className, ...props }: AvatarFallbackProps) {
    const ctx = useContext(AvatarContext)
    if (ctx?.hasImage && !ctx.imgError) {
        return null
    }

    return (
        <span
            ref={ref}
            className={cn('mr-avatar__initials', className)}
            aria-hidden="true"
            {...props}
        >
            {children}
        </span>
    )
}

export function AvatarStatusIndicator({
    ref,
    status = 'online',
    className,
    ...props
}: AvatarStatusIndicatorProps) {
    return (
        <span
            ref={ref}
            className={cn('mr-avatar__status', className)}
            data-status={status}
            aria-hidden="true"
            {...props}
        />
    )
}

/**
 * Avatar contract:
 * - `src` renders an `<img>` (alt from `alt`).
 * - Fallback when there is no image or it fails to load: explicit `children`
 *   if provided, otherwise initials derived from `name`.
 * - `name` also provides the accessible name unless `alt` (or an explicit
 *   `aria-label`) is set.
 * - `status` optionally renders an indicator dot ('online' | 'offline').
 * - Can also be composed with `Avatar.Image`, `Avatar.Fallback`, and `Avatar.Status`.
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
    const [hasImage, setHasImage] = useState(Boolean(src))
    const initials = useMemo(() => getInitials(name), [name])
    const accessibleName = alt || name

    const contextValue: AvatarContextValue = {
        size,
        imgError,
        setImgError,
        hasImage,
        setHasImage,
    }

    return (
        <AvatarContext.Provider value={contextValue}>
            <div
                ref={ref}
                className={cn('mr-avatar', className)}
                data-size={size}
                role={accessibleName ? 'img' : undefined}
                aria-label={accessibleName || undefined}
                {...props}
            >
                {src ? (
                    !imgError ? (
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
                    )
                ) : name ? (
                    <span className="mr-avatar__initials" aria-hidden="true">
                        {children ?? initials}
                    </span>
                ) : typeof children === 'string' || typeof children === 'number' ? (
                    <span className="mr-avatar__initials" aria-hidden="true">
                        {children}
                    </span>
                ) : !children ? (
                    <span className="mr-avatar__initials" aria-hidden="true">
                        {initials}
                    </span>
                ) : (
                    children
                )}
                {status ? (
                    <span className="mr-avatar__status" data-status={status} aria-hidden="true" />
                ) : null}
            </div>
        </AvatarContext.Provider>
    )
}

Avatar.Image = AvatarImage
Avatar.Fallback = AvatarFallback
Avatar.Status = AvatarStatusIndicator

export type {
    AvatarProps,
    AvatarSize,
    AvatarStatus,
    AvatarImageProps,
    AvatarFallbackProps,
    AvatarStatusIndicatorProps,
} from './Avatar.types'
