import { useState, useCallback } from 'react'
import { InfiniteScroll } from '@monority/ui/infinite-scroll'

const MOCK_ITEMS = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`)

export function InfiniteScrollBasicExample() {
    const [items, setItems] = useState(MOCK_ITEMS.slice(0, 5))
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [scrollParent, setScrollParent] = useState<HTMLDivElement | null>(null)

    const handleLoadMore = useCallback(() => {
        if (isLoading) return
        setIsLoading(true)

        // Simuler un chargement asynchrone
        setTimeout(() => {
            const nextCount = items.length + 3
            setItems(MOCK_ITEMS.slice(0, nextCount))
            setHasMore(nextCount < MOCK_ITEMS.length)
            setIsLoading(false)
        }, 800)
    }, [items.length, isLoading])

    return (
        <div
            ref={setScrollParent}
            className="docs-infinite-scroll-viewport"
            data-testid="infinite-scroll-viewport"
        >
            <InfiniteScroll
                scrollableParent={scrollParent}
                cooldown={400}
                onLoadMore={handleLoadMore}
                hasMore={hasMore}
                loader={<span>Loading more...</span>}
                endMessage={<span>All items loaded</span>}
            >
                {items.map((item) => (
                    <div key={item} className="docs-infinite-scroll-item">
                        {item}
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    )
}

export function InfiniteScrollErrorExample() {
    const [items] = useState(['Item 1', 'Item 2', 'Item 3'])
    const [error, setError] = useState<string | null>('Failed to load more items')
    const [scrollParent, setScrollParent] = useState<HTMLDivElement | null>(null)
    const [retryCount, setRetryCount] = useState(0)

    const handleRetry = useCallback(() => {
        setRetryCount((c) => c + 1)
        setError(null)
        // Simuler un retry
        setTimeout(() => setError('Retry failed - server unreachable'), 500)
    }, [])

    return (
        <div
            ref={setScrollParent}
            className="docs-infinite-scroll-viewport"
        >
            <InfiniteScroll
                scrollableParent={scrollParent}
                hasMore={true}
                onLoadMore={() => {}}
                error={error ? <span>{error}</span> : undefined}
                onRetry={handleRetry}
            >
                {items.map((item) => (
                    <div key={item} className="docs-infinite-scroll-item">
                        {item}
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    )
}

export function InfiniteScrollEndMessageExample() {
    const items = Array.from({ length: 5 }, (_, i) => `Final item ${i + 1}`)
    const [scrollParent, setScrollParent] = useState<HTMLDivElement | null>(null)

    return (
        <div
            ref={setScrollParent}
            className="docs-infinite-scroll-viewport"
        >
            <InfiniteScroll
                scrollableParent={scrollParent}
                hasMore={false}
                onLoadMore={() => {}}
                endMessage={<span>You have reached the end</span>}
            >
                {items.map((item) => (
                    <div key={item} className="docs-infinite-scroll-item">
                        {item}
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    )
}
