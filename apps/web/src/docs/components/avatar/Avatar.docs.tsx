import { DocPage, type DocPageData } from '../DocPage'
import {
    AvatarBasicExample,
    AvatarSizesExample,
    AvatarWithImageExample,
    AvatarGroupExample,
} from './Avatar.examples'

const docData: DocPageData = {
    title: 'Avatar',
    description: 'User or entity identity marker with image and initials fallback.',
    importCode: "import { Avatar } from '@monority/ui/avatar'",
    usageCode: `<Avatar size="sm" name="Alice B" />
<Avatar size="md" name="Alice B" />
<Avatar size="lg" name="Alice B" />`,
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
        { name: 'src', type: `string`, defaultValue: '-', description: 'Image source URL. Falls back to children/initials when absent or on load error.' },
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
            description: 'Person name. Provides the accessible name (unless alt is set) and the initials fallback.',
        },
        {
            name: 'children',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Explicit fallback content rendered instead of the derived initials.',
        },
    ],
    cssHooks: [
        '.mr-avatar',
        '.mr-avatar--sm',
        '.mr-avatar--md',
        '.mr-avatar--lg',
        '[data-size]',
        '[data-status]',
    ],
    tokens: [
        '--mr-radius-full',
        '--mr-bg-accent-soft',
        '--mr-border-subtle',
        '--mr-fg-strong',
        '--mr-text-xs',
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
