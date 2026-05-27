import { DocPage, type DocPageData } from '../DocPage'
import { Avatar } from '@monority/ui'
import { AvatarBasicExample } from './Avatar.examples'

const docData: DocPageData = {
  title: 'Avatar',
  description: "A visual representation of a user or entity, typically using an image or initials.",
  importCode: "import { Avatar } from '@monority/ui'",
  usageCode: `<Avatar size="sm" name="Alice B" />
<Avatar size="md" name="Alice B" />
<Avatar size="lg" name="Alice B" />`,
  preview: () => <AvatarBasicExample />,
  props: [
    { name: 'size', type: `'sm' | 'md' | 'lg'`, defaultValue: "'md'", description: "Size of the avatar" },
    { name: 'src', type: `string`, defaultValue: "-", description: "Image source URL" },
    { name: 'alt', type: `string`, defaultValue: "-", description: "Alt text for image" },
    { name: 'children', type: `ReactNode`, defaultValue: "-", description: "Initials or fallback content" }
  ],
}

export function AvatarDocs() {
  return <DocPage doc={docData} />
}
