import { forwardRef, useRef, useEffect, useCallback, useState, type RefObject } from 'react'
import { cn } from '@/lib/cn'
import type { InfiniteScrollProps } from './InfiniteScroll.types'

function useIntersectionObserver(
  targetRef: RefObject<HTMLDivElement | null>,
  options: { root?: HTMLElement | null; rootMargin?: string; threshold?: number | number[]; disabled?: boolean },
  callback: () => void,
) {
  useEffect(() => {
    const el = targetRef.current
    if (!el || options.disabled) return

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry?.isIntersecting) callback()
    }, {
      root: options.root ?? null,
      rootMargin: options.rootMargin ?? '0px',
      threshold: options.threshold ?? 0,
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [targetRef, options.root, options.rootMargin, options.threshold, options.disabled, callback])
}

export const InfiniteScroll = forwardRef<HTMLDivElement, InfiniteScrollProps>(function InfiniteScroll(
  {
    children,
    onLoadMore,
    hasMore = true,
    loader,
    endMessage,
    emptyMessage,
    error,
    onRetry,
    threshold,
    rootMargin,
    scrollableParent,
    reverse = false,
    disabled = false,
    cooldown = 0,
    className,
    ...props
  },
  ref,
) {
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const cooldownRef = useRef(false)
  const hasItems = useRef(false)

  useEffect(() => {
    if (children) hasItems.current = true
  }, [children])

  const handleIntersect = useCallback(() => {
    if (cooldownRef.current || !hasMore || disabled) return

    setIsLoading(true)
    cooldownRef.current = true

    // Always release cooldown (default 200ms debounce prevents rapid re-triggers)
    setTimeout(() => { cooldownRef.current = false }, cooldown > 0 ? cooldown : 200)

    onLoadMore?.()
  }, [hasMore, disabled, cooldown, onLoadMore])

  // Reset loading state when hasMore becomes false (end of list)
  useEffect(() => {
    if (!hasMore) setIsLoading(false)
  }, [hasMore])

  useIntersectionObserver(
    sentinelRef,
    { root: scrollableParent, rootMargin, threshold, disabled: disabled || !hasMore },
    handleIntersect,
  )

  const childrenArr = Array.isArray(children) ? children : [children]
  const hasChildren = childrenArr.some(c => c != null)

  const sentinel = (
    <div
      ref={sentinelRef}
      className='mr-infinite-scroll__sentinel'
      aria-hidden='true'
    />
  )

  const loaderElement = isLoading && !error ? (
    <div className='mr-infinite-scroll__loader'>{loader || 'Loading...'}</div>
  ) : null

  const endElement = !hasMore && !error ? (
    hasChildren && endMessage ? (
      <div className='mr-infinite-scroll__end'>{endMessage}</div>
    ) : !hasChildren && emptyMessage ? (
      <div className='mr-infinite-scroll__empty'>{emptyMessage}</div>
    ) : null
  ) : null

  const errorElement = error ? (
    <div className='mr-infinite-scroll__error'>
      {error}
      {onRetry && (
        <button
          type='button'
          className='mr-infinite-scroll__retry'
          onClick={onRetry}
        >
          Retry
        </button>
      )}
    </div>
  ) : null

  return (
    <div
      ref={ref}
      className={cn('mr-infinite-scroll', className)}
      data-reverse={reverse || undefined}
      {...props}
    >
      {reverse && sentinel}
      {children}
      {!reverse && sentinel}
      {loaderElement}
      {endElement}
      {errorElement}
    </div>
  )
})

export type { InfiniteScrollProps } from './InfiniteScroll.types'
