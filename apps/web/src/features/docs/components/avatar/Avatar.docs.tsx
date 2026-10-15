import { DocPage, type DocPageData } from '../DocPage'
import {
    AvatarBasicExample,
    AvatarSizesExample,
    AvatarWithImageExample,
    AvatarGroupExample,
} from './Avatar.examples'

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
    preview: () => <AvatarBasicExample />,
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
