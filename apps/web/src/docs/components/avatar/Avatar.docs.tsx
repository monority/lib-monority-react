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
    importCode: "import { Avatar } from '@monority/ui'",
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
        { name: 'src', type: `string`, defaultValue: '-', description: 'Image source URL.' },
        {
            name: 'alt',
            type: `string`,
            defaultValue: '-',
            description: 'Accessible name for image avatars.',
        },
        {
            name: 'children',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Initials or fallback content.',
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
        'Use empty alt text for decorative avatars.',
        'Keep initials readable and short.',
    ],
}

export function AvatarDocs() {
    return <DocPage doc={docData} />
}
