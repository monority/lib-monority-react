import { useState } from 'react'
import { Rating } from '@monority/ui/rating'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const defaults: PlaygroundProps = {
    value: 3,
    max: 5,
    size: 'md',
    disabled: false,
    readOnly: false,
}

function RatingDemo(props: PlaygroundProps) {
    const [val, setVal] = useState(Number(props.value ?? 3))

    return (
        <Rating
            value={val}
            onChange={setVal}
            max={Number(props.max ?? 5)}
            size={props.size as 'md'}
            disabled={Boolean(props.disabled)}
            readOnly={Boolean(props.readOnly)}
        />
    )
}

function codeFor(props: PlaygroundProps): string {
    const lines: string[] = []
    lines.push(`  value={${Number(props.value ?? 3)}}`)
    if (props.max && Number(props.max) !== 5) {
        lines.push(`  max={${Number(props.max)}}`)
    }
    if (props.size && props.size !== 'md') {
        lines.push(`  size="${String(props.size)}"`)
    }
    if (props.disabled === true) {
        lines.push('  disabled')
    }
    if (props.readOnly === true) {
        lines.push('  readOnly')
    }
    return `<Rating\n${lines.join('\n')}\n  onChange={setValue}\n/>`
}

export const ratingPlayground: PlaygroundDefinition = {
    slug: 'rating',
    label: 'Rating',
    docsPath: '/docs/rating',
    importStatement: "import { Rating } from '@monority/ui/rating'",
    controls: [
        { name: 'value', type: 'number', label: 'value (initial)', min: 0, max: 10 },
        { name: 'max', type: 'number', min: 1, max: 10 },
        { name: 'size', type: 'select', options: ['sm', 'md', 'lg'] },
        { name: 'disabled', type: 'boolean' },
        { name: 'readOnly', type: 'boolean' },
    ],
    defaultProps: defaults,
    render: (props) => <RatingDemo key={String(props.value)} {...props} />,
    generateCode: codeFor,
}
