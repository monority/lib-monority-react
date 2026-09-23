import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { Spinner } from '@/components/feedback/spinner/Spinner'
import type { AsyncStateNoticeProps } from './AsyncStateNotice.types'

export const AsyncStateNotice = forwardRef<HTMLDivElement, AsyncStateNoticeProps>(
  function AsyncStateNotice(
    { isLoading, isError, loadingMessage = 'Loading...', errorMessage = 'An error occurred', loadingContent, className, ...props },
    ref,
  ) {
    if (isLoading) {
      return (
        <div
          ref={ref}
          role="status"
          aria-live="polite"
          aria-busy="true"
          className={cn('mr-async-state-notice', 'mr-async-state-notice--loading', className)}
          data-state="loading"
          {...props}
        >
          {loadingContent ?? (
            <>
              <Spinner size="sm" tone="muted" aria-hidden="true" />
              <span className="mr-async-state-notice__message">{loadingMessage}</span>
            </>
          )}
        </div>
      )
    }
    if (isError) {
      return (
        <div
          ref={ref}
          role="alert"
          aria-live="assertive"
          className={cn('mr-async-state-notice', 'mr-async-state-notice--error', className)}
          data-state="error"
          {...props}
        >
          <span className="mr-async-state-notice__message">{errorMessage}</span>
        </div>
      )
    }
    return null
  },
)

export type { AsyncStateNoticeProps } from './AsyncStateNotice.types'
