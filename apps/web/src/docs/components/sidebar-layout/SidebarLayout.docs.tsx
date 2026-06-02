import { DocPage, type DocPageData } from '../DocPage'
import {
    SidebarLayoutBasicExample,
    SidebarLayoutWithContentExample,
    SidebarLayoutWidthsExample,
} from './SidebarLayout.examples'

const docData: DocPageData = {
    title: 'SidebarLayout',
    description:
        'Two-column app-shell layout with framed sidebar rail, optional header, and readable content panel.',
    importCode: "import { SidebarLayout } from '@monority/ui'",
    usageCode: `<SidebarLayout sidebar={<nav>...</nav>}>
  <main>Main content</main>
</SidebarLayout>`,
    preview: () => <SidebarLayoutBasicExample />,
    examples: [
        { title: 'With content', content: <SidebarLayoutWithContentExample /> },
        { title: 'Sidebar widths', content: <SidebarLayoutWidthsExample /> },
    ],
    props: [
        { name: 'sidebar', type: `ReactNode`, defaultValue: '-', description: 'Sidebar content.' },
        {
            name: 'header',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Optional header content.',
        },
        { name: 'children', type: `ReactNode`, defaultValue: '-', description: 'Main content.' },
        {
            name: 'sidebarWidth',
            type: `'sm' | 'md' | 'lg'`,
            defaultValue: '-',
            description: 'Sidebar width preset.',
        },
    ],
    cssHooks: [
        '.mr-sidebar-layout',
        '.mr-sidebar-layout__sidebar',
        '.mr-sidebar-layout__main',
        '[data-collapsed]',
    ],
    tokens: [
        '--mr-sidebar-width',
        '--mr-sidebar-collapsed-width',
        '--mr-bg-surface',
        '--mr-border-subtle',
        '--mr-space-*',
    ],
    a11y: [
        'Navigation landmark.',
        'aria-label on sidebar nav.',
        'Skip link for keyboard users.',
        'Collapse toggle with aria-label.',
    ],
}

export function SidebarLayoutDocs() {
    return <DocPage doc={docData} />
}
