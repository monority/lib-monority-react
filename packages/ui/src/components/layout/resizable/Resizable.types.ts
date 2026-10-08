import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface ResizablePanelGroupProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    direction?: 'horizontal' | 'vertical'
    children: ReactNode
}

export interface ResizablePanelProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    defaultSize?: number
    minSize?: number
    maxSize?: number
    children: ReactNode
}

export interface ResizableHandleProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    withHandle?: boolean
}
