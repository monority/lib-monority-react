import type { ReactNode, TextareaHTMLAttributes } from 'react'

export type TextareaTone = 'neutral' | 'accent' | 'danger'
export type TextareaSize = 'sm' | 'md' | 'lg'

// `children` is excluded: content would be rendered as the textarea's value,
// conflicting with `value` / `defaultValue`.
export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'children'> {
  tone?: TextareaTone
  size?: TextareaSize
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  className?: string
  invalid?: boolean
  resize?: 'none' | 'vertical' | 'both'
}
