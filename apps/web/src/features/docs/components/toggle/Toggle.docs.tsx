import { useState } from 'react'
import { Toggle } from '@monority/ui/toggle'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    ToggleBasicPreview,
    ToggleControlledExample,
    ToggleDisabledExample,
    ToggleSizesExample,
    ToggleVariantsExample,
} from './Toggle.examples'

function TogglePlaygroundDemo(props: {
    size: 'sm' | 'md' | 'lg'
    variant: 'default' | 'outline'
    disabled: boolean
    label: string
}) {
    const [pressed, setPressed] = useState(false)
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--mr-space-3)',
            }}
        >
            <Toggle
                size={props.size}
                variant={props.variant}
                disabled={props.disabled}
                pressed={pressed}
                onPressedChange={setPressed}
                aria-label={props.label}
            >
                {props.label}
            </Toggle>
            <span style={{ fontSize: 'var(--mr-font-size-sm)', color: 'var(--mr-text-primary)' }}>
                Etat : <strong>{pressed ? 'Active (on)' : 'Inactif (off)'}</strong>
            </span>
        </div>
    )
}

const togglePlayground = (
    <ComponentPlayground<{
        size: 'sm' | 'md' | 'lg'
        variant: 'default' | 'outline'
        disabled: boolean
        label: string
    }>
        componentName="Toggle"
        importCode="import { Toggle } from '@monority/ui/toggle'"
        getCode={(p) => {
            const propsStr = [
                p.variant !== 'default' ? `  variant="${p.variant}"` : '',
                p.size !== 'md' ? `  size="${p.size}"` : '',
                p.disabled ? '  disabled' : '',
                '  pressed={pressed}',
                '  onPressedChange={setPressed}',
                `  aria-label="${p.label}"`,
            ]
                .filter(Boolean)
                .join('\n')

            return `import { useState } from 'react'\nimport { Toggle } from '@monority/ui/toggle'\n\nconst [pressed, setPressed] = useState(false)\n\n<Toggle\n${propsStr}\n>\n  ${p.label}\n</Toggle>`
        }}
        controls={[
            {
                name: 'label',
                type: 'text',
                label: 'Libelle du bouton',
                defaultValue: 'Mode discret',
            },
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
                name: 'variant',
                type: 'select',
                label: 'Variante de style',
                defaultValue: 'default',
                options: [
                    { value: 'default', label: 'Default' },
                    { value: 'outline', label: 'Outline' },
                ],
            },
            {
                name: 'disabled',
                type: 'boolean',
                label: 'Desactive (disabled)',
                defaultValue: false,
            },
        ]}
        render={(props) => <TogglePlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'Toggle',
    description: 'Pressed-state button for view options, filters, and compact toolbar controls.',
    importCode: "import { Toggle } from '@monority/ui/toggle'",
    usageCode: '<Toggle>Preview</Toggle>',
    preview: () => <ToggleBasicPreview />,
    playground: togglePlayground,
    examples: [
        { title: 'Basic', content: <ToggleBasicPreview /> },
        { title: 'Variants', content: <ToggleVariantsExample /> },
        { title: 'Sizes', content: <ToggleSizesExample /> },
        { title: 'Controlled', content: <ToggleControlledExample /> },
        { title: 'Disabled', content: <ToggleDisabledExample /> },
    ],
    props: [
        {
            name: 'pressed',
            type: 'boolean',
            defaultValue: '-',
            description: 'Controlled pressed state.',
        },
        {
            name: 'defaultPressed',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Initial pressed state (uncontrolled).',
        },
        {
            name: 'onPressedChange',
            type: '(pressed: boolean) => void',
            defaultValue: '-',
            description: 'Callback when pressed state changes.',
        },
        {
            name: 'variant',
            type: "'default' | 'outline'",
            defaultValue: "'default'",
            description: 'Visual style.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Control density.',
        },
        {
            name: 'disabled',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Disables the toggle.',
        },
    ],
    cssHooks: ['.mr-toggle', '[data-state]', '[data-variant]', '[data-size]'],
    tokens: [
        '--mr-accent-subtle',
        '--mr-accent-text',
        '--mr-text-secondary',
        '--mr-border-subtle',
        '--mr-border-strong',
        '--mr-border-accent',
        '--mr-bg-surface-strong',
        '--mr-radius-xs',
        '--mr-radius-sm',
    ],
    keyboardNavigation: [
        {
            key: ['Space', 'Enter'],
            action: 'Bascule l etat active/inactif (aria-pressed).',
            context: 'Bouton Toggle focalise',
        },
        {
            key: 'Tab',
            action: 'Deplace le focus vers le composant suivant.',
            context: 'Bouton Toggle focalise',
        },
    ],
    a11y: [
        'Native <button> semantics with aria-pressed.',
        'data-state attribute (on/off) for styling and testing.',
        'Visible focus ring via focus-visible.',
        'Use clear labels that describe the enabled option.',
    ],
}

export function ToggleDocs() {
    return <DocPage doc={docData} />
}
