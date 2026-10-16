import { useState } from 'react'
import { Breadcrumb } from '@monority/ui/breadcrumb'
import { ComponentPlayground } from '../../components/ComponentPlayground/ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    BreadcrumbBasicExample,
    BreadcrumbManyItemsExample,
    BreadcrumbSingleItemExample,
} from './Breadcrumb.examples'

function BreadcrumbPlayground() {
    const [depth, setDepth] = useState<'2' | '3' | '4'>('3')

    const allItems = [
        { label: 'Accueil', href: '#' },
        { label: 'Composants', href: '#' },
        { label: 'Navigation', href: '#' },
        { label: 'Breadcrumb' },
    ]

    const items =
        depth === '2'
            ? [{ label: 'Accueil', href: '#' }, { label: 'Breadcrumb' }]
            : depth === '3'
              ? [
                    { label: 'Accueil', href: '#' },
                    { label: 'Composants', href: '#' },
                    { label: 'Breadcrumb' },
                ]
              : allItems

    const snippet = `<Breadcrumb
  items={[
${items.map((i) => `    { label: '${i.label}'${i.href ? `, href: '${i.href}'` : ''} }`).join(',\n')}
  ]}
/>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    label: 'Profondeur d’arborescence',
                    value: depth,
                    options: [
                        { value: '2', label: '2 niveaux' },
                        { value: '3', label: '3 niveaux' },
                        { value: '4', label: '4 niveaux' },
                    ],
                    onChange: (v) => setDepth(v as '2' | '3' | '4'),
                },
            ]}
            codeSnippet={snippet}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 80,
                }}
            >
                <Breadcrumb items={items} />
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'Breadcrumb',
    description:
        'Breadcrumb trail with nav and ordered list semantics. Displays the current page location within a hierarchy.',
    importCode: "import { Breadcrumb } from '@monority/ui/breadcrumb'",
    usageCode: `<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Monority UI' },
  ]}
/>`,
    preview: () => <BreadcrumbPlayground />,
    examples: [
        { title: 'Many Items', content: <BreadcrumbManyItemsExample /> },
        { title: 'Single Item', content: <BreadcrumbSingleItemExample /> },
    ],
    props: [
        {
            name: 'items',
            type: '{ label: ReactNode; href?: string }[]',
            defaultValue: '[]',
            description:
                'Ordered breadcrumb trail items. Last item is rendered as current page (no href).',
        },
        {
            name: 'className',
            type: 'string',
            defaultValue: '-',
            description: 'Additional CSS class names.',
        },
    ],
    cssHooks: [
        '.mr-breadcrumb',
        '.mr-breadcrumb__list',
        '.mr-breadcrumb__item',
        '.mr-breadcrumb__link',
        '.mr-breadcrumb__current',
        '.mr-breadcrumb__separator',
    ],
    tokens: [
        '--mr-text-secondary',
        '--mr-text-primary',
        '--mr-font-size-sm',
        '--mr-space-*',
        '--mr-radius-sm',
    ],
    a11y: [
        'Renders as <nav> with aria-label="Breadcrumb".',
        'Last item uses aria-current="page".',
        'Separators are hidden from screen readers via aria-hidden.',
        'Semantic <ol> / <li> structure for ordered navigation.',
    ],
}

export function BreadcrumbDocs() {
    return <DocPage doc={docData} />
}
