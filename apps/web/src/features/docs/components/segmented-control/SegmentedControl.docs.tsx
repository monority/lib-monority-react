import { SegmentedControl } from '@monority/ui/segmented-control'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    SegmentedControlBasicExample,
    SegmentedControlCompoundExample,
    SegmentedControlSizesExample,
} from './SegmentedControl.examples'

function SegmentedControlPlaygroundDemo(props: {
    size: 'sm' | 'md' | 'lg'
    fullWidth: boolean
    disabled: boolean
}) {
    const [view, setView] = useState('monthly')
    const options = [
        { value: 'daily', label: 'Journalier' },
        { value: 'weekly', label: 'Hebdo' },
        { value: 'monthly', label: 'Mensuel' },
        { value: 'yearly', label: 'Annuel' },
    ]

    return (
        <div
            style={{
                width: '100%',
                maxWidth: '480px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--mr-space-4)',
                alignItems: props.fullWidth ? 'stretch' : 'center',
            }}
        >
            <SegmentedControl
                options={options}
                value={view}
                onChange={setView}
                size={props.size}
                fullWidth={props.fullWidth}
                disabled={props.disabled}
                aria-label="Frequence des rapports"
            />
            <div
                style={{
                    padding: 'var(--mr-space-3) var(--mr-space-4)',
                    background: 'var(--mr-bg-surface-strong)',
                    border: '1px solid var(--mr-border-subtle)',
                    borderRadius: 'var(--mr-radius-md)',
                    color: 'var(--mr-text-primary)',
                    fontSize: 'var(--mr-font-size-sm)',
                    textAlign: 'center',
                    width: props.fullWidth ? '100%' : 'auto',
                }}
            >
                Selection active : <strong>{view}</strong>
            </div>
        </div>
    )
}

const segmentedControlPlayground = (
    <ComponentPlayground<{
        size: 'sm' | 'md' | 'lg'
        fullWidth: boolean
        disabled: boolean
    }>
        componentName="SegmentedControl"
        importCode="import { SegmentedControl } from '@monority/ui/segmented-control'"
        getCode={(p) => {
            const propsStr = [
                `  options={[\n    { value: 'daily', label: 'Journalier' },\n    { value: 'weekly', label: 'Hebdo' },\n    { value: 'monthly', label: 'Mensuel' },\n    { value: 'yearly', label: 'Annuel' }\n  ]}`,
                '  value={view}',
                '  onChange={setView}',
                p.size !== 'md' ? `  size="${p.size}"` : '',
                p.fullWidth ? '  fullWidth' : '',
                p.disabled ? '  disabled' : '',
                '  aria-label="Frequence des rapports"',
            ]
                .filter(Boolean)
                .join('\n')

            return `import { useState } from 'react'\nimport { SegmentedControl } from '@monority/ui/segmented-control'\n\nconst [view, setView] = useState('monthly')\n\n<SegmentedControl\n${propsStr}\n/>`
        }}
        controls={[
            {
                name: 'size',
                type: 'select',
                label: 'Dimension (size)',
                defaultValue: 'md',
                options: [
                    { value: 'sm', label: 'Small' },
                    { value: 'md', label: 'Medium' },
                    { value: 'lg', label: 'Large' },
                ],
            },
            {
                name: 'fullWidth',
                type: 'boolean',
                label: 'Pleine largeur (fullWidth)',
                defaultValue: false,
            },
            {
                name: 'disabled',
                type: 'boolean',
                label: 'Desactive (disabled)',
                defaultValue: false,
            },
        ]}
        render={(props) => <SegmentedControlPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'SegmentedControl',
    description:
        'Controle compact a segments multiples permettant de basculer instantanement entre des vues ou modes exclusifs.',
    importCode: "import { SegmentedControl } from '@monority/ui/segmented-control'",
    usageCode: `<SegmentedControl
  options={[
    { value: 'grid', label: 'Vue Grille' },
    { value: 'list', label: 'Vue Liste' },
    { value: 'table', label: 'Vue Tableau' },
  ]}
  value={view}
  onChange={setView}
/>`,
    preview: () => <SegmentedControlBasicExample />,
    playground: segmentedControlPlayground,
    examples: [
        { title: 'Tailles standardisees (sm, md, lg)', content: <SegmentedControlSizesExample /> },
        {
            title: 'Composition declarative (SegmentedControl.Item)',
            content: <SegmentedControlCompoundExample />,
        },
    ],
    props: [
        {
            name: 'options',
            type: 'SegmentedControlOption[]',
            defaultValue: '-',
            description: 'Liste des options avec value, label, disabled.',
        },
        {
            name: 'value',
            type: 'string',
            defaultValue: '-',
            description: 'Valeur controlee de l option active.',
        },
        {
            name: 'defaultValue',
            type: 'string',
            defaultValue: '-',
            description: 'Valeur initiale par defaut en mode incontrole.',
        },
        {
            name: 'onChange',
            type: '(value: string) => void',
            defaultValue: '-',
            description: 'Rappel declenche lors de la selection d une option.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Hauteur et echelle de densite du controle.',
        },
        {
            name: 'fullWidth',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Occupe toute la largeur disponible du conteneur.',
        },
        {
            name: 'disabled',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Desactive l ensemble du controle.',
        },
    ],
    cssHooks: [
        '.mr-segmented-control',
        '.mr-segmented-control__item',
        '.mr-segmented-control__indicator',
        '[data-state="active"]',
        '[data-size="sm|md|lg"]',
        '[data-full-width="true"]',
    ],
    tokens: [
        '--mr-bg-muted',
        '--mr-bg-surface',
        '--mr-text-primary',
        '--mr-text-muted',
        '--mr-shadow-sm',
        '--mr-radius-control-md',
        '--mr-size-control-sm',
        '--mr-size-control-md',
        '--mr-size-control-lg',
    ],
    keyboardNavigation: [
        {
            key: ['ArrowRight', 'ArrowDown'],
            action: 'Deplace la selection et le focus vers le segment suivant dans le groupe.',
            context: 'Groupe radio (radiogroup)',
        },
        {
            key: ['ArrowLeft', 'ArrowUp'],
            action: 'Deplace la selection et le focus vers le segment precedent dans le groupe.',
            context: 'Groupe radio (radiogroup)',
        },
        {
            key: 'Home',
            action: 'Selectionne et active le premier segment non desactive.',
            context: 'Groupe radio (radiogroup)',
        },
        {
            key: 'End',
            action: 'Selectionne et active le dernier segment non desactive.',
            context: 'Groupe radio (radiogroup)',
        },
        {
            key: 'Space',
            action: 'Active le segment focalise.',
            context: 'Segment cible',
        },
        {
            key: 'Tab',
            action: 'Transfere le focus au prochain element interactif hors du groupe radio.',
            context: 'Segment actif',
        },
    ],
    a11y: [
        'Conforme au motif WAI-ARIA Radio Group avec role="radiogroup".',
        'Chaque segment possede role="radio" et aria-checked="true|false".',
        'Support complet de la navigation par fleches du clavier (Left/Right/Up/Down) avec roving tabindex.',
    ],
}

export function SegmentedControlDocs() {
    return <DocPage doc={docData} />
}
