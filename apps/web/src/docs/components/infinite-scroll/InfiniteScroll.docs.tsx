import { DocPage, type DocPageData } from '../DocPage'
import {
    InfiniteScrollBasicExample,
    InfiniteScrollErrorExample,
    InfiniteScrollEndMessageExample,
} from './InfiniteScroll.examples'

const docData: DocPageData = {
    title: 'InfiniteScroll',
    description:
        'Infinite scroll container with IntersectionObserver-based loading, loader, end message, and error states.',
    importCode: "import { InfiniteScroll } from '@monority/ui/infinite-scroll'",
    usageCode: `<InfiniteScroll onLoadMore={handleLoadMore} hasMore={hasMore}>
  {items.map((item) => (
    <div key={item}>{item}</div>
  ))}
</InfiniteScroll>`,
    preview: () => <InfiniteScrollBasicExample />,
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
        '.mr-infinite-scroll__sentinel, .mr-infinite-scroll__loader, .mr-infinite-scroll__end, .mr-infinite-scroll__error',
    ],
    tokens: ['--mr-space-*'],
    a11y: [
        'IntersectionObserver-based loading',
        'Sentinel is aria-hidden',
        'Loading/error states announced via aria-live',
    ],
}

export function InfiniteScrollDocs() {
    return <DocPage doc={docData} />
}
