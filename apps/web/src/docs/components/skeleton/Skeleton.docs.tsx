import { DocPage, type DocPageData } from '../DocPage'
import { Skeleton } from '@monority/ui'
import { SkeletonBasicExample } from './Skeleton.examples'

const docData: DocPageData = {
  title: 'Skeleton',
  description: "Placeholder loading skeleton that extends HTML div attributes.",
  importCode: "import { Skeleton } from '@monority/ui'",
  usageCode: `<Skeleton style={{ width: 200, height: 20 }} />`,
  preview: () => <SkeletonBasicExample />,
}

export function SkeletonDocs() {
  return <DocPage doc={docData} />
}
