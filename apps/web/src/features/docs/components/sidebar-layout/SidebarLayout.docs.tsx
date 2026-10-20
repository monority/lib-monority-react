import { SidebarLayout } from '@monority/ui/sidebar-layout'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    SidebarLayoutWidthsExample,
    SidebarLayoutWithContentExample,
} from './SidebarLayout.examples'

function SidebarLayoutPlayground() {
    const [sidebarWidth, setSidebarWidth] = useState<'sm' | 'md' | 'lg'>('md')
    const [showHeader, setShowHeader] = useState(true)

    const snippet = `<SidebarLayout
  sidebarWidth="${sidebarWidth}"
  sidebar={
    <nav aria-label="Menu latéral">
      <div style={{ fontWeight: 600, marginBottom: 8 }}>Espace de travail</div>
      <div style={{ color: 'var(--mr-text-secondary)' }}>• Tableau de bord</div>
      <div style={{ color: 'var(--mr-text-secondary)' }}>• Équipe & Rôles</div>
      <div style={{ color: 'var(--mr-text-secondary)' }}>• Paramètres</div>
    </nav>
  }${showHeader ? '\n  header={<div>En-tête de page applicative</div>}' : ''}
>
  <div>
    <h3 style={{ margin: '0 0 8px' }}>Zone de contenu principale</h3>
    <p style={{ margin: 0, color: 'var(--mr-text-secondary)' }}>
      La colonne latérale reste contextuelle tandis que le contenu principal est mis en valeur.
    </p>
  </div>
</SidebarLayout>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    label: 'Largeur barre latérale',
                    value: sidebarWidth,
                    options: [
                        { value: 'sm', label: 'Étroite (sm)' },
                        { value: 'md', label: 'Standard (md)' },
                        { value: 'lg', label: 'Large (lg)' },
                    ],
                    onChange: (v) => setSidebarWidth(v as 'sm' | 'md' | 'lg'),
                },
                {
                    type: 'boolean',
                    label: 'Afficher en-tête',
                    value: showHeader,
                    onChange: setShowHeader,
                },
            ]}
            codeSnippet={snippet}
        >
            <div
                style={{
                    width: '100%',
                    minHeight: 220,
                    border: '1px solid var(--mr-border-subtle, #e2e8f0)',
                    borderRadius: 8,
                    overflow: 'hidden',
                }}
            >
                <SidebarLayout
                    sidebarWidth={sidebarWidth}
                    sidebar={
                        <nav
                            aria-label="Menu latéral"
                            style={{
                                padding: 12,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 8,
                                fontSize: '0.875rem',
                            }}
                        >
                            <div style={{ fontWeight: 600, marginBottom: 4 }}>
                                Espace de travail
                            </div>
                            <div style={{ color: 'var(--mr-text-secondary, #64748b)' }}>
                                • Tableau de bord
                            </div>
                            <div style={{ color: 'var(--mr-text-secondary, #64748b)' }}>
                                • Équipe & Rôles
                            </div>
                            <div style={{ color: 'var(--mr-text-secondary, #64748b)' }}>
                                • Paramètres
                            </div>
                        </nav>
                    }
                    header={
                        showHeader ? (
                            <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                                En-tête applicatif
                            </div>
                        ) : undefined
                    }
                >
                    <div>
                        <h4 style={{ margin: '0 0 8px' }}>Zone de travail principale</h4>
                        <p
                            style={{
                                margin: 0,
                                color: 'var(--mr-text-secondary, #64748b)',
                                fontSize: '0.875rem',
                            }}
                        >
                            La colonne latérale reste contextuelle tandis que le contenu principal
                            s'adapte à la largeur disponible.
                        </p>
                    </div>
                </SidebarLayout>
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'SidebarLayout',
    description:
        'Two-column app-shell layout with framed sidebar rail, optional header, and readable content panel.',
    importCode: "import { SidebarLayout } from '@monority/ui'",
    usageCode: `<SidebarLayout
  sidebar={
    <nav aria-label="Project navigation">
      <div>Workspace</div>
      <div>Overview</div>
      <div>Releases</div>
      <div>Settings</div>
    </nav>
  }
  header={<Text.Strong>Project shell</Text.Strong>}
>
  <div>
    <h3>Main area</h3>
    <p>Sidebar stays contextual, content stays readable.</p>
  </div>
</SidebarLayout>`,
    preview: () => <SidebarLayoutPlayground />,
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
    tokens: ['--mr-sidebar-width', '--mr-bg-surface', '--mr-border-subtle', '--mr-space-*'],
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
