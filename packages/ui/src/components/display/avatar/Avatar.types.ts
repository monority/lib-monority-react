import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type AvatarSize = 'sm' | 'md' | 'lg'
export type AvatarStatus = 'online' | 'offline'

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    /** Image source. When absent (or when the image fails to load) the fallback renders. */
    src?: string
    /** Image alt text; also used as the accessible name when provided. */
    alt?: string
    /** Person name: provides the accessible name (unless alt/aria-label set) and the initials fallback. */
    name?: string
    /** Explicit fallback content rendered instead of the derived initials. */
    children?: ReactNode
    size?: AvatarSize
    status?: AvatarStatus
}
