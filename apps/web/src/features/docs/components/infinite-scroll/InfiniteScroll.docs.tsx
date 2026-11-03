import { Button } from '@monority/ui/button'
import { InfiniteScroll } from '@monority/ui/infinite-scroll'
import { useState } from 'react'
import { useLocale } from '../../../../shared/i18n'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    InfiniteScrollEndMessageExample,
    InfiniteScrollErrorExample,
} from './InfiniteScroll.examples'
import { infiniteScrollI18n } from './InfiniteScroll.messages'

function InfiniteScrollPlayground() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'
    const [scrollParent, setScrollParent] = useState<HTMLDivElement | null>(null)
    const [items, setItems] = useState(
        isFr
            ? ['Entrée 1', 'Entrée 2', 'Entrée 3', 'Entrée 4']
            : ['Entry 1', 'Entry 2', 'Entry 3', 'Entry 4']
    )
    const [isLoading, setIsLoading] = useState(false)

    return (
        <ComponentPlayground
            componentName="InfiniteScroll"
            controls={[
                {
                    type: 'select',
                    prop: 'state',
                    label: isFr ? 'État du chargement' : 'Loading state',
                    defaultValue: 'normal',
                    options: [
                        {
                            value: 'normal',
                            label: isFr ? 'Normal (hasMore: true)' : 'Normal (hasMore: true)',
                        },
                        {
                            value: 'end',
                            label: isFr
                                ? 'Fin de liste (hasMore: false)'
                                : 'End of list (hasMore: false)',
                        },
                        {
                            value: 'error',
                            label: isFr ? 'Erreur réseau (error)' : 'Network error (error)',
                        },
                    ],
                },
            ]}
            renderCode={(props) => `<InfiniteScroll
  hasMore={${props.state === 'normal'}}${props.state === 'end' ? `\n  endMessage={<span>${isFr ? 'Fin des résultats' : 'All items loaded'}</span>}` : ''}${props.state === 'error' ? `\n  error={<span>${isFr ? 'Erreur de chargement' : 'Loading failed'}</span>}\n  onRetry={() => {}}` : ''}
  onLoadMore={() => fetchMore()}
>
  {items.map((item) => (
    <div key={item}>{item}</div>
  ))}
</InfiniteScroll>`}
        >
            {(props) => {
                const isEnd = props.state === 'end'
                const isError = props.state === 'error'

                const handleLoadMore = () => {
                    if (isLoading || isEnd || isError) return
                    setIsLoading(true)
                    setTimeout(() => {
                        setItems((prev) => [
                            ...prev,
                            `${isFr ? 'Entrée' : 'Entry'} ${prev.length + 1}`,
                        ])
                        setIsLoading(false)
                    }, 400)
                }

                return (
                    <div style={{ width: '100%', maxWidth: 460 }}>
                        <div
                            ref={setScrollParent}
                            className="docs-infinite-scroll-viewport"
                            data-testid="infinite-scroll-viewport"
                            style={{
                                height: 220,
                                overflowY: 'auto',
                                border: '1px solid var(--mr-border-subtle)',
                                borderRadius: 'var(--mr-radius-md)',
                                padding: 'var(--mr-space-3)',
                                background: 'var(--mr-bg-raised)',
                            }}
                        >
                            <InfiniteScroll
                                scrollableParent={scrollParent}
                                hasMore={!isEnd && !isError}
                                onLoadMore={handleLoadMore}
                                loader={
                                    <div
                                        style={{
                                            textAlign: 'center',
                                            padding: 8,
                                            fontSize: 13,
                                            color: 'var(--mr-text-secondary)',
                                        }}
                                    >
                                        {isFr
                                            ? 'Chargement des entrées...'
                                            : 'Loading more entries...'}
                                    </div>
                                }
                                endMessage={
                                    <div
                                        style={{
                                            textAlign: 'center',
                                            padding: 8,
                                            fontSize: 13,
                                            color: 'var(--mr-text-secondary)',
                                        }}
                                    >
                                        {isFr
                                            ? 'Toutes les entrées ont été chargées.'
                                            : 'All entries have been loaded.'}
                                    </div>
                                }
                                error={
                                    isError ? (
                                        <div style={{ textAlign: 'center', padding: 8 }}>
                                            <span
                                                style={{
                                                    color: 'var(--mr-danger)',
                                                    fontSize: 13,
                                                    display: 'block',
                                                    marginBottom: 4,
                                                }}
                                            >
                                                {isFr
                                                    ? 'Échec de synchronisation.'
                                                    : 'Synchronization failed.'}
                                            </span>
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                onClick={() => {}}
                                            >
                                                {isFr ? 'Réessayer' : 'Retry'}
                                            </Button>
                                        </div>
                                    ) : undefined
                                }
                            >
                                {items.map((item) => (
                                    <div
                                        key={item}
                                        className="docs-infinite-scroll-item"
                                        style={{
                                            padding: '8px 12px',
                                            marginBottom: 6,
                                            borderRadius: 'var(--mr-radius-sm)',
                                            background: 'var(--mr-bg-surface)',
                                            border: '1px solid var(--mr-border-subtle)',
                                            fontSize: 14,
                                        }}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </InfiniteScroll>
                        </div>
                    </div>
                )
            }}
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'InfiniteScroll',
    description:
        'Infinite scroll container with IntersectionObserver-based loading, loader, end message, and error states.',
    importCode: "import { InfiniteScroll } from '@monority/ui/infinite-scroll'",
    usageCode: `<InfiniteScroll
  onLoadMore={handleLoadMore}
  hasMore={hasMore}
  loader={<span>Loading more...</span>}
  endMessage={<span>All items loaded</span>}
>
  {items.map((item) => (
    <div key={item}>{item}</div>
  ))}
</InfiniteScroll>`,
    playground: <InfiniteScrollPlayground />,
    preview: () => <InfiniteScrollPlayground />,
    examples: [
        { title: 'Error state', content: <InfiniteScrollErrorExample /> },
        { title: 'End message', content: <InfiniteScrollEndMessageExample /> },
    ],
    props: [
        {
            name: 'onLoadMore',
            type: `() => void`,
            defaultValue: '-',
            description: 'Callback triggered when sentinel enters viewport.',
        },
        {
            name: 'hasMore',
            type: `boolean`,
            defaultValue: 'true',
            description: 'Whether more items can be loaded.',
        },
        {
            name: 'loader',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Content shown while loading.',
        },
        {
            name: 'endMessage',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Content shown when all items are loaded.',
        },
        {
            name: 'error',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Error content shown on load failure.',
        },
        {
            name: 'onRetry',
            type: `() => void`,
            defaultValue: '-',
            description: 'Retry callback for error state.',
        },
        {
            name: 'children',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'List items to render.',
        },
    ],
    cssHooks: [
        '.mr-infinite-scroll',
        '.mr-infinite-scroll__sentinel',
        '.mr-infinite-scroll__loader',
        '.mr-infinite-scroll__end',
        '.mr-infinite-scroll__error',
    ],
    tokens: ['--mr-space-*'],
    a11y: [
        'IntersectionObserver-based loading',
        'Sentinel is aria-hidden',
        'Loading/error states announced via aria-live',
    ],
    i18n: infiniteScrollI18n,
}

export function InfiniteScrollDocs() {
    return <DocPage doc={docData} />
}
