import { Button } from '@monority/ui/button'
import { Topbar } from '@monority/ui/topbar'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { TopbarWithContentExample } from './Topbar.examples'

function TopbarPlayground() {
    const [activeTab, setActiveTab] = useState<'docs' | 'components' | 'themes'>('docs')
    const [statusTone, setStatusTone] = useState<'success' | 'warning' | 'danger'>('success')
    const [showStatus, setShowStatus] = useState(true)

    const statusLabel =
        statusTone === 'success'
            ? 'Opérationnel'
            : statusTone === 'warning'
              ? 'Maintenance'
              : 'Incident'

    const snippet = `<Topbar>
  <Topbar.Brand>
    <Topbar.BrandMark>M</Topbar.BrandMark>
    <span>Monority UI</span>
  </Topbar.Brand>
  <Topbar.Nav aria-label="Navigation principale">
    <Topbar.Link href="#" active={${activeTab === 'docs'}}>Documentation</Topbar.Link>
    <Topbar.Link href="#" active={${activeTab === 'components'}}>Composants</Topbar.Link>
    <Topbar.Link href="#" active={${activeTab === 'themes'}}>Thèmes</Topbar.Link>
  </Topbar.Nav>${showStatus ? `\n  <Topbar.Status tone="${statusTone}">${statusLabel}</Topbar.Status>` : ''}
  <Topbar.Actions>
    <Button size="sm" variant="primary">Nouveau</Button>
  </Topbar.Actions>
</Topbar>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    label: 'Onglet actif',
                    value: activeTab,
                    options: [
                        { value: 'docs', label: 'Documentation' },
                        { value: 'components', label: 'Composants' },
                        { value: 'themes', label: 'Thèmes' },
                    ],
                    onChange: (v) => setActiveTab(v as 'docs' | 'components' | 'themes'),
                },
                {
                    type: 'select',
                    label: 'Statut système',
                    value: statusTone,
                    options: [
                        { value: 'success', label: 'Opérationnel (success)' },
                        { value: 'warning', label: 'Maintenance (warning)' },
                        { value: 'danger', label: 'Incident (danger)' },
                    ],
                    onChange: (v) => setStatusTone(v as 'success' | 'warning' | 'danger'),
                },
                {
                    type: 'boolean',
                    label: 'Afficher le statut',
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
                    <Topbar.Nav aria-label="Navigation principale">
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
                            Composants
                        </Topbar.Link>
                        <Topbar.Link
                            href="#"
                            active={activeTab === 'themes'}
                            onClick={(e) => {
                                e.preventDefault()
                                setActiveTab('themes')
                            }}
                        >
                            Thèmes
                        </Topbar.Link>
                    </Topbar.Nav>
                    {showStatus && <Topbar.Status tone={statusTone}>{statusLabel}</Topbar.Status>}
                    <Topbar.Actions>
                        <Button size="sm" variant="primary">
                            Nouveau
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
        "Barre supérieure de navigation et d'état persistante collée en haut d'écran avec marque, navigation avec rail actif, indicateur de statut et actions.",
    importCode: "import { Topbar } from '@monority/ui/topbar'",
    usageCode: `<Topbar>
  <Topbar.Brand>
    <Topbar.BrandMark>M</Topbar.BrandMark>
    <span>Monority UI</span>
  </Topbar.Brand>
  <Topbar.Nav aria-label="Navigation principale">
    <Topbar.Link href="#" active>Documentation</Topbar.Link>
    <Topbar.Link href="#">Composants</Topbar.Link>
  </Topbar.Nav>
  <Topbar.Status tone="success">Opérationnel</Topbar.Status>
  <Topbar.Actions>
    <Button size="sm">Nouveau</Button>
  </Topbar.Actions>
</Topbar>`,
    preview: () => <TopbarPlayground />,
    examples: [{ title: 'Avec statut et actions', content: <TopbarWithContentExample /> }],
    props: [
        {
            name: 'children',
            type: 'ReactNode',
            defaultValue: '-',
            description:
                'Contenu de la barre supérieure (Topbar.Brand, Topbar.Nav, Topbar.Actions, etc.).',
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
        'Élément sémantique <header> avec repère structurel banner.',
        'Conteneur de navigation balisé avec <nav aria-label="...">.',
        'Lien actif annoté avec aria-current="page".',
        "Indicateur de statut accompagné d'un libellé textuel explicite.",
    ],
}

export function TopbarDocs() {
    return <DocPage doc={docData} />
}
