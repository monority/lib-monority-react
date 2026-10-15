import { DocPage, type DocPageData } from '../DocPage'
import { DrawerBasicExample, DrawerSidesExample, DrawerWithFooterExample } from './Drawer.examples'

const docData: DocPageData = {
    title: 'Drawer',
    description:
        'Slide-in side panel for adjacent detail, editing, and page-level inspection without a full context switch.',
    importCode: "import { Drawer } from '@monority/ui'",
    usageCode: `const [open, setOpen] = useState(false)

return (
  <>
    <Button onClick={() => setOpen(true)}>Open details panel</Button>
    <Drawer open={open} title="Deployment details" onClose={() => setOpen(false)}>
      <p>Use a drawer when the user should stay anchored to the current page while inspecting or editing adjacent information.</p>
    </Drawer>
  </>
)`,
    preview: () => <DrawerBasicExample />,
    examples: [
        { title: 'Different sides', content: <DrawerSidesExample /> },
        { title: 'With footer', content: <DrawerWithFooterExample /> },
    ],
    props: [
        { name: 'open', type: `boolean`, defaultValue: '-', description: 'Controls open state.' },
        { name: 'title', type: `string`, defaultValue: '-', description: 'Drawer title.' },
        { name: 'children', type: `ReactNode`, defaultValue: '-', description: 'Drawer content.' },
        {
            name: 'side',
            type: `'left' | 'right' | 'top' | 'bottom'`,
            defaultValue: "'right'",
            description: 'Slide-in direction.',
        },
        { name: 'onClose', type: `() => void`, defaultValue: '-', description: 'Close callback.' },
    ],
    cssHooks: [
        '.mr-drawer',
        '.mr-drawer__backdrop',
        '.mr-drawer__backdrop-surface',
        '.mr-drawer__panel',
        '.mr-drawer__header',
        '.mr-drawer__heading',
        '.mr-drawer__title',
        '.mr-drawer__close',
        '.mr-drawer__body',
        '[data-open]',
        '[data-side]',
    ],
    tokens: [
        '--mr-bg-raised',
        '--mr-border-subtle',
        '--mr-shadow-md',
        '--mr-radius-md',
        '--mr-z-overlay',
    ],
    a11y: [
        'The panel follows the dialog ARIA pattern with aria-modal="true".',
        'Focus is trapped while the drawer is open.',
        'The title is exposed with aria-labelledby.',
        'Escape and the close button both dismiss the panel.',
    ],
}

export function DrawerDocs() {
    return <DocPage doc={docData} />
}
