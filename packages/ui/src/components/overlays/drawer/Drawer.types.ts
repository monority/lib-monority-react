import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom'

export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    open: boolean
    title: string
    children: ReactNode
    side?: DrawerSide
    onClose: () => void
}
