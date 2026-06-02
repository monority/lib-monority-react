import { DocPage, type DocPageData } from '../DocPage'
import { TopbarBasicExample, TopbarWithContentExample } from './Topbar.examples'

const docData: DocPageData = {
    title: 'Topbar',
    description: 'Top header bar wrapper using the HTML <header> element.',
    importCode: "import { Topbar } from '@monority/ui'",
    usageCode: `<Topbar>
  <span>Logo</span>
  <nav>Navigation</nav>
</Topbar>`,
    preview: () => <TopbarBasicExample />,
    examples: [{ title: 'With content', content: <TopbarWithContentExample /> }],
    props: [
        { name: 'children', type: `ReactNode`, defaultValue: '-', description: 'Header content.' },
    ],
    cssHooks: ['.mr-topbar', '.mr-topbar__left', '.mr-topbar__center', '.mr-topbar__right'],
    tokens: ['--mr-bg-surface', '--mr-border-subtle', '--mr-space-*'],
    a11y: ['Banner landmark.', 'aria-label for branding.', 'Skip link support.'],
}

export function TopbarDocs() {
    return <DocPage doc={docData} />
}
