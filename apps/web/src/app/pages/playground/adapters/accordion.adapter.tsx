import { Accordion } from '@monority/ui/accordion'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const demoItems = [
    {
        value: 'tokens',
        title: 'What changed in the token system?',
        content: 'Surface, border, and emphasis tokens were tightened so docs and product read as one family.',
    },
    {
        value: 'migration',
        title: 'How should teams migrate?',
        content: 'Start with shells, then shared controls, then content surfaces.',
    },
    {
        value: 'legacy',
        title: 'Legacy import path (disabled)',
        content: 'This section is disabled and skipped by keyboard navigation.',
        disabled: true,
    },
] as const

const defaults: PlaygroundProps = {
    defaultValue: 'tokens',
    allowMultiple: false,
    collapsible: true,
    size: 'md',
}

function codeFor(props: PlaygroundProps): string {
    const lines: string[] = []
    const value = String(props.defaultValue ?? 'none')
    if (value !== 'none') lines.push(`  defaultValue="${value}"`)
    if (props.allowMultiple === true) lines.push('  allowMultiple')
    if (props.collapsible !== true) lines.push('  collapsible={false}')
    if (props.size !== 'md') lines.push(`  size="${String(props.size)}"`)
    return `const items = [
  { value: 'tokens', title: 'What changed?', content: 'Token notes…' },
  { value: 'migration', title: 'How to migrate?', content: 'Shells first…' },
  { value: 'legacy', title: 'Legacy path', content: 'Disabled.', disabled: true },
]

<Accordion
  items={items}${lines.length > 0 ? `\n${lines.join('\n')}` : ''}
/>`
}

function AccordionPreview(props: PlaygroundProps) {
    const value = String(props.defaultValue ?? 'none')
    return (
        <div style={{ width: '100%' }}>
            <Accordion
                items={demoItems.map((item) => ({ ...item }))}
                defaultValue={value === 'none' ? undefined : value}
                allowMultiple={props.allowMultiple === true}
                collapsible={props.collapsible !== false}
                size={props.size as 'md'}
            />
            <p className="sc-muted" style={{ margin: '0.75rem 0 0', fontSize: '0.8125rem' }}>
                Tab to the triggers, then use ArrowUp/ArrowDown, Home/End. Enter or Space
                toggles. The legacy item is disabled.
            </p>
        </div>
    )
}

export const accordionPlayground: PlaygroundDefinition = {
    slug: 'accordion',
    label: 'Accordion',
    docsPath: '/docs/accordion',
    importStatement: "import { Accordion } from '@monority/ui/accordion'",
    controls: [
        {
            name: 'defaultValue',
            type: 'select',
            label: 'defaultValue (initial)',
            options: ['none', 'tokens', 'migration'],
        },
        { name: 'allowMultiple', type: 'boolean' },
        { name: 'collapsible', type: 'boolean' },
        { name: 'size', type: 'select', options: ['sm', 'md', 'lg'] },
    ],
    defaultProps: defaults,
    render: (props) => <AccordionPreview {...props} />,
    generateCode: codeFor,
}
