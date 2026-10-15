import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type PopoverAlign = 'start' | 'center' | 'end'
export type PopoverSide = 'top' | 'bottom' | 'left' | 'right'

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    trigger?: ReactNode | string
    children?: ReactNode
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
    align?: PopoverAlign
    side?: PopoverSide
    contentClassName?: string
}

export interface PopoverTriggerProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
    asChild?: boolean
    children?: ReactNode
}

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}

export interface PopoverAnchorProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}
