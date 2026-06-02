export const infiniteScrollMeta = {
    title: 'InfiniteScroll',
    status: 'draft',
    package: '@monority/ui/infinite-scroll',
    import: "import { InfiniteScroll } from '@monority/ui/infinite-scroll'",
    category: 'experimental',
    anatomy: ['root', 'sentinel', 'loader', 'end', 'error', 'empty'],
    accessibility: [
        'IntersectionObserver-based loading',
        'Sentinel is aria-hidden',
        'Loading/error states announced via aria-live',
    ],
}
