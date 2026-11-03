import { Button } from '@monority/ui/button'
import { Popover } from '@monority/ui/popover'
import { Stack } from '@monority/ui/stack'
import { Text } from '@monority/ui/text'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { popoverI18n } from './Popover.messages'
import { PopoverAlignmentExample, PopoverWithFormExample } from './Popover.examples'

function PopoverPlayground() {
    const [side, setSide] = useState<'top' | 'bottom' | 'left' | 'right'>('bottom')
    const [align, setAlign] = useState<'start' | 'center' | 'end'>('start')

    const snippet = `<Popover side="${side}" align="${align}">
  <Popover.Trigger>
    <Button variant="secondary">Quick settings</Button>
  </Popover.Trigger>
  <Popover.Content>
    <Stack gap="sm">
      <Text.Strong size="sm">Project configuration</Text.Strong>
      <Text tone="muted" size="sm">
        Adjust workspace visibility and permissions in real time.
      </Text>
      <Button size="sm" variant="primary">Save</Button>
    </Stack>
  </Popover.Content>
</Popover>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    label: 'Side',
                    value: side,
                    options: [
                        { value: 'bottom', label: 'Bottom' },
                        { value: 'top', label: 'Top' },
                        { value: 'left', label: 'Left' },
                        { value: 'right', label: 'Right' },
                    ],
                    onChange: (v) => setSide(v as 'top' | 'bottom' | 'left' | 'right'),
                },
                {
                    type: 'select',
                    label: 'Align',
                    value: align,
                    options: [
                        { value: 'start', label: 'Start' },
                        { value: 'center', label: 'Center' },
                        { value: 'end', label: 'End' },
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
                        <Button variant="secondary">Quick settings</Button>
                    </Popover.Trigger>
                    <Popover.Content>
                        <Stack gap="sm" style={{ maxWidth: 260 }}>
                            <Text.Strong size="sm">Project configuration</Text.Strong>
                            <Text tone="muted" size="sm">
                                Adjust workspace visibility and permissions in real time.
                            </Text>
                            <Button size="sm" variant="primary">
                                Save
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
        { key: 'Enter', action: 'Opens the popover' },
        { key: 'Space', action: 'Opens the popover' },
        { key: 'Tab', action: 'Moves focus through the interactive elements of the popover' },
        { key: 'Escape', action: 'Closes the popover and returns focus to the trigger' },
    ],
    a11y: [
        'Content uses role="dialog" with aria-modal="false".',
        'Trigger exposes aria-expanded and aria-controls.',
        'Escape key to close.',
        'Focus moves into the panel when opened.',
        'Clicking outside closes the popover.',
    ],
    i18n: popoverI18n,
}

export function PopoverDocs() {
    return <DocPage doc={docData} />
}
