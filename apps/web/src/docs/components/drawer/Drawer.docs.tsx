import { DocPage, type DocPageData } from '../DocPage'
import { Drawer } from '@monority/ui'
import { DrawerBasicExample } from './Drawer.examples'

const docData: DocPageData = {
  title: 'Drawer',
  description: "Slide-in panel overlay from any side with focus trap and backdrop.",
  importCode: "import { Drawer } from '@monority/ui'",
  usageCode: `<Drawer open={open} title="Details" side="right" onClose={() => setOpen(false)}>
  <p>Drawer content</p>
</Drawer>`,
  preview: () => <DrawerBasicExample />,
  props: [
    { name: 'open', type: `boolean`, defaultValue: "-", description: "Controls open state." },
    { name: 'title', type: `string`, defaultValue: "-", description: "Drawer title." },
    { name: 'children', type: `ReactNode`, defaultValue: "-", description: "Drawer content." },
    { name: 'side', type: `'left' | 'right' | 'top' | 'bottom'`, defaultValue: "'right'", description: "Slide-in direction." },
    { name: 'onClose', type: `() => void`, defaultValue: "-", description: "Close callback." }
  ],
}

export function DrawerDocs() {
  return <DocPage doc={docData} />
}
