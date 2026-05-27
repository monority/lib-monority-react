import { DocPage, type DocPageData } from '../DocPage'
import { AsyncStateNotice } from '@monority/ui'
import { AsyncStateNoticeBasicExample } from './AsyncStateNotice.examples'

const docData: DocPageData = {
  title: 'AsyncStateNotice',
  description: "Displays loading or error state notices for async operations.",
  importCode: "import { AsyncStateNotice } from '@monority/ui'",
  usageCode: `<AsyncStateNotice isLoading={loading} isError={error} />`,
  preview: () => <AsyncStateNoticeBasicExample />,
  props: [
    { name: 'isLoading', type: `boolean`, defaultValue: "-", description: "Show loading state." },
    { name: 'isError', type: `boolean`, defaultValue: "-", description: "Show error state." },
    { name: 'loadingMessage', type: `string`, defaultValue: "-", description: "Loading message text." },
    { name: 'errorMessage', type: `string`, defaultValue: "-", description: "Error message text." },
    { name: 'loadingContent', type: `ReactNode`, defaultValue: "-", description: "Custom loading content." }
  ],
}

export function AsyncStateNoticeDocs() {
  return <DocPage doc={docData} />
}
