import { useState } from 'react'
import { ToggleGroup } from '@monority/ui/toggle-group'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const toggleItems = [
    { value: 'left', label: 'Gauche' },
    { value: 'center', label: 'Centre' },
    { value: 'right', label: 'Droite' },
]

const defaults: PlaygroundProps = {
    type: 'single',
    size: 'md',
    orientation: 'horizontal',
    disabled: false,
}

function ToggleGroupDemo(props: PlaygroundProps) {
    const [val, setVal] = useState<string | string[]>('center')

    return (
        <ToggleGroup
            type={props.type as 'single' | 'multiple'}
            size={props.size as 'sm' | 'md' | 'lg'}
            orientation={props.orientation as 'horizontal' | 'vertical'}
            disabled={Boolean(props.disabled)}
            items={toggleItems}
            value={val}
            onValueChange={setVal}
        />
    )
}

function codeFor(props: PlaygroundProps): string {
    return `<ToggleGroup type="${String(props.type ?? 'single')}" size="${String(props.size ?? 'md')}" items={items} />`
}

export const toggleGroupPlayground: PlaygroundDefinition = {
    slug: 'toggle-group',
    label: 'ToggleGroup',
    docsPath: '/docs/toggle-group',
    importStatement: "import { ToggleGroup } from '@monority/ui/toggle-group'",
    controls: [
        { name: 'type', type: 'select', options: ['single', 'multiple'] },
        { name: 'size', type: 'select', options: ['sm', 'md', 'lg'] },
        { name: 'orientation', type: 'select', options: ['horizontal', 'vertical'] },
        { name: 'disabled', type: 'boolean' },
    ],
    defaultProps: defaults,
    render: (props) => <ToggleGroupDemo {...props} />,
    generateCode: codeFor,
}
