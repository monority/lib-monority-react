import { Tabs } from '@monority/ui/tabs'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const defaults: PlaygroundProps = {
    tone: 'neutral',
    size: 'md',
    defaultValue: 'activity',
    disabled: false,
    fullWidth: false,
}

function codeFor(props: PlaygroundProps): string {
    const lines: string[] = []
    if (props.tone !== 'neutral') lines.push(`  tone="${String(props.tone)}"`)
    if (props.size !== 'md') lines.push(`  size="${String(props.size)}"`)
    if (props.defaultValue) lines.push(`  defaultValue="${String(props.defaultValue)}"`)
    if (props.disabled === true) lines.push('  disabled')
    if (props.fullWidth === true) lines.push('  fullWidth')
    const open = lines.length === 0 ? '<Tabs' : `<Tabs\n${lines.join('\n')}`
    return `${open}\n  items={[\n    { value: 'overview', label: 'Overview' },\n    { value: 'activity', label: 'Activity' },\n    { value: 'settings', label: 'Settings' },\n  ]}\n/>`
}

export const tabsPlayground: PlaygroundDefinition = {
    slug: 'tabs',
    label: 'Tabs',
    docsPath: '/docs/tabs',
    importStatement: "import { Tabs } from '@monority/ui/tabs'",
    controls: [
        { name: 'tone', type: 'select', options: ['neutral', 'accent', 'danger'] },
        { name: 'size', type: 'select', options: ['sm', 'md', 'lg'] },
        { name: 'defaultValue', type: 'select', options: ['overview', 'activity', 'settings'] },
        { name: 'disabled', type: 'boolean' },
        { name: 'fullWidth', type: 'boolean' },
    ],
    defaultProps: defaults,
    render: (props) => (
        <Tabs
            tone={props.tone as 'neutral'}
            size={props.size as 'md'}
            defaultValue={String(props.defaultValue ?? 'activity')}
            disabled={props.disabled === true}
            fullWidth={props.fullWidth === true}
            items={[
                { value: 'overview', label: 'Overview' },
                { value: 'activity', label: 'Activity' },
                { value: 'settings', label: 'Settings' },
            ]}
        />
    ),
    generateCode: codeFor,
}
