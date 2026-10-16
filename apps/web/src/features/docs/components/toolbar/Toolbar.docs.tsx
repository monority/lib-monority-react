import { useState } from 'react'
import { Button } from '@monority/ui/button'
import { Divider } from '@monority/ui/divider'
import { Toolbar } from '@monority/ui/toolbar'
import { ComponentPlayground } from '../../components/ComponentPlayground/ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    ToolbarBasicExample,
    ToolbarWithButtonsExample,
    ToolbarWithDividerExample,
} from './Toolbar.examples'

function ToolbarPlayground() {
    const [density, setDensity] = useState<'md' | 'sm'>('md')
    const [showDivider, setShowDivider] = useState(true)

    const snippet = `<Toolbar aria-label="Outils d’édition">
  <Button size="${density}" variant="ghost">Gras</Button>
  <Button size="${density}" variant="ghost">Italique</Button>
  <Button size="${density}" variant="ghost">Souligné</Button>${showDivider ? '\n  <Divider orientation="vertical" />' : ''}
  <Button size="${density}" variant="secondary">Insérer un lien</Button>
  <Button size="${density}" variant="primary">Publier</Button>
</Toolbar>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    label: 'Taille des contrôles',
                    value: density,
                    options: [
                        { value: 'md', label: 'Medium (md)' },
                        { value: 'sm', label: 'Small (sm)' },
                    ],
                    onChange: (v) => setDensity(v as 'md' | 'sm'),
                },
                {
                    type: 'boolean',
                    label: 'Séparateur vertical',
                    value: showDivider,
                    onChange: setShowDivider,
                },
            ]}
            codeSnippet={snippet}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 96,
                }}
            >
                <Toolbar aria-label="Outils d’édition">
                    <Button size={density} variant="ghost">
                        Gras
                    </Button>
                    <Button size={density} variant="ghost">
                        Italique
                    </Button>
                    <Button size={density} variant="ghost">
                        Souligné
                    </Button>
                    {showDivider && <Divider orientation="vertical" />}
                    <Button size={density} variant="secondary">
                        Insérer un lien
                    </Button>
                    <Button size={density} variant="primary">
                        Publier
                    </Button>
                </Toolbar>
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'Toolbar',
    description: 'Toolbar wrapper for grouping action controls in a horizontal layout.',
    importCode: "import { Toolbar } from '@monority/ui'",
    usageCode: `<Toolbar>
  <Button>Save</Button>
  <Button variant="ghost">Cancel</Button>
</Toolbar>`,
    preview: () => <ToolbarPlayground />,
    examples: [
        { title: 'With buttons', content: <ToolbarWithButtonsExample /> },
        { title: 'With divider', content: <ToolbarWithDividerExample /> },
    ],
    props: [
        { name: 'children', type: `ReactNode`, defaultValue: '-', description: 'Toolbar content.' },
    ],
    cssHooks: ['.mr-toolbar', '[data-gap]'],
    tokens: ['--mr-space-*', '--mr-border-subtle'],
    a11y: [
        'Toolbar ARIA pattern (role="toolbar").',
        'aria-label for the toolbar.',
        'Focus management.',
    ],
}

export function ToolbarDocs() {
    return <DocPage doc={docData} />
}
