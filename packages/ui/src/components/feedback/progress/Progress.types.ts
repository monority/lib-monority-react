import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type ProgressTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info'
export type ProgressMode = 'determinate' | 'indeterminate'

export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    ref?: Ref<HTMLDivElement>
    value?: number
    max?: number
    label?: ReactNode
    showValue?: boolean
    tone?: ProgressTone
    mode?: ProgressMode
    barClassName?: string
}

export interface ProgressTrackProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
}

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
}

export interface ProgressMetaProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
}

export interface ProgressLabelProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>
}

export interface ProgressValueProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>
}
