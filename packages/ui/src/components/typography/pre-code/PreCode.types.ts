import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type PreCodeSize = 'sm' | 'md'

export interface PreCodeProps extends HTMLAttributes<HTMLPreElement> {
  children?: ReactNode
  codeClassName?: string
  codeRef?: Ref<HTMLElement>
  language?: string
  size?: PreCodeSize
  wrap?: boolean
}
