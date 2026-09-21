import { forwardRef, useMemo, useState } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import type { AvatarProps } from './Avatar.types'

const avatarVariants = cva({
  base: 'mr-avatar',
  variants: {
    size: {
      sm: 'mr-avatar--sm',
      md: 'mr-avatar--md',
      lg: 'mr-avatar--lg',
    },
  },
  defaultVariants: { size: 'md' },
})

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
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  function Avatar({ src, alt = '', name, size, className, children, ...props }, ref) {
    const resolvedSize = size ?? 'md'
    const [imgError, setImgError] = useState(false)
    const initials = useMemo(() => getInitials(name), [name])
    const showImage = src && !imgError
    const accessibleName = alt || name

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size: resolvedSize }), className)}
        data-size={resolvedSize}
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
      </div>
    )
  },
)

export type { AvatarProps, AvatarSize } from './Avatar.types'
