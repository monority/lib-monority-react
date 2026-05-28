import { DocPage, type DocPageData } from '../DocPage'
import {
  AvatarBasicExample,
  AvatarSizesExample,
  AvatarWithImageExample,
  AvatarGroupExample,
} from './Avatar.examples'

const docData: DocPageData = {
  title: 'Avatar',
  description: "A visual representation of a user or entity, typically using an image or initials.",
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
    { name: 'size', type: `'sm' | 'md' | 'lg'`, defaultValue: "'md'", description: "Size of the avatar" },
    { name: 'src', type: `string`, defaultValue: "-", description: "Image source URL" },
    { name: 'alt', type: `string`, defaultValue: "-", description: "Alt text for image" },
    { name: 'children', type: `ReactNode`, defaultValue: "-", description: "Initials or fallback content" }
  ],
  cssHooks: [
    '.mr-avatar', '.mr-avatar--sm', '.mr-avatar--md', '.mr-avatar--lg',
    '[data-size]', '[data-status]',
  ],
  tokens: [
    '--mr-radius-full', '--mr-bg-surface-strong', '--mr-fg-base',
    '--mr-text-xs', '--mr-avatar-size',
  ],
  a11y: [
    'img role="presentation" for decorative avatars.',
    'aria-label for user avatars.',
    'Status indicator with aria-label.',
  ],
}

export function AvatarDocs() {
  return <DocPage doc={docData} />
}
