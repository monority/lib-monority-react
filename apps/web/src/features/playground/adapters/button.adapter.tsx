import { Button } from '@monority/ui/button'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const defaults: PlaygroundProps = {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
    iconOnly: false,
    children: 'Continue',
}

function codeFor(props: PlaygroundProps): string {
    const lines: string[] = []
    if (props.variant !== 'primary') lines.push(`  variant="${String(props.variant)}"`)
    if (props.size !== 'md') lines.push(`  size="${String(props.size)}"`)
    if (props.disabled === true) lines.push('  disabled')
    if (props.loading === true) lines.push('  loading')
    if (props.fullWidth === true) lines.push('  fullWidth')
    if (props.iconOnly === true) {
        lines.push('  iconOnly')
        lines.push('  aria-label="Continue"')
    }
    const children = String(props.children ?? 'Continue')
    if (lines.length === 0) return `<Button>${children}</Button>`
    return `<Button\n${lines.join('\n')}\n>\n  ${children}\n</Button>`
}

export const buttonPlayground: PlaygroundDefinition = {
    slug: 'button',
    label: 'Button',
    docsPath: '/docs/button',
    importStatement: "import { Button } from '@monority/ui/button'",
    controls: [
        {
            name: 'variant',
            type: 'select',
            options: ['primary', 'secondary', 'muted', 'ghost', 'subtle', 'danger', 'warning'],
        },
        { name: 'size', type: 'select', options: ['sm', 'md', 'lg'] },
        { name: 'disabled', type: 'boolean' },
        { name: 'loading', type: 'boolean' },
        { name: 'fullWidth', type: 'boolean' },
        { name: 'iconOnly', type: 'boolean' },
        { name: 'children', type: 'text', placeholder: 'Continue' },
    ],
    defaultProps: defaults,
    render: (props) => (
        <Button
            variant={props.variant as 'primary'}
            size={props.size as 'md'}
            disabled={props.disabled === true}
            loading={props.loading === true}
            fullWidth={props.fullWidth === true}
            iconOnly={props.iconOnly === true}
            aria-label={props.iconOnly === true ? 'Continue' : undefined}
        >
            {String(props.children ?? 'Continue')}
        </Button>
    ),
    generateCode: codeFor,
}
