import type { HTMLAttributes, ReactNode } from 'react'

export interface AsyncStateNoticeProps extends HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean
  isError?: boolean
  loadingMessage?: ReactNode
  errorMessage?: ReactNode
  loadingContent?: ReactNode
}
