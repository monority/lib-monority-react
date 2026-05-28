import { DocPage, type DocPageData } from '../DocPage'
import {
  SkeletonBasicExample,
  SkeletonCardExample,
  SkeletonListExample,
  SkeletonCircleExample,
} from './Skeleton.examples'

const docData: DocPageData = {
  title: 'Skeleton',
  description: "Placeholder loading skeleton that extends HTML div attributes.",
  importCode: "import { Skeleton } from '@monority/ui'",
  usageCode: `<Skeleton style={{ width: 200, height: 20 }} />`,
  preview: () => <SkeletonBasicExample />,
  examples: [
    { title: 'Card layout', content: <SkeletonCardExample /> },
    { title: 'List items', content: <SkeletonListExample /> },
    { title: 'Circle avatar', content: <SkeletonCircleExample /> },
  ],
  cssHooks: [
    '.mr-skeleton', '[data-shape]', '[data-size]',
  ],
  tokens: [
    '--mr-bg-surface-strong', '--mr-radius-*',
  ],
  a11y: [
    'aria-hidden="true" (decorative).',
    'aria-busy="true" on parent container.',
  ],
}

export function SkeletonDocs() {
  return <DocPage doc={docData} />
}
