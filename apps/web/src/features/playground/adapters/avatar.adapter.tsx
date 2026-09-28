import { Avatar } from '@monority/ui/avatar'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const defaults: PlaygroundProps = {
    name: 'Maya Chen',
    alt: '',
    src: '',
    children: '',
    size: 'md',
}

function codeFor(props: PlaygroundProps): string {
    const lines: string[] = []
    if (props.src) lines.push(`  src="${String(props.src)}"`)
    if (props.alt) lines.push(`  alt="${String(props.alt)}"`)
    if (props.name) lines.push(`  name="${String(props.name)}"`)
    if (props.size !== 'md') lines.push(`  size="${String(props.size)}"`)
    if (props.children) {
        if (lines.length === 0) return `<Avatar>${String(props.children)}</Avatar>`
        return `<Avatar\n${lines.join('\n')}\n>\n  ${String(props.children)}\n</Avatar>`
    }
    if (lines.length === 0) return '<Avatar />'
    return `<Avatar\n${lines.join('\n')}\n/>`
}

function AvatarPreview(props: PlaygroundProps) {
    return (
        <Avatar
            name={String(props.name ?? '') || undefined}
            alt={String(props.alt ?? '')}
            src={String(props.src ?? '') || undefined}
            size={props.size as 'md'}
        >
            {String(props.children ?? '') || undefined}
        </Avatar>
    )
}

export const avatarPlayground: PlaygroundDefinition = {
    slug: 'avatar',
    label: 'Avatar',
    docsPath: '/docs/avatar',
    importStatement: "import { Avatar } from '@monority/ui/avatar'",
    controls: [
        { name: 'name', type: 'text', placeholder: 'Maya Chen' },
        { name: 'alt', type: 'text', placeholder: 'Maya Chen' },
        { name: 'src', type: 'text', placeholder: 'Paste an image URL or data URI' },
        { name: 'children', type: 'text', placeholder: 'Explicit fallback (e.g. MC)' },
        { name: 'size', type: 'select', options: ['sm', 'md', 'lg'] },
    ],
    defaultProps: defaults,
    render: (props) => <AvatarPreview {...props} />,
    generateCode: codeFor,
}
