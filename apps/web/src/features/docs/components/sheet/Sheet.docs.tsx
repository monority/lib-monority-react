import { useState } from 'react'
import { Button } from '@monority/ui/button'
import { Sheet } from '@monority/ui/sheet'
import { Stack } from '@monority/ui/stack'
import { Text } from '@monority/ui/text'
import { ComponentPlayground } from '../../components/ComponentPlayground/ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { SheetBasicExample, SheetCompoundExample, SheetSidesExample } from './Sheet.examples'

function SheetPlayground() {
    const [open, setOpen] = useState(false)
    const [side, setSide] = useState<'right' | 'left' | 'top' | 'bottom'>('right')
    const [title, setTitle] = useState('Édition du profil utilisateur')

    const snippet = `const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Ouvrir le volet (${side})</Button>

<Sheet
  open={open}
  title="${title}"
  side="${side}"
  description="Modifiez vos préférences et enregistrez."
  onClose={() => setOpen(false)}
  footer={
    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
      <Button variant="ghost" onClick={() => setOpen(false)}>Annuler</Button>
      <Button variant="primary" onClick={() => setOpen(false)}>Sauvegarder</Button>
    </div>
  }
>
  <p>Contenu principal du volet...</p>
</Sheet>`

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
                    onChange: (v) => setSide(v as 'right' | 'left' | 'top' | 'bottom'),
                },
                {
                    type: 'text',
                    label: 'Titre du volet',
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
                    Ouvrir le volet ({side})
                </Button>
                <Sheet
                    open={open}
                    title={title}
                    side={side}
                    description="Modifiez vos préférences et enregistrez."
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
                                Annuler
                            </Button>
                            <Button variant="primary" onClick={() => setOpen(false)}>
                                Sauvegarder
                            </Button>
                        </div>
                    }
                >
                    <Stack gap="md">
                        <Text tone="muted">
                            Le volet Sheet permet des flux secondaires approfondis sans perdre le
                            contexte visuel de la page hôte.
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
        "Volet coulissant ancrable sur les 4 cotes de l'ecran pour les flux secondaires denses, formulaires d'edition ou panneaux d'inspection.",
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
        { title: 'Ancrage sur les 4 cotes (Sides)', content: <SheetSidesExample /> },
        { title: 'Composition avec sous-composants', content: <SheetCompoundExample /> },
    ],
    props: [
        {
            name: 'open',
            type: 'boolean',
            defaultValue: '-',
            description: "Etat d'ouverture du volet.",
        },
        {
            name: 'title',
            type: 'string',
            defaultValue: '-',
            description: 'Titre accessible du volet.',
        },
        {
            name: 'description',
            type: 'string',
            defaultValue: '-',
            description: 'Sous-titre explicatif.',
        },
        {
            name: 'side',
            type: "'right' | 'left' | 'top' | 'bottom'",
            defaultValue: "'right'",
            description: "Bord de l'ecran depuis lequel le volet glisse.",
        },
        {
            name: 'footer',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Actions de pied de page.',
        },
        {
            name: 'onClose',
            type: '() => void',
            defaultValue: '-',
            description: 'Fonction de rappel a la fermeture.',
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
        { key: 'Tab', action: 'Navigue cycliquement dans les éléments du volet (focus trap)' },
        { key: 'Escape', action: 'Ferme le volet et replace le focus sur le bouton d’ouverture' },
    ],
    a11y: [
        'Conforme au motif WAI-ARIA Dialog avec role="dialog" et aria-modal="true".',
        "Piege de focus actif pendant toute la duree d'ouverture.",
        "La touche Escape et le clic sur l'arriere-plan declenchent la fermeture avec animation.",
        'Titre lie automatiquement par aria-labelledby et description par aria-describedby.',
    ],
}

export function SheetDocs() {
    return <DocPage doc={docData} />
}
