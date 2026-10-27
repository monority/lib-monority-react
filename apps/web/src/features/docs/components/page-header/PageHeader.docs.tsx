import { Button } from '@monority/ui/button'
import { PageHeader } from '@monority/ui/page-header'
import { Text } from '@monority/ui/text'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { pageHeaderI18n } from './PageHeader.messages'
import { PageHeaderWithActionsExample, PageHeaderWithTitleExample } from './PageHeader.examples'

function PageHeaderPlayground() {
    const [kicker, setKicker] = useState('Workspace')
    const [title, setTitle] = useState('Projects & Deliverables')
    const [description, setDescription] = useState(
        'Track real-time progress and health across active deployments.'
    )
    const [showActions, setShowActions] = useState(true)

    const snippet = `<PageHeader>
  <PageHeader.Main>
    <PageHeader.Kicker>${kicker}</PageHeader.Kicker>
    <PageHeader.Title>${title}</PageHeader.Title>
    <PageHeader.Description>${description}</PageHeader.Description>
    <PageHeader.Meta>
      <Text size="sm" tone="muted">Updated 5 min ago</Text>
      <Text size="sm" tone="muted">14 active projects</Text>
    </PageHeader.Meta>
  </PageHeader.Main>${showActions ? `\n  <PageHeader.Actions>\n    <Button variant="secondary" size="sm">Export</Button>\n    <Button variant="primary" size="sm">New project</Button>\n  </PageHeader.Actions>` : ''}
</PageHeader>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'text',
                    name: 'kicker',
                    label: 'Eyebrow (kicker)',
                    value: kicker,
                    onChange: setKicker,
                },
                {
                    type: 'text',
                    name: 'title',
                    label: 'Primary title',
                    value: title,
                    onChange: setTitle,
                },
                {
                    type: 'text',
                    name: 'description',
                    label: 'Description',
                    value: description,
                    onChange: setDescription,
                },
                {
                    type: 'boolean',
                    name: 'showActions',
                    label: 'Action buttons',
                    value: showActions,
                    onChange: setShowActions,
                },
            ]}
            codeSnippet={snippet}
        >
            <div style={{ width: '100%', minHeight: 120 }}>
                <PageHeader>
                    <PageHeader.Main>
                        <PageHeader.Kicker>{kicker}</PageHeader.Kicker>
                        <PageHeader.Title>{title}</PageHeader.Title>
                        <PageHeader.Description>{description}</PageHeader.Description>
                        <PageHeader.Meta>
                            <Text size="sm" tone="muted">
                                Updated 5 min ago
                            </Text>
                            <Text size="sm" tone="muted">
                                14 active projects
                            </Text>
                        </PageHeader.Meta>
                    </PageHeader.Main>
                    {showActions && (
                        <PageHeader.Actions>
                            <Button variant="secondary" size="sm">
                                Export
                            </Button>
                            <Button variant="primary" size="sm">
                                New project
                            </Button>
                        </PageHeader.Actions>
                    )}
                </PageHeader>
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'PageHeader',
    description: 'Semantic page header for titles, summary copy, metadata, and page-level actions.',
    importCode: "import { PageHeader } from '@monority/ui/page-header'",
    usageCode: `<PageHeader>
  <PageHeader.Main>
    <PageHeader.Kicker>Workspace</PageHeader.Kicker>
    <PageHeader.Title>Projects</PageHeader.Title>
    <PageHeader.Description>Track delivery and ownership across active work.</PageHeader.Description>
  </PageHeader.Main>
</PageHeader>`,
    preview: () => <PageHeaderPlayground />,
    examples: [
        {
            title: 'With title',
            content: <PageHeaderWithTitleExample />,
            code: `<PageHeader>
  <PageHeader.Main>
    <PageHeader.Kicker>Dashboard</PageHeader.Kicker>
    <PageHeader.Title>Welcome back, Avery</PageHeader.Title>
    <PageHeader.Description>Team pipeline stable, 4 items need review today.</PageHeader.Description>
    <PageHeader.Meta>
      <Text size="sm" tone="muted">Updated 5 min ago</Text>
      <Text size="sm" tone="muted">3 active filters</Text>
    </PageHeader.Meta>
  </PageHeader.Main>
</PageHeader>`,
        },
        {
            title: 'With actions',
            content: <PageHeaderWithActionsExample />,
            code: `<PageHeader>
  <PageHeader.Main>
    <PageHeader.Kicker>Projects</PageHeader.Kicker>
    <PageHeader.Title>Projects</PageHeader.Title>
    <PageHeader.Description>Track delivery, health, and ownership across active work.</PageHeader.Description>
    <PageHeader.Meta>
      <Text size="sm" tone="muted">24 active</Text>
      <Text size="sm" tone="muted">6 at risk</Text>
    </PageHeader.Meta>
  </PageHeader.Main>
  <PageHeader.Actions>
    <Button>New project</Button>
    <Button variant="secondary">Export</Button>
  </PageHeader.Actions>
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
        '--mr-bg-raised',
        '--mr-border-subtle',
        '--mr-text-primary',
        '--mr-text-secondary',
        '--mr-text-*',
        '--mr-space-*',
    ],
    a11y: [
        'Renders a semantic header element.',
        'Use one h1 inside the page header for the page title.',
        'Keep actions after the title copy in DOM order.',
    ],
    i18n: pageHeaderI18n,
}

export function PageHeaderDocs() {
    return <DocPage doc={docData} />
}
