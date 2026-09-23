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
    importCode: "import { Slider } from '@monority/ui/slider'",
    usageCode: `import { useState } from 'react'

const [value, setValue] = useState(50)

<Slider label="Brightness" value={value} onValueChange={setValue} />`,
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
        { name: 'value', type: `number`, defaultValue: '-', description: 'Controlled value. Omit for uncontrolled mode with `defaultValue`.' },
        { name: 'defaultValue', type: `number`, defaultValue: '50', description: 'Uncontrolled initial value (default 50).' },
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
        {
            name: 'invalid',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Explicit invalid state. Also implied by error.',
        },
        {
            name: 'onValueChange',
            type: `(value: number) => void`,
            defaultValue: '-',
            description: 'Called with the numeric slider value on change.',
        },
        {
            name: 'onChange',
            type: `(event: ChangeEvent<HTMLInputElement>) => void`,
            defaultValue: '-',
            description: 'Native change event on the range input.',
        },
        {
            name: 'size',
            type: `'sm' | 'md' | 'lg'`,
            defaultValue: "'md'",
            description: 'Slider size.',
        },
        { name: 'disabled', type: `boolean`, defaultValue: 'false', description: 'Disabled state.' },
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
        'Arrow keys, Home and End adjust the value.',
        'onValueChange fires with the numeric value; onChange fires with the native event.',
    ],
}

export function SliderDocs() {
    return <DocPage doc={docData} />
}
