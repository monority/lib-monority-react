import { useMemo, useState } from 'react'
import { cn } from '@/lib/cn'

const sizeClassName = {
    sm: 'ui-avatar--sm',
    md: 'ui-avatar--md',
    lg: 'ui-avatar--lg',
}

function getInitials(name) {
    if (!name) {
        return '?'
    }

    const parts = name.trim().split(/\s+/).filter(Boolean)

    if (parts.length === 0) {
        return '?'
    }

    if (parts.length === 1) {
        return parts[0].slice(0, 2).toUpperCase()
    }

    return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase()
}

export function Avatar({ src, alt, name, size = 'md', className }) {
    const [hasError, setHasError] = useState(false)
    const initials = useMemo(() => getInitials(name || alt), [alt, name])
    const shouldRenderImage = Boolean(src) && !hasError

    return (
        <span
            className={cn('ui-avatar', sizeClassName[size], className)}
            aria-label={alt || name || 'Avatar'}
        >
            {shouldRenderImage ? (
                <img
                    className="ui-avatar__image"
                    src={src}
                    alt={alt || name || ''}
                    onError={() => setHasError(true)}
                />
            ) : (
                <span className="ui-avatar__fallback" aria-hidden="true">
                    {initials}
                </span>
            )}
        </span>
    )
}
