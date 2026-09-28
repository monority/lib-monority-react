import { DocPage, type DocPageData } from '../DocPage'
import {
    PageHeaderBasicExample,
    PageHeaderWithTitleExample,
    PageHeaderWithActionsExample,
} from './PageHeader.examples'

const docData: DocPageData = {
    title: 'PageHeader',
    description: 'Semantic page header for titles, summary copy, metadata, and page-level actions.',
    importCode: "import { PageHeader } from '@monority/ui/page-header'",
    usageCode: `<PageHeader>
  <div className="mr-page-header__main">
    <h1 className="mr-page-header__title">Projects</h1>
    <p className="mr-page-header__description">Track delivery and ownership across active work.</p>
  </div>
</PageHeader>`,
    preview: () => <PageHeaderBasicExample />,
    examples: [
        {
            title: 'With title',
            content: <PageHeaderWithTitleExample />,
            code: `<PageHeader>
  <div className="mr-page-header__main">
    <div className="mr-page-header__eyebrow">Dashboard</div>
    <h1 className="mr-page-header__title">Welcome back, Avery</h1>
    <p className="mr-page-header__description">Team pipeline stable, 4 items need review today.</p>
  </div>
</PageHeader>`,
        },
        {
            title: 'With actions',
            content: <PageHeaderWithActionsExample />,
            code: `<PageHeader>
  <div className="mr-page-header__main">
    <div className="mr-page-header__eyebrow">Projects</div>
    <h1 className="mr-page-header__title">Projects</h1>
    <p className="mr-page-header__description">Track delivery, health, and ownership across active work.</p>
  </div>
  <div className="mr-page-header__actions">
    <Button>New project</Button>
    <Button variant="secondary">Export</Button>
  </div>
</PageHeader>`,
        },
    ],
    props: [
        { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Header content.' },
    ],
    cssHooks: [
        '.mr-page-header',
        '.mr-page-header__main',
        '.mr-page-header__eyebrow',
        '.mr-page-header__title',
        '.mr-page-header__description',
        '.mr-page-header__meta',
        '.mr-page-header__actions',
    ],
    tokens: [
        '--mr-bg-surface-elevated',
        '--mr-border-subtle',
        '--mr-fg-strong',
        '--mr-fg-muted',
        '--mr-text-*',
        '--mr-space-*',
    ],
    a11y: [
        'Renders a semantic header element.',
        'Use one h1 inside the page header for the page title.',
        'Keep actions after the title copy in DOM order.',
    ],
}

export function PageHeaderDocs() {
    return <DocPage doc={docData} />
}
