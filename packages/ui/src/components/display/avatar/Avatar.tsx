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

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  function Avatar({ src, alt = '', name, size, className, ...props }, ref) {
    const [imgError, setImgError] = useState(false)
    const initials = useMemo(() => getInitials(name), [name])
    const showImage = src && !imgError

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        data-size={size}
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
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
            {initials}
          </span>
        )}
      </div>
    )
  },
)

export type { AvatarProps, AvatarSize } from './Avatar.types'
