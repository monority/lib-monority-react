import { DocPage, type DocPageData } from '../DocPage'
import { Toast } from '@monority/ui'
import { ToastBasicExample } from './Toast.examples'

const docData: DocPageData = {
  title: 'Toast',
  description: "A notification that appears temporarily to inform users of important events.",
  importCode: "import { useToast } from '@monority/ui'",
  usageCode: `import { useToast, Button } from '@monority/ui'

function MyComponent() {
    const { pushToast } = useToast()

    return (
        <Button onClick={() => pushToast({
            title: 'Success',
            description: 'Action completed',
        })}>
            Show Toast
        </Button>
    )
}`,
  preview: () => <ToastBasicExample />,
  props: [
    { name: 'title', type: `string`, defaultValue: "-", description: "Toast title" },
    { name: 'description', type: `string`, defaultValue: "-", description: "Toast description" },
    { name: 'tone', type: `'neutral' | 'success' | 'danger'`, defaultValue: "'neutral'", description: "Visual tone of the toast" }
  ],
}

export function ToastDocs() {
  return <DocPage doc={docData} />
}
