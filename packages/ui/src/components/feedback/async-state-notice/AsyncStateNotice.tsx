import { forwardRef } from 'react'
import type { AsyncStateNoticeProps } from './AsyncStateNotice.types'

export const AsyncStateNotice = forwardRef<HTMLDivElement, AsyncStateNoticeProps>(
  function AsyncStateNotice(
    { isLoading, isError, loadingMessage = 'Loading...', errorMessage = 'An error occurred', loadingContent, ...props },
    ref,
  ) {
    if (isLoading) {
      return (
        <div ref={ref} role="status" aria-live="polite" aria-busy="true" {...props}>
          {loadingContent ?? <span>{loadingMessage}</span>}
        </div>
      )
    }
    if (isError) {
      return (
        <div ref={ref} role="alert" aria-live="assertive" {...props}>
          {errorMessage}
        </div>
      )
    }
    return null
  },
)

export type { AsyncStateNoticeProps } from './AsyncStateNotice.types'
