import { DocPage, type DocPageData } from '../DocPage'
import {
    SliderBasicExample,
    SliderWithRangeExample,
    SliderDisabledExample,
    SliderWithErrorExample,
    SliderWithoutValueExample,
} from './Slider.examples'

const docData: DocPageData = {
    title: 'Slider',
    description: 'Range slider with optional value display.',
    importCode: "import { Slider } from '@monority/ui'",
    usageCode: `<Slider label="Brightness" value={value} onChange={setValue} />`,
    preview: () => <SliderBasicExample />,
    examples: [
        { title: 'Custom range', content: <SliderWithRangeExample /> },
        { title: 'Disabled', content: <SliderDisabledExample /> },
        { title: 'Error state', content: <SliderWithErrorExample /> },
        { title: 'Without value', content: <SliderWithoutValueExample /> },
    ],
    props: [
        { name: 'label', type: `ReactNode`, defaultValue: '-', description: 'Field label.' },
        { name: 'hint', type: `ReactNode`, defaultValue: '-', description: 'Helpful description.' },
        { name: 'error', type: `ReactNode`, defaultValue: '-', description: 'Error message.' },
        { name: 'value', type: `number`, defaultValue: '-', description: 'Controlled value.' },
        { name: 'defaultValue', type: `number`, defaultValue: '50', description: 'Default value.' },
        { name: 'min', type: `number`, defaultValue: '0', description: 'Minimum value.' },
        { name: 'max', type: `number`, defaultValue: '100', description: 'Maximum value.' },
        { name: 'step', type: `number`, defaultValue: '1', description: 'Step increment.' },
        {
            name: 'showValue',
            type: `boolean`,
            defaultValue: 'true',
            description: 'Show current value display.',
        },
        {
            name: 'required',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Required field indicator.',
        },
    ],
    cssHooks: [
        '.mr-slider',
        '.mr-slider__track',
        '.mr-slider__thumb',
        '.mr-slider__value',
        '[data-disabled]',
        '[data-invalid]',
    ],
    tokens: [
        '--mr-accent',
        '--mr-accent-contrast',
        '--mr-border-subtle',
        '--mr-bg-control',
        '--mr-fg-base',
        '--mr-fg-muted',
        '--mr-radius-full',
        '--mr-text-sm',
    ],
    a11y: [
        'Native range input semantics.',
        'Supports disabled/required/aria-invalid.',
        'Visible focus ring on thumb.',
        'Associated label for screen readers.',
        'Arrow keys adjust value.',
    ],
}

export function SliderDocs() {
    return <DocPage doc={docData} />
}
