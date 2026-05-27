import type { HTMLAttributes } from 'react'

export type SpinnerSize = 'sm' | 'md' | 'lg'
export type SpinnerTone = 'base' | 'muted' | 'inverse'

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize
  tone?: SpinnerTone
}
