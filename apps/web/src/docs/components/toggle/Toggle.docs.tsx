import { DocPage, type DocPageData } from '../DocPage'
import {
    ToggleBasicPreview,
    ToggleControlledExample,
    ToggleDisabledExample,
    ToggleSizesExample,
    ToggleVariantsExample,
} from './Toggle.examples'

const docData: DocPageData = {
    title: 'Toggle',
    description: 'Pressed-state button for view options, filters, and compact toolbar controls.',
    importCode: "import { Toggle } from '@monority/ui/toggle'",
    usageCode: '<Toggle>Preview</Toggle>',
    preview: () => <ToggleBasicPreview />,
    examples: [
        { title: 'Basic', content: <ToggleBasicPreview /> },
        { title: 'Variants', content: <ToggleVariantsExample /> },
        { title: 'Sizes', content: <ToggleSizesExample /> },
        { title: 'Controlled', content: <ToggleControlledExample /> },
        { title: 'Disabled', content: <ToggleDisabledExample /> },
    ],
    props: [
        {
            name: 'pressed',
            type: 'boolean',
            defaultValue: '-',
            description: 'Controlled pressed state.',
        },
        {
            name: 'defaultPressed',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Initial pressed state (uncontrolled).',
        },
        {
            name: 'onPressedChange',
            type: '(pressed: boolean) => void',
            defaultValue: '-',
            description: 'Callback when pressed state changes.',
        },
        {
            name: 'variant',
            type: "'default' | 'outline'",
            defaultValue: "'default'",
            description: 'Visual style.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Control density.',
        },
        {
            name: 'disabled',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Disables the toggle.',
        },
    ],
    cssHooks: [
        '.mr-toggle',
        '.mr-toggle--pressed',
        '.mr-toggle--default',
        '.mr-toggle--outline',
        '.mr-toggle--sm',
        '.mr-toggle--md',
        '.mr-toggle--lg',
        '[data-state]',
        '[data-variant]',
        '[data-size]',
    ],
    tokens: [
        '--mr-bg-accent',
        '--mr-fg-accent',
        '--mr-fg-muted',
        '--mr-border-subtle',
        '--mr-border-muted',
        '--mr-border-accent',
        '--mr-bg-surface-strong',
        '--mr-radius-xs',
        '--mr-radius-sm',
    ],
    a11y: [
        'Native <button> semantics with aria-pressed.',
        'data-state attribute (on/off) for styling and testing.',
        'Visible focus ring via focus-visible.',
        'Use clear labels that describe the enabled option.',
    ],
}

export function ToggleDocs() {
    return <DocPage doc={docData} />
}
