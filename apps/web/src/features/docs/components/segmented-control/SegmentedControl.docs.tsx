import { SegmentedControl } from '@monority/ui/segmented-control'
import { useState } from 'react'
import { useLocale } from '../../../../shared/i18n'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    SegmentedControlBasicExample,
    SegmentedControlCompoundExample,
    SegmentedControlSizesExample,
} from './SegmentedControl.examples'
import { segmentedControlI18n } from './SegmentedControl.messages'

function SegmentedControlPlaygroundDemo(props: {
    size: 'sm' | 'md' | 'lg'
    fullWidth: boolean
    disabled: boolean
}) {
    const { locale } = useLocale()
    const isFr = locale === 'fr'
    const [view, setView] = useState('monthly')
    const options = isFr
        ? [
              { value: 'daily', label: 'Journalier' },
              { value: 'weekly', label: 'Hebdo' },
              { value: 'monthly', label: 'Mensuel' },
              { value: 'yearly', label: 'Annuel' },
          ]
        : [
              { value: 'daily', label: 'Daily' },
              { value: 'weekly', label: 'Weekly' },
              { value: 'monthly', label: 'Monthly' },
              { value: 'yearly', label: 'Yearly' },
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
                aria-label={isFr ? 'Fréquence des rapports' : 'Report frequency'}
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
                {isFr ? 'Sélection active : ' : 'Active selection: '}
                <strong>{view}</strong>
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
                `  options={[\n    { value: 'daily', label: 'Daily' },\n    { value: 'weekly', label: 'Weekly' },\n    { value: 'monthly', label: 'Monthly' },\n    { value: 'yearly', label: 'Yearly' }\n  ]}`,
                '  value={view}',
                '  onChange={setView}',
                p.size !== 'md' ? `  size="${p.size}"` : '',
                p.fullWidth ? '  fullWidth' : '',
                p.disabled ? '  disabled' : '',
                '  aria-label="Report frequency"',
            ]
                .filter(Boolean)
                .join('\n')

            return `import { useState } from 'react'\nimport { SegmentedControl } from '@monority/ui/segmented-control'\n\nconst [view, setView] = useState('monthly')\n\n<SegmentedControl\n${propsStr}\n/>`
        }}
        controls={[
            {
                name: 'size',
                type: 'select',
                label: 'Size',
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
                label: 'Full width (fullWidth)',
                defaultValue: false,
            },
            {
                name: 'disabled',
                type: 'boolean',
                label: 'Disabled',
                defaultValue: false,
            },
        ]}
        render={(props) => <SegmentedControlPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'SegmentedControl',
    description: 'Compact multi-segment control for switching between exclusive views or modes.',
    importCode: "import { SegmentedControl } from '@monority/ui/segmented-control'",
    usageCode: `<SegmentedControl
  options={[
    { value: 'grid', label: 'Grid view' },
    { value: 'list', label: 'List view' },
    { value: 'table', label: 'Table view' },
  ]}
  value={view}
  onChange={setView}
/>`,
    preview: () => <SegmentedControlBasicExample />,
    playground: segmentedControlPlayground,
    examples: [
        { title: 'Standard sizes (sm, md, lg)', content: <SegmentedControlSizesExample /> },
        {
            title: 'Declarative compound composition (SegmentedControl.Item)',
            content: <SegmentedControlCompoundExample />,
        },
    ],
    props: [
        {
            name: 'options',
            type: 'SegmentedControlOption[]',
            defaultValue: '-',
            description: 'List of options with value, label, disabled.',
        },
        {
            name: 'value',
            type: 'string',
            defaultValue: '-',
            description: 'Controlled active value.',
        },
        {
            name: 'defaultValue',
            type: 'string',
            defaultValue: '-',
            description: 'Initial default value in uncontrolled mode.',
        },
        {
            name: 'onChange',
            type: '(value: string) => void',
            defaultValue: '-',
            description: 'Callback fired on option selection.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Height and density scale of the control.',
        },
        {
            name: 'fullWidth',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Expands to fill available container width.',
        },
        {
            name: 'disabled',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Disables the entire control.',
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
            action: 'Moves selection and focus to next segment in group.',
            context: 'Radio group',
        },
        {
            key: ['ArrowLeft', 'ArrowUp'],
            action: 'Moves selection and focus to previous segment in group.',
            context: 'Radio group',
        },
        {
            key: 'Home',
            action: 'Selects and activates first non-disabled segment.',
            context: 'Radio group',
        },
        {
            key: 'End',
            action: 'Selects and activates last non-disabled segment.',
            context: 'Radio group',
        },
        {
            key: 'Space',
            action: 'Activates focused segment.',
            context: 'Target segment',
        },
        {
            key: 'Tab',
            action: 'Moves focus to next interactive element outside the radio group.',
            context: 'Active segment',
        },
    ],
    a11y: [
        'Complies with WAI-ARIA Radio Group pattern using role="radiogroup".',
        'Each segment has role="radio" and aria-checked="true|false".',
        'Full keyboard navigation support via arrows (Left/Right/Up/Down) with roving tabindex.',
    ],
    i18n: segmentedControlI18n,
}

export function SegmentedControlDocs() {
    return <DocPage doc={docData} />
}
