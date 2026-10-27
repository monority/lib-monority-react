import { Pagination } from '@monority/ui/pagination'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { paginationI18n } from './Pagination.messages'
import {
    PaginationCompoundExample,
    PaginationFewPagesExample,
    PaginationInteractiveExample,
    PaginationManyPagesExample,
} from './Pagination.examples'

function PaginationPlayground() {
    const [page, setPage] = useState(3)
    const [totalPages, setTotalPages] = useState<'5' | '10' | '20'>('10')

    const totalPagesNum = Number(totalPages)
    const activePage = Math.min(page, totalPagesNum)

    const snippet = `<Pagination
  page={${activePage}}
  totalPages={${totalPagesNum}}
  onPageChange={(page) => setPage(page)}
/>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    name: 'totalPages',
                    label: 'Total pages',
                    value: totalPages,
                    options: [
                        { value: '5', label: '5 pages' },
                        { value: '10', label: '10 pages' },
                        { value: '20', label: '20 pages' },
                    ],
                    onChange: (v) => {
                        setTotalPages(v as '5' | '10' | '20')
                        if (page > Number(v)) {
                            setPage(Number(v))
                        }
                    },
                },
            ]}
            codeSnippet={snippet}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 16,
                    minHeight: 96,
                    justifyContent: 'center',
                }}
            >
                <Pagination page={activePage} totalPages={totalPagesNum} onPageChange={setPage} />
                <span style={{ fontSize: '0.85rem', color: 'var(--mr-text-secondary, #64748b)' }}>
                    Active page: {activePage} of {totalPagesNum}
                </span>
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'Pagination',
    description:
        'A compact page navigator with directional actions, condensed page ranges, and a stronger active state. Supports both shorthand (page/totalPages) and composable compound subcomponents.',
    importCode: "import { Pagination } from '@monority/ui/pagination'",
    usageCode: `<Pagination>
  <Pagination.Content>
    <Pagination.Item><Pagination.Previous href="#prev" /></Pagination.Item>
    <Pagination.Item><Pagination.Link href="#1" isActive>1</Pagination.Link></Pagination.Item>
    <Pagination.Item><Pagination.Link href="#2">2</Pagination.Link></Pagination.Item>
    <Pagination.Item><Pagination.Ellipsis /></Pagination.Item>
    <Pagination.Item><Pagination.Next href="#next" /></Pagination.Item>
  </Pagination.Content>
</Pagination>`,
    preview: () => <PaginationPlayground />,
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
    keyboardNavigation: [
        { key: 'Tab', action: 'Navigates between page numbers and previous/next buttons' },
        { key: 'Enter', action: 'Activates the selected page' },
        { key: 'Space', action: 'Activates the selected page' },
    ],
    a11y: [
        'Uses nav semantics with an explicit pagination label.',
        'The active page exposes aria-current="page".',
        'Previous and next actions include clear labels.',
    ],
    i18n: paginationI18n,
}

export function PaginationDocs() {
    return <DocPage doc={docData} />
}
