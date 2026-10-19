import { Button } from '@monority/ui/button'
import { Drawer } from '@monority/ui/drawer'
import { Stack } from '@monority/ui/stack'
import { Text } from '@monority/ui/text'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { DrawerSidesExample, DrawerWithFooterExample } from './Drawer.examples'

function DrawerPlayground() {
    const [open, setOpen] = useState(false)
    const [side, setSide] = useState<'left' | 'right' | 'top' | 'bottom'>('right')
    const [title, setTitle] = useState('Détails du déploiement')

    const snippet = `const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Ouvrir le panneau (${side})</Button>

<Drawer
  open={open}
  title="${title}"
  side="${side}"
  onClose={() => setOpen(false)}
>
  <Stack gap="md">
    <Text tone="muted">
      Consultez les détails opérationnels et modifiez les variables d'environnement associées.
    </Text>
    <Button variant="primary" onClick={() => setOpen(false)}>Fermer</Button>
  </Stack>
</Drawer>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    label: 'Côté d’ouverture (side)',
                    value: side,
                    options: [
                        { value: 'right', label: 'Droite (right)' },
                        { value: 'left', label: 'Gauche (left)' },
                        { value: 'top', label: 'Haut (top)' },
                        { value: 'bottom', label: 'Bas (bottom)' },
                    ],
                    onChange: (v) => setSide(v as 'left' | 'right' | 'top' | 'bottom'),
                },
                {
                    type: 'text',
                    label: 'Titre du drawer',
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
                    Ouvrir le panneau ({side})
                </Button>
                <Drawer open={open} title={title} side={side} onClose={() => setOpen(false)}>
                    <Stack gap="md">
                        <Text tone="muted">
                            Consultez les détails opérationnels et modifiez les variables
                            d'environnement associées.
                        </Text>
                        <Button variant="primary" onClick={() => setOpen(false)}>
                            Fermer
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
            action: 'Navigue cycliquement dans les éléments focalisables du tiroir (focus trap)',
        },
        { key: 'Escape', action: 'Ferme le tiroir et replace le focus sur le bouton d’ouverture' },
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
