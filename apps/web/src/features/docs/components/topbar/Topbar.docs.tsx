import { Button } from '@monority/ui/button'
import { Topbar } from '@monority/ui/topbar'
import { useState } from 'react'
import { useLocale } from '../../../../shared/i18n'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { TopbarWithContentExample } from './Topbar.examples'
import { topbarI18n } from './Topbar.messages'

function TopbarPlayground() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'
    const [activeTab, setActiveTab] = useState<'docs' | 'components' | 'themes'>('docs')
    const [statusTone, setStatusTone] = useState<'success' | 'warning' | 'danger'>('success')
    const [showStatus, setShowStatus] = useState(true)

    const statusLabel =
        statusTone === 'success'
            ? isFr
                ? 'Opérationnel'
                : 'Operational'
            : statusTone === 'warning'
              ? isFr
                  ? 'Maintenance'
                  : 'Maintenance'
              : isFr
                ? 'Incident'
                : 'Incident'

    const snippet = `<Topbar>
  <Topbar.Brand>
    <Topbar.BrandMark>M</Topbar.BrandMark>
    <span>Monority UI</span>
  </Topbar.Brand>
  <Topbar.Nav aria-label="${isFr ? 'Navigation principale' : 'Primary navigation'}">
    <Topbar.Link href="#" active={${activeTab === 'docs'}}>Documentation</Topbar.Link>
    <Topbar.Link href="#" active={${activeTab === 'components'}}>${isFr ? 'Composants' : 'Components'}</Topbar.Link>
    <Topbar.Link href="#" active={${activeTab === 'themes'}}>${isFr ? 'Thèmes' : 'Themes'}</Topbar.Link>
  </Topbar.Nav>${showStatus ? `\n  <Topbar.Status tone="${statusTone}">${statusLabel}</Topbar.Status>` : ''}
  <Topbar.Actions>
    <Button size="sm" variant="primary">${isFr ? 'Nouveau' : 'New'}</Button>
  </Topbar.Actions>
</Topbar>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    label: isFr ? 'Onglet actif' : 'Active tab',
                    value: activeTab,
                    options: [
                        { value: 'docs', label: 'Documentation' },
                        { value: 'components', label: isFr ? 'Composants' : 'Components' },
                        { value: 'themes', label: isFr ? 'Thèmes' : 'Themes' },
                    ],
                    onChange: (v) => setActiveTab(v as 'docs' | 'components' | 'themes'),
                },
                {
                    type: 'select',
                    label: isFr ? 'Statut système' : 'System status',
                    value: statusTone,
                    options: [
                        {
                            value: 'success',
                            label: isFr ? 'Opérationnel (success)' : 'Operational (success)',
                        },
                        {
                            value: 'warning',
                            label: isFr ? 'Maintenance (warning)' : 'Maintenance (warning)',
                        },
                        {
                            value: 'danger',
                            label: isFr ? 'Incident (danger)' : 'Incident (danger)',
                        },
                    ],
                    onChange: (v) => setStatusTone(v as 'success' | 'warning' | 'danger'),
                },
                {
                    type: 'boolean',
                    label: isFr ? 'Afficher le statut' : 'Show status',
                    value: showStatus,
                    onChange: setShowStatus,
                },
            ]}
            codeSnippet={snippet}
        >
            <div
                style={{
                    width: '100%',
                    minHeight: 80,
                    border: '1px solid var(--mr-border-subtle, #e2e8f0)',
                    borderRadius: 8,
                    overflow: 'hidden',
                    boxSizing: 'border-box',
                }}
            >
                <Topbar>
                    <Topbar.Brand>
                        <Topbar.BrandMark>M</Topbar.BrandMark>
                        <span>Monority UI</span>
                    </Topbar.Brand>
                    <Topbar.Nav aria-label={isFr ? 'Navigation principale' : 'Primary navigation'}>
                        <Topbar.Link
                            href="#"
                            active={activeTab === 'docs'}
                            onClick={(e) => {
                                e.preventDefault()
                                setActiveTab('docs')
                            }}
                        >
                            Documentation
                        </Topbar.Link>
                        <Topbar.Link
                            href="#"
                            active={activeTab === 'components'}
                            onClick={(e) => {
                                e.preventDefault()
                                setActiveTab('components')
                            }}
                        >
                            {isFr ? 'Composants' : 'Components'}
                        </Topbar.Link>
                        <Topbar.Link
                            href="#"
                            active={activeTab === 'themes'}
                            onClick={(e) => {
                                e.preventDefault()
                                setActiveTab('themes')
                            }}
                        >
                            {isFr ? 'Thèmes' : 'Themes'}
                        </Topbar.Link>
                    </Topbar.Nav>
                    {showStatus && <Topbar.Status tone={statusTone}>{statusLabel}</Topbar.Status>}
                    <Topbar.Actions>
                        <Button size="sm" variant="primary">
                            {isFr ? 'Nouveau' : 'New'}
                        </Button>
                    </Topbar.Actions>
                </Topbar>
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'Topbar',
    description:
        'Persistent top navigation and status bar anchored to viewport top with branding, rail-aligned navigation, status indicator, and action buttons.',
    importCode: "import { Topbar } from '@monority/ui/topbar'",
    usageCode: `<Topbar>
  <Topbar.Brand>
    <Topbar.BrandMark>M</Topbar.BrandMark>
    <span>Monority UI</span>
  </Topbar.Brand>
  <Topbar.Nav aria-label="Primary navigation">
    <Topbar.Link href="#" active>Documentation</Topbar.Link>
    <Topbar.Link href="#">Components</Topbar.Link>
  </Topbar.Nav>
  <Topbar.Status tone="success">Operational</Topbar.Status>
  <Topbar.Actions>
    <Button size="sm">New</Button>
  </Topbar.Actions>
</Topbar>`,
    preview: () => <TopbarPlayground />,
    examples: [{ title: 'With status and actions', content: <TopbarWithContentExample /> }],
    props: [
        {
            name: 'children',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Topbar content (Topbar.Brand, Topbar.Nav, Topbar.Actions, etc.).',
        },
    ],
    cssHooks: [
        '.mr-topbar',
        '.mr-topbar__brand',
        '.mr-topbar__brand-mark',
        '.mr-topbar__navigation',
        '.mr-topbar__link',
        '.mr-topbar__actions',
        '.mr-topbar__meta',
        '.mr-topbar__status',
        '.mr-topbar__status-dot',
        '[data-active]',
        '[data-tone]',
    ],
    tokens: [
        '--mr-bg-surface',
        '--mr-bg-canvas',
        '--mr-bg-sunken',
        '--mr-border-subtle',
        '--mr-border-default',
        '--mr-accent-solid',
        '--mr-text-primary',
        '--mr-text-secondary',
        '--mr-space-4',
        '--mr-space-6',
    ],
    a11y: [
        'Semantic <header> element with banner landmark role.',
        'Navigation container marked with <nav aria-label="...">.',
        'Active link annotated with aria-current="page".',
        'Status indicator accompanied by explicit text label.',
    ],
    i18n: topbarI18n,
}

export function TopbarDocs() {
    return <DocPage doc={docData} />
}
