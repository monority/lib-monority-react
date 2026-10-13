export const paginationMeta = {
    title: 'Pagination',
    status: 'stable',
    package: '@monority/ui/pagination',
    import: "import { Pagination } from '@monority/ui'",
    category: 'navigation',
    anatomy: ['root', 'list', 'item', 'prevButton', 'pageButton', 'nextButton', 'ellipsis'],
    accessibility: [
        'nav element with aria-label="Pagination"',
        'Current page marked with aria-current="page"',
        'Previous and Next buttons have clear accessible names',
    ],
}
