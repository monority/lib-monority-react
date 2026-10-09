import type { HTMLAttributes, Ref } from 'react'

export type SpinnerSize = 'sm' | 'md' | 'lg'
export type SpinnerTone = 'base' | 'muted' | 'inverse'

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>
    size?: SpinnerSize
    tone?: SpinnerTone
}
