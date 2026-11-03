import { Button } from '@monority/ui/button'
import { Divider } from '@monority/ui/divider'
import { Toolbar } from '@monority/ui/toolbar'
import { useState } from 'react'
import { useLocale } from '../../../../shared/i18n'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { ToolbarWithButtonsExample, ToolbarWithDividerExample } from './Toolbar.examples'
import { toolbarI18n } from './Toolbar.messages'

function ToolbarPlayground() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'
    const [density, setDensity] = useState<'md' | 'sm'>('md')
    const [showDivider, setShowDivider] = useState(true)

    const labelToolbar = isFr ? 'Outils d’édition' : 'Editing tools'
    const btnBold = isFr ? 'Gras' : 'Bold'
    const btnItalic = isFr ? 'Italique' : 'Italic'
    const btnUnderline = isFr ? 'Souligné' : 'Underline'
    const btnLink = isFr ? 'Insérer un lien' : 'Insert link'
    const btnPublish = isFr ? 'Publier' : 'Publish'

    const snippet = `<Toolbar aria-label="${labelToolbar}">
  <Button size="${density}" variant="ghost">${btnBold}</Button>
  <Button size="${density}" variant="ghost">${btnItalic}</Button>
  <Button size="${density}" variant="ghost">${btnUnderline}</Button>${showDivider ? '\n  <Divider orientation="vertical" />' : ''}
  <Button size="${density}" variant="secondary">${btnLink}</Button>
  <Button size="${density}" variant="primary">${btnPublish}</Button>
</Toolbar>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    label: isFr ? 'Taille des contrôles' : 'Control size',
                    value: density,
                    options: [
                        { value: 'md', label: isFr ? 'Moyenne (md)' : 'Medium (md)' },
                        { value: 'sm', label: isFr ? 'Petite (sm)' : 'Small (sm)' },
                    ],
                    onChange: (v) => setDensity(v as 'md' | 'sm'),
                },
                {
                    type: 'boolean',
                    label: isFr ? 'Séparateur vertical' : 'Vertical divider',
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
                <Toolbar aria-label={labelToolbar}>
                    <Button size={density} variant="ghost">
                        {btnBold}
                    </Button>
                    <Button size={density} variant="ghost">
                        {btnItalic}
                    </Button>
                    <Button size={density} variant="ghost">
                        {btnUnderline}
                    </Button>
                    {showDivider && <Divider orientation="vertical" />}
                    <Button size={density} variant="secondary">
                        {btnLink}
                    </Button>
                    <Button size={density} variant="primary">
                        {btnPublish}
                    </Button>
                </Toolbar>
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'Toolbar',
    description: 'Toolbar wrapper for grouping action controls in a horizontal layout.',
    importCode: "import { Toolbar } from '@monority/ui/toolbar'",
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
    i18n: toolbarI18n,
}

export function ToolbarDocs() {
    return <DocPage doc={docData} />
}
