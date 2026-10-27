import { Button } from '@monority/ui/button'
import { Sheet } from '@monority/ui/sheet'
import { Stack } from '@monority/ui/stack'
import { Text } from '@monority/ui/text'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { sheetI18n } from './Sheet.messages'
import { SheetCompoundExample, SheetSidesExample } from './Sheet.examples'

function SheetPlayground() {
    const [open, setOpen] = useState(false)
    const [side, setSide] = useState<'right' | 'left' | 'top' | 'bottom'>('right')
    const [title, setTitle] = useState('User profile editing')

    const snippet = `const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Open sheet (${side})</Button>

<Sheet
  open={open}
  title="${title}"
  side="${side}"
  description="Edit your preferences and save."
  onClose={() => setOpen(false)}
  footer={
    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="primary" onClick={() => setOpen(false)}>Save</Button>
    </div>
  }
>
  <p>Main content of the sheet...</p>
</Sheet>`

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
                    onChange: (v) => setSide(v as 'right' | 'left' | 'top' | 'bottom'),
                },
                {
                    type: 'text',
                    label: 'Sheet title',
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
                    Open sheet ({side})
                </Button>
                <Sheet
                    open={open}
                    title={title}
                    side={side}
                    description="Edit your preferences and save."
                    onClose={() => setOpen(false)}
                    footer={
                        <div
                            style={{
                                display: 'flex',
                                gap: 8,
                                justifyContent: 'flex-end',
                                width: '100%',
                            }}
                        >
                            <Button variant="ghost" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={() => setOpen(false)}>
                                Save
                            </Button>
                        </div>
                    }
                >
                    <Stack gap="md">
                        <Text tone="muted">
                            The Sheet component supports deep secondary flows without losing the
                            host page context.
                        </Text>
                    </Stack>
                </Sheet>
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'Sheet',
    description:
        'Slide-in panel anchorable on all 4 screen edges for dense secondary flows, editing forms, or inspection panels.',
    importCode: "import { Sheet } from '@monority/ui/sheet'",
    usageCode: `const [open, setOpen] = useState(false)

return (
  <>
    <Button onClick={() => setOpen(true)}>Ouvrir le volet d'edition</Button>
    <Sheet
      open={open}
      title="Edition du profil"
      description="Modifiez vos informations d'utilisateur puis enregistrez."
      onClose={() => setOpen(false)}
      footer={
        <>
          <Button variant="ghost" onClick={() => setOpen(false)}>Annuler</Button>
          <Button variant="primary" onClick={() => setOpen(false)}>Enregistrer</Button>
        </>
      }
    >
      <Stack gap="md">
        <label>
          <span>Nom complet</span>
          <Input defaultValue="Alexandre Martin" />
        </label>
        <label>
          <span>Adresse courriel</span>
          <Input defaultValue="alexandre@monority.dev" type="email" />
        </label>
      </Stack>
    </Sheet>
  </>
)`,
    preview: () => <SheetPlayground />,
    examples: [
        { title: 'Anchorable on all 4 sides (Sides)', content: <SheetSidesExample /> },
        { title: 'Composition with subcomponents', content: <SheetCompoundExample /> },
    ],
    props: [
        {
            name: 'open',
            type: 'boolean',
            defaultValue: '-',
            description: 'Sheet open state.',
        },
        {
            name: 'title',
            type: 'string',
            defaultValue: '-',
            description: 'Accessible sheet title.',
        },
        {
            name: 'description',
            type: 'string',
            defaultValue: '-',
            description: 'Explaining subtitle.',
        },
        {
            name: 'side',
            type: "'right' | 'left' | 'top' | 'bottom'",
            defaultValue: "'right'",
            description: 'Screen edge the sheet slides from.',
        },
        {
            name: 'footer',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Footer actions.',
        },
        {
            name: 'onClose',
            type: '() => void',
            defaultValue: '-',
            description: 'Close callback.',
        },
    ],
    cssHooks: [
        '.mr-sheet',
        '.mr-sheet__backdrop',
        '.mr-sheet__backdrop-surface',
        '.mr-sheet__panel',
        '.mr-sheet__header',
        '.mr-sheet__heading',
        '.mr-sheet__title',
        '.mr-sheet__description',
        '.mr-sheet__body',
        '.mr-sheet__footer',
        '.mr-sheet__close',
        '[data-open]',
        '[data-side]',
        '[data-closing]',
    ],
    tokens: [
        '--mr-bg-overlay',
        '--mr-shadow-overlay',
        '--mr-border-default',
        '--mr-border-subtle',
        '--mr-duration-panel',
        '--mr-space-6',
    ],
    keyboardNavigation: [
        { key: 'Tab', action: 'Cycles focus through the focusable elements of the sheet (focus trap)' },
        { key: 'Escape', action: 'Closes the sheet and returns focus to the open button' },
    ],
    a11y: [
        'Follows the WAI-ARIA Dialog pattern with role="dialog" and aria-modal="true".',
        'Focus trap active for the entire open duration.',
        'Escape and backdrop click both trigger the animated close.',
        'Title automatically linked by aria-labelledby and description by aria-describedby.',
    ],
    i18n: sheetI18n,
}

export function SheetDocs() {
    return <DocPage doc={docData} />
}
