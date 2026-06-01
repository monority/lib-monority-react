import type { HTMLAttributes, ReactNode } from 'react'

export interface ResizablePanelGroupProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical'
  children: ReactNode
}

export interface ResizablePanelProps extends HTMLAttributes<HTMLDivElement> {
  defaultSize?: number
  minSize?: number
  maxSize?: number
  children: ReactNode
}

export interface ResizableHandleProps extends HTMLAttributes<HTMLDivElement> {
  withHandle?: boolean
}
