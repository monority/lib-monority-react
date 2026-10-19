import { Avatar } from '@monority/ui/avatar'
import { useState } from 'react'
import { ComponentPlayground } from '../../components/ComponentPlayground/ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { AvatarGroupExample, AvatarSizesExample, AvatarWithImageExample } from './Avatar.examples'

function AvatarPlayground() {
    const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md')
    const [status, setStatus] = useState<'none' | 'online' | 'offline'>('online')
    const [initials, setInitials] = useState('MC')
    const [showImage, setShowImage] = useState(false)

    const placeholderAvatar =
        'data:image/svg+xml;utf8,' +
        encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" fill="#7c6cf4"/><circle cx="32" cy="24" r="12" fill="#fff"/><path d="M10 64c2-14 12-20 22-20s20 6 22 20z" fill="#fff"/></svg>'
        )

    const snippet = `<Avatar size="${size}">
${showImage ? `  <Avatar.Image src="..." alt="Utilisateur" />\n` : ''}  <Avatar.Fallback>${initials}</Avatar.Fallback>${status !== 'none' ? `\n  <Avatar.Status status="${status}" />` : ''}
</Avatar>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    label: 'Size',
                    value: size,
                    options: [
                        { value: 'sm', label: 'Small (sm)' },
                        { value: 'md', label: 'Medium (md)' },
                        { value: 'lg', label: 'Large (lg)' },
                    ],
                    onChange: (v) => setSize(v as 'sm' | 'md' | 'lg'),
                },
                {
                    type: 'select',
                    label: 'Statut',
                    value: status,
                    options: [
                        { value: 'none', label: 'Aucun' },
                        { value: 'online', label: 'En ligne (online)' },
                        { value: 'offline', label: 'Hors ligne (offline)' },
                    ],
                    onChange: (v) => setStatus(v as 'none' | 'online' | 'offline'),
                },
                {
                    type: 'text',
                    label: 'Initiales',
                    value: initials,
                    onChange: setInitials,
                },
                {
                    type: 'boolean',
                    label: 'Avec image',
                    value: showImage,
                    onChange: setShowImage,
                },
            ]}
            codeSnippet={snippet}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 96,
                }}
            >
                <Avatar size={size}>
                    {showImage && <Avatar.Image src={placeholderAvatar} alt="Utilisateur" />}
                    <Avatar.Fallback>{initials}</Avatar.Fallback>
                    {status !== 'none' && <Avatar.Status status={status} />}
                </Avatar>
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'Avatar',
    description:
        'User or entity identity marker with image, initials fallback, and status indicator.',
    importCode: "import { Avatar } from '@monority/ui/avatar'",
    usageCode: `<Avatar size="md">
  <Avatar.Image src="/avatars/user.jpg" alt="Alice B" />
  <Avatar.Fallback>AB</Avatar.Fallback>
  <Avatar.Status status="online" />
</Avatar>`,
    preview: () => <AvatarPlayground />,
    examples: [
        { title: 'Sizes', content: <AvatarSizesExample /> },
        { title: 'With image', content: <AvatarWithImageExample /> },
        { title: 'Group', content: <AvatarGroupExample /> },
    ],
    props: [
        {
            name: 'size',
            type: `'sm' | 'md' | 'lg'`,
            defaultValue: "'md'",
            description: 'Rendered size.',
        },
        {
            name: 'src',
            type: `string`,
            defaultValue: '-',
            description:
                'Image source URL (shorthand mode). Falls back to children/initials when absent or on load error.',
        },
        {
            name: 'alt',
            type: `string`,
            defaultValue: '-',
            description: 'Image alt text; used as the accessible name when provided.',
        },
        {
            name: 'name',
            type: `string`,
            defaultValue: '-',
            description:
                'Person name (shorthand mode). Provides the accessible name (unless alt is set) and the initials fallback.',
        },
        {
            name: 'status',
            type: `'online' | 'offline'`,
            defaultValue: '-',
            description: 'Status indicator dot.',
        },
        {
            name: 'children',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Explicit fallback content or compound subcomponents.',
        },
    ],
    cssHooks: [
        '.mr-avatar',
        '.mr-avatar__img',
        '.mr-avatar__initials',
        '.mr-avatar__status',
        '[data-size]',
        '[data-status]',
    ],
    tokens: [
        '--mr-radius-full',
        '--mr-accent-subtle',
        '--mr-border-subtle',
        '--mr-text-primary',
        '--mr-font-size-xs',
    ],
    a11y: [
        'Provide alt text or aria-label when the avatar identifies a person.',
        'name provides the accessible name when alt is absent.',
        'Avatars without name, alt, or aria-label stay decorative (no role).',
        'The fallback (initials or children) is hidden from the accessibility tree.',
    ],
}

export function AvatarDocs() {
    return <DocPage doc={docData} />
}
