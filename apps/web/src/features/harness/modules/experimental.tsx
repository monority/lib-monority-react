import { useState } from 'react'
import { Button, InfiniteScroll, Spinner } from '@monority/ui'
import { Sample } from '../Sample'

export function InfiniteScrollHarness() {
    const [items, setItems] = useState<number[]>([1, 2, 3, 4, 5])
    const [hasMore, setHasMore] = useState(true)

    const handleLoadMore = () => {
        if (items.length >= 15) {
            setHasMore(false)
            return
        }
        setTimeout(() => {
            setItems((prev) => [...prev, prev.length + 1, prev.length + 2, prev.length + 3])
        }, 500)
    }

    return (
        <>
            <Sample label="Infinite Scroll Container">
                <div
                    id="infinite-scroll-container"
                    style={{
                        height: 220,
                        overflowY: 'auto',
                        border: '1px solid var(--mr-border-default)',
                        borderRadius: 'var(--mr-radius-md)',
                        padding: 'var(--mr-spacing-3)',
                    }}
                >
                    <InfiniteScroll
                        hasMore={hasMore}
                        onLoadMore={handleLoadMore}
                        loader={
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--mr-spacing-2)',
                                    padding: 'var(--mr-spacing-2) 0',
                                }}
                            >
                                <Spinner size="sm" />
                                <span
                                    style={{
                                        fontSize: 'var(--mr-type-small-size)',
                                        color: 'var(--mr-text-secondary)',
                                    }}
                                >
                                    Loading more items...
                                </span>
                            </div>
                        }
                        endMessage={
                            <div
                                style={{
                                    textAlign: 'center',
                                    padding: 'var(--mr-spacing-2) 0',
                                    color: 'var(--mr-text-secondary)',
                                    fontSize: 'var(--mr-type-small-size)',
                                }}
                            >
                                All {items.length} items loaded.
                            </div>
                        }
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'var(--mr-spacing-2)',
                            }}
                        >
                            {items.map((i) => (
                                <div
                                    key={i}
                                    style={{
                                        padding: 'var(--mr-spacing-2) var(--mr-spacing-3)',
                                        backgroundColor: 'var(--mr-bg-muted)',
                                        borderRadius: 'var(--mr-radius-sm)',
                                        fontSize: 'var(--mr-type-small-size)',
                                    }}
                                >
                                    List item #{i}
                                </div>
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
                <div style={{ marginTop: 'var(--mr-spacing-2)' }}>
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                            setItems([1, 2, 3, 4, 5])
                            setHasMore(true)
                        }}
                    >
                        Reset List
                    </Button>
                </div>
            </Sample>
        </>
    )
}
