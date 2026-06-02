import {
    ToggleGroupSinglePreview,
    ToggleGroupMultipleExample,
    ToggleGroupDisabledExample,
    ToggleGroupVerticalExample,
    ToggleGroupVariantsExample,
    ToggleGroupSizesExample,
} from './ToggleGroup.examples'
import { DocPage, type DocPageData } from '../DocPage'

const docData: DocPageData = {
    title: 'ToggleGroup',
    description: 'Grouped pressed-state controls for mutually exclusive or multi-select options.',
    importCode: "import { ToggleGroup } from '@monority/ui/toggle-group'",
    usageCode: '<ToggleGroup items={items} type="single" />',
    preview: () => <ToggleGroupSinglePreview />,
    examples: [
        { title: 'Single select', content: <ToggleGroupSinglePreview /> },
        { title: 'Multiple select', content: <ToggleGroupMultipleExample /> },
        { title: 'Variants', content: <ToggleGroupVariantsExample /> },
        { title: 'Sizes', content: <ToggleGroupSizesExample /> },
        { title: 'Disabled', content: <ToggleGroupDisabledExample /> },
        { title: 'Vertical', content: <ToggleGroupVerticalExample /> },
    ],
    props: [
        {
            name: 'items',
            type: 'ToggleGroupItem[]',
            defaultValue: '-',
            description: 'Array of { value, label, disabled? } items.',
        },
        {
            name: 'type',
            type: "'single' | 'multiple'",
            defaultValue: "'single'",
            description: 'Selection mode.',
        },
        {
            name: 'value',
            type: 'string | string[]',
            defaultValue: '-',
            description: 'Controlled value. String for single, string[] for multiple.',
        },
        {
            name: 'defaultValue',
            type: 'string | string[]',
            defaultValue: "'' | []",
            description: 'Initial value (uncontrolled).',
        },
        {
            name: 'onValueChange',
            type: '(value: string | string[]) => void',
            defaultValue: '-',
            description: 'Callback when selection changes.',
        },
        {
            name: 'disabled',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Disables all items in the group.',
        },
        {
            name: 'orientation',
            type: "'horizontal' | 'vertical'",
            defaultValue: "'horizontal'",
            description: 'Layout direction.',
        },
        {
            name: 'variant',
            type: "'default' | 'outline'",
            defaultValue: '-',
            description: 'Visual style passed to each Toggle.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: '-',
            description: 'Size passed to each Toggle.',
        },
    ],
    cssHooks: [
        '.mr-toggle-group',
        '.mr-toggle-group--horizontal',
        '.mr-toggle-group--vertical',
        '.mr-toggle-group__item',
        '.mr-toggle-group__item--active',
        '[data-orientation]',
    ],
    tokens: ['--mr-radius-sm'],
    a11y: [
        'role="group" for single selection, role="toolbar" for multiple.',
        'aria-orientation reflects layout direction.',
        'Each item uses Toggle with aria-pressed.',
        'Keep item labels short enough to scan as a set.',
    ],
}

export function ToggleGroupDocs() {
    return <DocPage doc={docData} />
}
