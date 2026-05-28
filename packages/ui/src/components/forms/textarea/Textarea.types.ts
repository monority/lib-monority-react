import type { ReactNode, TextareaHTMLAttributes } from 'react'

export type TextareaTone = 'neutral' | 'accent' | 'danger'
export type TextareaSize = 'sm' | 'md' | 'lg'

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  tone?: TextareaTone
  size?: TextareaSize
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  className?: string
  invalid?: boolean
  resize?: 'none' | 'vertical' | 'both'
}
