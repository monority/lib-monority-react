import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { Spinner } from '@/components/feedback/spinner/Spinner'
import type { AsyncStateNoticeProps } from './AsyncStateNotice.types'

export const AsyncStateNotice = forwardRef<HTMLDivElement, AsyncStateNoticeProps>(
  function AsyncStateNotice(
    { isLoading, isError, loadingMessage = 'Loading...', errorMessage = 'An error occurred', loadingContent, className, ...props },
    ref,
  ) {
    const state = isLoading ? 'loading' : isError ? 'error' : 'idle'

    if (state === 'idle') return null

    if (state === 'loading') {
      return (
        <div
          key={state}
          ref={ref}
          role="status"
          aria-live="polite"
          aria-atomic="true"
          aria-busy="true"
           className={cn('mr-async-state-notice', 'mr-async-state-notice--loading', className)}
           data-state={state}
          {...props}
        >
           {loadingContent != null ? loadingContent : (
            <>
              <Spinner size="sm" tone="muted" aria-hidden="true" />
              <span className="mr-async-state-notice__message">{loadingMessage}</span>
            </>
          )}
        </div>
      )
    }
    if (state === 'error') {
      return (
        <div
          key={state}
          ref={ref}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          className={cn('mr-async-state-notice', 'mr-async-state-notice--error', className)}
          data-state={state}
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
