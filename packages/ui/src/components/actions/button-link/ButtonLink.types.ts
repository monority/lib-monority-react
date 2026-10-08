import type { AnchorHTMLAttributes, ReactNode, Ref } from 'react'

export type ButtonLinkVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonLinkSize = 'sm' | 'md' | 'lg'

export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    ref?: Ref<HTMLAnchorElement>
    href: string
    variant?: ButtonLinkVariant
    size?: ButtonLinkSize
    loading?: boolean
    disabled?: boolean
    fullWidth?: boolean
    iconLeading?: ReactNode
    iconTrailing?: ReactNode
    children?: ReactNode
}
