import { useState } from 'react'
import { Toggle } from '@monority/ui/toggle'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const defaults: PlaygroundProps = {
    children: 'Bold',
    variant: 'default',
    size: 'md',
    defaultPressed: false,
    disabled: false,
}

function codeFor(props: PlaygroundProps): string {
    const lines: string[] = []
    if (props.variant !== 'default') lines.push(`  variant="${String(props.variant)}"`)
    if (props.size !== 'md') lines.push(`  size="${String(props.size)}"`)
    if (props.defaultPressed === true) lines.push('  defaultPressed')
    if (props.disabled === true) lines.push('  disabled')
    const children = String(props.children ?? 'Bold')
    if (lines.length === 0) return `<Toggle>${children}</Toggle>`
    return `<Toggle\n${lines.join('\n')}\n>\n  ${children}\n</Toggle>`
}

function TogglePreview(props: PlaygroundProps) {
    const [pressed, setPressed] = useState(props.defaultPressed === true)
    return (
        <Toggle
            variant={props.variant as 'default'}
            size={props.size as 'md'}
            pressed={pressed}
            onPressedChange={setPressed}
            disabled={props.disabled === true}
        >
            {String(props.children ?? 'Bold')}
        </Toggle>
    )
}

export const togglePlayground: PlaygroundDefinition = {
    slug: 'toggle',
    label: 'Toggle',
    docsPath: '/docs/toggle',
    importStatement: "import { Toggle } from '@monority/ui/toggle'",
    controls: [
        { name: 'children', type: 'text', placeholder: 'Bold' },
        { name: 'variant', type: 'select', options: ['default', 'outline'] },
        { name: 'size', type: 'select', options: ['sm', 'md', 'lg'] },
        { name: 'defaultPressed', type: 'boolean', label: 'defaultPressed (initial)' },
        { name: 'disabled', type: 'boolean' },
    ],
    defaultProps: defaults,
    render: (props) => <TogglePreview key={String(props.defaultPressed === true)} {...props} />,
    generateCode: codeFor,
}
