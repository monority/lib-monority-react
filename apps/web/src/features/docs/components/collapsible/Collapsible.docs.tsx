import { DocPage, type DocPageData } from '../DocPage'
import { ComponentPlayground } from '../ComponentPlayground'
import { Collapsible } from '@monority/ui/collapsible'
import { Text } from '@monority/ui/text'
import {
    CollapsibleBasicExample,
    CollapsibleDefaultOpenExample,
    CollapsibleControlledExample,
    CollapsibleSizesExample,
} from './Collapsible.examples'

function CollapsiblePlayground() {
    return (
        <ComponentPlayground
            title="Collapsible"
            description="Contrôlez l'état ouvert/fermé, la taille et le mode désactivé du panneau dépliable."
            controls={[
                {
                    type: 'select',
                    prop: 'size',
                    label: 'Taille (size)',
                    defaultValue: 'md',
                    options: [
                        { value: 'sm', label: 'Petite (sm)' },
                        { value: 'md', label: 'Moyenne (md)' },
                        { value: 'lg', label: 'Grande (lg)' },
                    ],
                },
                {
                    type: 'boolean',
                    prop: 'defaultOpen',
                    label: 'Ouvert par défaut (defaultOpen)',
                    defaultValue: true,
                },
                {
                    type: 'boolean',
                    prop: 'disabled',
                    label: 'Désactivé (disabled)',
                    defaultValue: false,
                },
            ]}
            renderCode={(props) => `<Collapsible
  size="${props.size}"${props.defaultOpen ? '\n  defaultOpen' : ''}${props.disabled ? '\n  disabled' : ''}
>
  <Collapsible.Trigger>Détails de configuration</Collapsible.Trigger>
  <Collapsible.Content>
    <Text size="sm" color="secondary">
      Ce panneau animé affiche des informations contextuelles avec une transition fluide en CSS Grid.
    </Text>
  </Collapsible.Content>
</Collapsible>`}
        >
            {(props) => (
                <div style={{ width: '100%', maxWidth: 480 }}>
                    <Collapsible
                        size={props.size as 'sm' | 'md' | 'lg'}
                        defaultOpen={props.defaultOpen as boolean}
                        disabled={props.disabled as boolean}
                    >
                        <Collapsible.Trigger>Détails de configuration</Collapsible.Trigger>
                        <Collapsible.Content>
                            <Text size="sm" color="secondary">
                                Ce panneau animé affiche des informations contextuelles avec une
                                transition fluide en CSS Grid sans résidu de hauteur.
                            </Text>
                        </Collapsible.Content>
                    </Collapsible>
                </div>
            )}
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'Collapsible',
    description:
        'Expandable panel for secondary details, migration notes, and inline product guidance.',
    importCode: "import { Collapsible } from '@monority/ui/collapsible'",
    usageCode: `<Collapsible defaultOpen>
  <Collapsible.Trigger>Release notes summary</Collapsible.Trigger>
  <Collapsible.Content>
    <Text>This panel can reveal supporting context without taking over the page.</Text>
  </Collapsible.Content>
</Collapsible>`,
    preview: () => <CollapsiblePlayground />,
    examples: [
        { title: 'Default open', content: <CollapsibleDefaultOpenExample /> },
        { title: 'Controlled', content: <CollapsibleControlledExample /> },
        { title: 'Sizes', content: <CollapsibleSizesExample /> },
    ],
    props: [
        {
            name: 'title',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Trigger button content (shorthand mode).',
        },
        {
            name: 'children',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Collapsible panel content or compound subcomponents.',
        },
        {
            name: 'defaultOpen',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Default expanded state.',
        },
        {
            name: 'open',
            type: 'boolean',
            defaultValue: '-',
            description: 'Controlled expanded state.',
        },
        {
            name: 'onOpenChange',
            type: '(open: boolean) => void',
            defaultValue: '-',
            description: 'Open state change callback.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Component size.',
        },
    ],
    keyboardNavigation: [
        {
            key: 'Tab / Shift + Tab',
            description: 'Déplace le focus vers le bouton de déclenchement du panneau.',
        },
        {
            key: 'Enter / Espace',
            description: "Bascule le panneau entre l'état replié et développé.",
        },
    ],
    cssHooks: [
        '.mr-collapsible',
        '.mr-collapsible__trigger',
        '.mr-collapsible__label',
        '.mr-collapsible__icon',
        '.mr-collapsible__panel',
        '.mr-collapsible__body',
        '.mr-collapsible__content',
        '[data-open]',
        '[data-state]',
    ],
    tokens: [
        '--mr-bg-raised',
        '--mr-bg-surface-strong',
        '--mr-border-subtle',
        '--mr-border-strong',
        '--mr-radius-md',
        '--mr-shadow-xs',
    ],
    a11y: [
        'The trigger button exposes aria-expanded and aria-controls.',
        'The panel uses role="region", aria-hidden, and is labelled by the trigger.',
        'Keyboard access works with Enter and Space through the native button.',
        'Fluid expansion is animated using CSS Grid (grid-template-rows: 0fr -> 1fr) with zero residual height when closed.',
    ],
}

export function CollapsibleDocs() {
    return <DocPage doc={docData} />
}
