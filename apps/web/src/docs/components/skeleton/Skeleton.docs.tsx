import { DocPage, type DocPageData } from '../DocPage'
import {
  SkeletonBasicExample,
  SkeletonCardExample,
  SkeletonListExample,
  SkeletonCircleExample,
} from './Skeleton.examples'

const docData: DocPageData = {
  title: 'Skeleton',
  description:
    'Shimmer placeholder for content that is still loading, useful for cards, lists, and profile rows.',
  importCode: "import { Skeleton } from '@monority/ui'",
  usageCode: `<Skeleton style={{ width: '14rem', height: '1rem' }} />`,
  preview: () => <SkeletonBasicExample />,
  examples: [
    { title: 'Card layout', content: <SkeletonCardExample /> },
    { title: 'List items', content: <SkeletonListExample /> },
    { title: 'Circle avatar', content: <SkeletonCircleExample /> },
  ],
  cssHooks: ['.mr-skeleton', '.mr-skeleton--rounded', '[data-size]'],
  tokens: ['--mr-bg-surface-strong', '--mr-bg-control', '--mr-radius-sm'],
  a11y: [
    'Skeleton blocks are aria-hidden because they are decorative placeholders.',
    'Use aria-busy on the parent region while real content is loading.',
  ],
}

export function SkeletonDocs() {
  return <DocPage doc={docData} />
}
