import { DocPage, type DocPageData } from '../DocPage'
import {
    PaginationCompoundExample,
    PaginationInteractiveExample,
    PaginationFewPagesExample,
    PaginationManyPagesExample,
} from './Pagination.examples'

const docData: DocPageData = {
    title: 'Pagination',
    description:
        'A compact page navigator with directional actions, condensed page ranges, and a stronger active state. Supports both shorthand (page/totalPages) and composable compound subcomponents.',
    importCode: "import { Pagination } from '@monority/ui'",
    usageCode: `<Pagination>
  <Pagination.Content>
    <Pagination.Item><Pagination.Previous href="#prev" /></Pagination.Item>
    <Pagination.Item><Pagination.Link href="#1" isActive>1</Pagination.Link></Pagination.Item>
    <Pagination.Item><Pagination.Link href="#2">2</Pagination.Link></Pagination.Item>
    <Pagination.Item><Pagination.Ellipsis /></Pagination.Item>
    <Pagination.Item><Pagination.Next href="#next" /></Pagination.Item>
  </Pagination.Content>
</Pagination>`,
    preview: () => <PaginationCompoundExample />,
    examples: [
        { title: 'Compound subcomponents', content: <PaginationCompoundExample /> },
        { title: 'Interactive (shorthand)', content: <PaginationInteractiveExample /> },
        { title: 'Few pages', content: <PaginationFewPagesExample /> },
        { title: 'Many pages', content: <PaginationManyPagesExample /> },
    ],
    props: [
        {
            name: 'page',
            type: `number`,
            defaultValue: '1',
            description: 'Current page.',
        },
        {
            name: 'totalPages',
            type: `number`,
            defaultValue: '1',
            description: 'Total page count.',
        },
        {
            name: 'onPageChange',
            type: `(page: number) => void`,
            defaultValue: '-',
            description: 'Page change callback.',
        },
    ],
    cssHooks: [
        '.mr-pagination',
        '.mr-pagination__slot',
        '.mr-pagination__pages',
        '.mr-pagination__btn',
        '.mr-pagination__ellipsis',
    ],
    tokens: [
        '--mr-accent-solid',
        '--mr-border-subtle',
        '--mr-bg-surface',
        '--mr-bg-raised',
        '--mr-text-secondary',
    ],
    a11y: [
        'Uses nav semantics with an explicit pagination label.',
        'The active page exposes aria-current="page".',
        'Previous and next actions include clear labels.',
    ],
}

export function PaginationDocs() {
    return <DocPage doc={docData} />
}
