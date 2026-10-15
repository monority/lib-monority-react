import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type HoverCardAlign = 'start' | 'center' | 'end'
export type HoverCardSide = 'top' | 'bottom' | 'left' | 'right'

export interface HoverCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
    content?: ReactNode
    openDelay?: number
    closeDelay?: number
    side?: HoverCardSide
    align?: HoverCardAlign
    sideOffset?: number
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
    arrow?: boolean
    contentClassName?: string
}

export interface HoverCardTriggerProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>
    children?: ReactNode
}

export interface HoverCardContentProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
    arrow?: boolean
}
