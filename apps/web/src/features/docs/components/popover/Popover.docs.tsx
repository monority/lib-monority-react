import { useState } from 'react'
import { Button } from '@monority/ui/button'
import { Popover } from '@monority/ui/popover'
import { Stack } from '@monority/ui/stack'
import { Text } from '@monority/ui/text'
import { ComponentPlayground } from '../../components/ComponentPlayground/ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    PopoverAlignmentExample,
    PopoverBasicExample,
    PopoverWithFormExample,
} from './Popover.examples'

function PopoverPlayground() {
    const [side, setSide] = useState<'top' | 'bottom' | 'left' | 'right'>('bottom')
    const [align, setAlign] = useState<'start' | 'center' | 'end'>('start')

    const snippet = `<Popover side="${side}" align="${align}">
  <Popover.Trigger>
    <Button variant="secondary">Paramètres rapides</Button>
  </Popover.Trigger>
  <Popover.Content>
    <Stack gap="sm">
      <Text.Strong size="sm">Configuration du projet</Text.Strong>
      <Text tone="muted" size="sm">
        Ajustez la visibilité et les permissions de l’espace de travail en temps réel.
      </Text>
      <Button size="sm" variant="primary">Sauvegarder</Button>
    </Stack>
  </Popover.Content>
</Popover>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    label: 'Côté (side)',
                    value: side,
                    options: [
                        { value: 'bottom', label: 'Bas (bottom)' },
                        { value: 'top', label: 'Haut (top)' },
                        { value: 'left', label: 'Gauche (left)' },
                        { value: 'right', label: 'Droite (right)' },
                    ],
                    onChange: (v) => setSide(v as 'top' | 'bottom' | 'left' | 'right'),
                },
                {
                    type: 'select',
                    label: 'Alignement (align)',
                    value: align,
                    options: [
                        { value: 'start', label: 'Début (start)' },
                        { value: 'center', label: 'Centre (center)' },
                        { value: 'end', label: 'Fin (end)' },
                    ],
                    onChange: (v) => setAlign(v as 'start' | 'center' | 'end'),
                },
            ]}
            codeSnippet={snippet}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 200,
                }}
            >
                <Popover side={side} align={align}>
                    <Popover.Trigger>
                        <Button variant="secondary">Paramètres rapides</Button>
                    </Popover.Trigger>
                    <Popover.Content>
                        <Stack gap="sm" style={{ maxWidth: 260 }}>
                            <Text.Strong size="sm">Configuration du projet</Text.Strong>
                            <Text tone="muted" size="sm">
                                Ajustez la visibilité et les permissions de l’espace de travail en
                                temps réel.
                            </Text>
                            <Button size="sm" variant="primary">
                                Sauvegarder
                            </Button>
                        </Stack>
                    </Popover.Content>
                </Popover>
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'Popover',
    description:
        'A contextual floating panel for compact detail, quick edits, and supplementary actions.',
    importCode: "import { Popover } from '@monority/ui/popover'",
    usageCode: `<Popover>
  <Popover.Trigger>
    <Button>Inspect token</Button>
  </Popover.Trigger>
  <Popover.Content>
    <Stack gap="xs">
      <Text.Strong size="sm">Surface token</Text.Strong>
      <Text tone="muted" size="sm">Use elevated surfaces for contextual panels.</Text>
    </Stack>
  </Popover.Content>
</Popover>`,
    preview: () => <PopoverPlayground />,
    examples: [
        { title: 'With form', content: <PopoverWithFormExample /> },
        { title: 'Alignment', content: <PopoverAlignmentExample /> },
    ],
    props: [
        {
            name: 'trigger',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Element that opens the popover (shorthand mode).',
        },
        {
            name: 'children',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Popover content or compound subcomponents.',
        },
        { name: 'open', type: `boolean`, defaultValue: '-', description: 'Controlled open state.' },
        {
            name: 'defaultOpen',
            type: `boolean`,
            defaultValue: '-',
            description: 'Default open state.',
        },
        {
            name: 'onOpenChange',
            type: `(open: boolean) => void`,
            defaultValue: '-',
            description: 'Open state change callback.',
        },
        {
            name: 'align',
            type: `'start' | 'center' | 'end'`,
            defaultValue: '-',
            description: 'Alignment relative to trigger.',
        },
        {
            name: 'side',
            type: `'top' | 'bottom' | 'left' | 'right'`,
            defaultValue: '-',
            description: 'Side to render the popover.',
        },
    ],
    cssHooks: [
        '.mr-popover',
        '.mr-popover__trigger',
        '.mr-popover__anchor',
        '.mr-popover__content',
        '[data-open]',
        '[data-align]',
        '[data-side]',
    ],
    tokens: [
        '--mr-bg-raised',
        '--mr-shadow-md',
        '--mr-radius-md',
        '--mr-font-size-sm',
        '--mr-space-*',
        '--mr-border-subtle',
    ],
    keyboardNavigation: [
        { key: 'Enter', action: 'Ouvre le popover' },
        { key: 'Space', action: 'Ouvre le popover' },
        { key: 'Tab', action: 'Déplace le focus dans les éléments interactifs du popover' },
        { key: 'Escape', action: 'Ferme le popover et replace le focus sur le déclencheur' },
    ],
    a11y: [
        'Content uses role="dialog" with aria-modal="false".',
        'Trigger exposes aria-expanded and aria-controls.',
        'Escape key to close.',
        'Focus moves into the panel when opened.',
        'Clicking outside closes the popover.',
    ],
}

export function PopoverDocs() {
    return <DocPage doc={docData} />
}
