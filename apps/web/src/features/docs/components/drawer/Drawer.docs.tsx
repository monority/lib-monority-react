import { Button } from '@monority/ui/button'
import { Drawer } from '@monority/ui/drawer'
import { Stack } from '@monority/ui/stack'
import { Text } from '@monority/ui/text'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { drawerI18n } from './Drawer.messages'
import { DrawerSidesExample, DrawerWithFooterExample } from './Drawer.examples'

function DrawerPlayground() {
    const [open, setOpen] = useState(false)
    const [side, setSide] = useState<'left' | 'right' | 'top' | 'bottom'>('right')
    const [title, setTitle] = useState('Deployment details')

    const snippet = `const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Open panel (${side})</Button>

<Drawer
  open={open}
  title="${title}"
  side="${side}"
  onClose={() => setOpen(false)}
>
  <Stack gap="md">
    <Text tone="muted">
      Review the operational details and edit the related environment variables.
    </Text>
    <Button variant="primary" onClick={() => setOpen(false)}>Close</Button>
  </Stack>
</Drawer>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    label: 'Side',
                    value: side,
                    options: [
                        { value: 'right', label: 'Right' },
                        { value: 'left', label: 'Left' },
                        { value: 'top', label: 'Top' },
                        { value: 'bottom', label: 'Bottom' },
                    ],
                    onChange: (v) => setSide(v as 'left' | 'right' | 'top' | 'bottom'),
                },
                {
                    type: 'text',
                    label: 'Drawer title',
                    value: title,
                    onChange: setTitle,
                },
            ]}
            codeSnippet={snippet}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 120,
                }}
            >
                <Button variant="primary" onClick={() => setOpen(true)}>
                    Open panel ({side})
                </Button>
                <Drawer open={open} title={title} side={side} onClose={() => setOpen(false)}>
                    <Stack gap="md">
                        <Text tone="muted">
                            Review the operational details and edit the related environment
                            variables.
                        </Text>
                        <Button variant="primary" onClick={() => setOpen(false)}>
                            Close
                        </Button>
                    </Stack>
                </Drawer>
            </div>
        </ComponentPlayground>
    )
}

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
    preview: () => <DrawerPlayground />,
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
    keyboardNavigation: [
        {
            key: 'Tab',
            action: 'Cycles focus through the focusable elements of the drawer (focus trap)',
        },
        { key: 'Escape', action: 'Closes the drawer and returns focus to the open button' },
    ],
    a11y: [
        'The panel follows the dialog ARIA pattern with aria-modal="true".',
        'Focus is trapped while the drawer is open.',
        'The title is exposed with aria-labelledby.',
        'Escape and the close button both dismiss the panel.',
    ],
    i18n: drawerI18n,
}

export function DrawerDocs() {
    return <DocPage doc={docData} />
}
