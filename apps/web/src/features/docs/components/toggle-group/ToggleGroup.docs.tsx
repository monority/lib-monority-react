import { ToggleGroup } from '@monority/ui/toggle-group'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    ToggleGroupDisabledExample,
    ToggleGroupMultipleExample,
    ToggleGroupSinglePreview,
    ToggleGroupSizesExample,
    ToggleGroupVariantsExample,
    ToggleGroupVerticalExample,
} from './ToggleGroup.examples'

function ToggleGroupPlaygroundDemo(props: {
    size: 'sm' | 'md' | 'lg'
    variant: 'default' | 'outline'
    type: 'single' | 'multiple'
    orientation: 'horizontal' | 'vertical'
    disabled: boolean
}) {
    const [valSingle, setValSingle] = useState<string>('list')
    const [valMulti, setValMulti] = useState<string[]>(['list'])
    const items = [
        { value: 'grid', label: 'Grille' },
        { value: 'list', label: 'Liste' },
        { value: 'compact', label: 'Compact' },
    ]

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--mr-space-4)',
            }}
        >
            {props.type === 'single' ? (
                <ToggleGroup
                    items={items}
                    type="single"
                    size={props.size}
                    variant={props.variant}
                    orientation={props.orientation}
                    disabled={props.disabled}
                    value={valSingle}
                    onValueChange={(next) => setValSingle(next as string)}
                />
            ) : (
                <ToggleGroup
                    items={items}
                    type="multiple"
                    size={props.size}
                    variant={props.variant}
                    orientation={props.orientation}
                    disabled={props.disabled}
                    value={valMulti}
                    onValueChange={(next) => setValMulti(next as string[])}
                />
            )}
            <span style={{ fontSize: 'var(--mr-font-size-sm)', color: 'var(--mr-text-primary)' }}>
                Selection :{' '}
                <strong>
                    {props.type === 'single'
                        ? valSingle || 'aucune'
                        : valMulti.join(', ') || 'aucune'}
                </strong>
            </span>
        </div>
    )
}

const toggleGroupPlayground = (
    <ComponentPlayground<{
        size: 'sm' | 'md' | 'lg'
        variant: 'default' | 'outline'
        type: 'single' | 'multiple'
        orientation: 'horizontal' | 'vertical'
        disabled: boolean
    }>
        componentName="ToggleGroup"
        importCode="import { ToggleGroup } from '@monority/ui/toggle-group'"
        getCode={(p) => {
            const propsStr = [
                `  items={[\n    { value: 'grid', label: 'Grille' },\n    { value: 'list', label: 'Liste' },\n    { value: 'compact', label: 'Compact' }\n  ]}`,
                `  type="${p.type}"`,
                p.variant !== 'default' ? `  variant="${p.variant}"` : '',
                p.size !== 'md' ? `  size="${p.size}"` : '',
                p.orientation !== 'horizontal' ? `  orientation="${p.orientation}"` : '',
                p.disabled ? '  disabled' : '',
                p.type === 'single' ? '  value={value}' : '  value={values}',
                '  onValueChange={setValue}',
            ]
                .filter(Boolean)
                .join('\n')

            return `import { useState } from 'react'\nimport { ToggleGroup } from '@monority/ui/toggle-group'\n\nconst [value, setValue] = useState('list')\n\n<ToggleGroup\n${propsStr}\n/>`
        }}
        controls={[
            {
                name: 'type',
                type: 'select',
                label: 'Mode de selection',
                defaultValue: 'single',
                options: [
                    { value: 'single', label: 'Unique (single)' },
                    { value: 'multiple', label: 'Multiple' },
                ],
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
                name: 'orientation',
                type: 'select',
                label: 'Disposition',
                defaultValue: 'horizontal',
                options: [
                    { value: 'horizontal', label: 'Horizontale' },
                    { value: 'vertical', label: 'Verticale' },
                ],
            },
            {
                name: 'disabled',
                type: 'boolean',
                label: 'Desactive (disabled)',
                defaultValue: false,
            },
        ]}
        render={(props) => <ToggleGroupPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'ToggleGroup',
    description: 'Grouped pressed-state controls for mutually exclusive or multi-select options.',
    importCode: "import { ToggleGroup } from '@monority/ui/toggle-group'",
    usageCode: '<ToggleGroup items={items} type="single" />',
    preview: () => <ToggleGroupSinglePreview />,
    playground: toggleGroupPlayground,
    examples: [
        { title: 'Single select', content: <ToggleGroupSinglePreview /> },
        { title: 'Multiple select', content: <ToggleGroupMultipleExample /> },
        { title: 'Variants', content: <ToggleGroupVariantsExample /> },
        { title: 'Sizes', content: <ToggleGroupSizesExample /> },
        { title: 'Disabled', content: <ToggleGroupDisabledExample /> },
        { title: 'Vertical', content: <ToggleGroupVerticalExample /> },
    ],
    props: [
        {
            name: 'items',
            type: 'ToggleGroupItem[]',
            defaultValue: '-',
            description: 'Array of { value, label, disabled? } items.',
        },
        {
            name: 'type',
            type: "'single' | 'multiple'",
            defaultValue: "'single'",
            description: 'Selection mode.',
        },
        {
            name: 'value',
            type: 'string | string[]',
            defaultValue: '-',
            description: 'Controlled value. String for single, string[] for multiple.',
        },
        {
            name: 'defaultValue',
            type: 'string | string[]',
            defaultValue: "'' | []",
            description: 'Initial value (uncontrolled).',
        },
        {
            name: 'onValueChange',
            type: '(value: string | string[]) => void',
            defaultValue: '-',
            description: 'Callback when selection changes.',
        },
        {
            name: 'disabled',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Disables all items in the group.',
        },
        {
            name: 'orientation',
            type: "'horizontal' | 'vertical'",
            defaultValue: "'horizontal'",
            description: 'Layout direction.',
        },
        {
            name: 'variant',
            type: "'default' | 'outline'",
            defaultValue: '-',
            description: 'Visual style passed to each Toggle.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: '-',
            description: 'Size passed to each Toggle.',
        },
    ],
    cssHooks: [
        '.mr-toggle-group',
        '.mr-toggle-group__item',
        '.mr-toggle-group__item--active',
        '[data-orientation]',
        '[data-state]',
    ],
    tokens: ['--mr-radius-sm'],
    keyboardNavigation: [
        {
            key: 'Tab',
            action: 'Fait circuler le focus entre les options actives du groupe.',
            context: 'Groupe de bascules',
        },
        {
            key: ['Space', 'Enter'],
            action: 'Active ou desactive l option focalisee.',
            context: 'Option cible du groupe',
        },
    ],
    a11y: [
        'role="group" for single selection, role="toolbar" for multiple.',
        'aria-orientation reflects layout direction.',
        'Each item uses Toggle with aria-pressed.',
        'Keep item labels short enough to scan as a set.',
    ],
}

export function ToggleGroupDocs() {
    return <DocPage doc={docData} />
}
