import { DocPage, type DocPageData } from '../DocPage'
import { SheetBasicExample, SheetCompoundExample, SheetSidesExample } from './Sheet.examples'

const docData: DocPageData = {
    title: 'Sheet',
    description:
        "Volet coulissant ancrable sur les 4 cotes de l'ecran pour les flux secondaires denses, formulaires d'edition ou panneaux d'inspection.",
    importCode: "import { Sheet } from '@monority/ui'",
    usageCode: `<Sheet open={open} title="Edition du profil" side="right" onClose={() => setOpen(false)}>
  <p>Contenu et champs de formulaire...</p>
</Sheet>`,
    preview: () => <SheetBasicExample />,
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
