import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
    ref?: Ref<HTMLDivElement>
    content?: ReactNode
    children: ReactNode
    side?: TooltipSide
    arrow?: boolean
    delayMs?: number
}

export interface TooltipTriggerProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
    children: ReactNode
    asChild?: boolean
}

export interface TooltipContentProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}
