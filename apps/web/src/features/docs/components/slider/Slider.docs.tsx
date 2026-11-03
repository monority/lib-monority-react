import { Slider } from '@monority/ui/slider'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    SliderBasicExample,
    SliderControlledExample,
    SliderDisabledExample,
    SliderDualRangeExample,
    SliderSizesExample,
    SliderTonesExample,
    SliderWithErrorExample,
    SliderWithStepsExample,
} from './Slider.examples'
import { sliderI18n } from './Slider.messages'

function SliderPlaygroundDemo(props: {
    size: 'sm' | 'md' | 'lg'
    tone: 'neutral' | 'accent' | 'danger'
    label: string
    min: number
    max: number
    step: number
    disabled: boolean
}) {
    const [value, setValue] = useState(65)
    return (
        <div style={{ width: '100%', maxWidth: '380px', margin: '0 auto' }}>
            <Slider
                size={props.size}
                tone={props.tone}
                label={props.label}
                min={props.min}
                max={props.max}
                step={props.step}
                disabled={props.disabled}
                value={value}
                onValueChange={(v: number | [number, number]) =>
                    setValue(Array.isArray(v) ? v[0] : v)
                }
            />
        </div>
    )
}

const sliderPlayground = (
    <ComponentPlayground<{
        size: 'sm' | 'md' | 'lg'
        tone: 'neutral' | 'accent' | 'danger'
        label: string
        min: number
        max: number
        step: number
        disabled: boolean
    }>
        componentName="Slider"
        importCode="import { Slider } from '@monority/ui/slider'"
        getCode={(p) => {
            const propsStr = [
                `  label="${p.label}"`,
                `  min={${p.min}}`,
                `  max={${p.max}}`,
                p.step !== 1 ? `  step={${p.step}}` : '',
                p.size !== 'md' ? `  size="${p.size}"` : '',
                p.tone !== 'accent' ? `  tone="${p.tone}"` : '',
                p.disabled ? '  disabled' : '',
                '  value={value}',
                '  onValueChange={setValue}',
            ]
                .filter(Boolean)
                .join('\n')

            return `import { useState } from 'react'\nimport { Slider } from '@monority/ui/slider'\n\nconst [value, setValue] = useState(65)\n\n<Slider\n${propsStr}\n/>`
        }}
        controls={[
            {
                name: 'label',
                type: 'text',
                label: 'Label',
                defaultValue: 'Audio volume',
            },
            {
                name: 'size',
                type: 'select',
                label: 'Size',
                defaultValue: 'md',
                options: [
                    { value: 'sm', label: 'Small' },
                    { value: 'md', label: 'Medium' },
                    { value: 'lg', label: 'Large' },
                ],
            },
            {
                name: 'tone',
                type: 'select',
                label: 'Visual tone',
                defaultValue: 'accent',
                options: [
                    { value: 'accent', label: 'Accent' },
                    { value: 'neutral', label: 'Neutral' },
                    { value: 'danger', label: 'Danger' },
                ],
            },
            {
                name: 'min',
                type: 'number',
                label: 'Min value',
                defaultValue: 0,
            },
            {
                name: 'max',
                type: 'number',
                label: 'Max value',
                defaultValue: 100,
            },
            {
                name: 'step',
                type: 'number',
                label: 'Step',
                defaultValue: 5,
            },
            {
                name: 'disabled',
                type: 'boolean',
                label: 'Disabled',
                defaultValue: false,
            },
        ]}
        render={(props) => <SliderPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'Slider',
    description:
        'Interactive numeric slider supporting size variants, semantic tones, dual-handle range mode, and customizable granularity.',
    importCode: "import { Slider } from '@monority/ui/slider'",
    usageCode: `import { useState } from 'react'
import { Slider } from '@monority/ui/slider'

const [value, setValue] = useState(50)

// Single slider
<Slider label="Brightness" value={value} onValueChange={setValue} />

// Dual-thumb range slider
<Slider label="Budget" range defaultValue={[25, 75]} />`,
    preview: () => <SliderBasicExample />,
    playground: sliderPlayground,
    examples: [
        {
            title: 'Sizes',
            content: <SliderSizesExample />,
        },
        {
            title: 'Semantic tones',
            content: <SliderTonesExample />,
        },
        {
            title: 'Dual-thumb range mode',
            content: <SliderDualRangeExample />,
        },
        {
            title: 'Steps and granularity',
            content: <SliderWithStepsExample />,
        },
        {
            title: 'Controlled with state synchronization',
            content: <SliderControlledExample />,
        },
        {
            title: 'Disabled',
            content: <SliderDisabledExample />,
        },
        {
            title: 'Error state',
            content: <SliderWithErrorExample />,
        },
    ],
    props: [
        {
            name: 'label',
            type: 'string',
            defaultValue: '-',
            description: 'Text label associated with slider field.',
        },
        {
            name: 'hint',
            type: 'string',
            defaultValue: '-',
            description: 'Help text displayed below slider.',
        },
        {
            name: 'error',
            type: 'string',
            defaultValue: '-',
            description: 'Visual error message marking field invalid.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Size variant adjusting track height and thumb.',
        },
        {
            name: 'tone',
            type: "'neutral' | 'accent' | 'danger'",
            defaultValue: "'accent'",
            description: 'Color tone of the active track.',
        },
        {
            name: 'value',
            type: 'number | [number, number]',
            defaultValue: '-',
            description: 'Controlled slider value.',
        },
        {
            name: 'defaultValue',
            type: 'number | [number, number]',
            defaultValue: '0 | [min, max]',
            description: 'Initial uncontrolled slider value.',
        },
        {
            name: 'range',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Enables dual-handle range selection mode.',
        },
        {
            name: 'min',
            type: 'number',
            defaultValue: '0',
            description: 'Lower bound allowed.',
        },
        {
            name: 'max',
            type: 'number',
            defaultValue: '100',
            description: 'Upper bound allowed.',
        },
        {
            name: 'step',
            type: 'number',
            defaultValue: '1',
            description: 'Step increment of the slider.',
        },
        {
            name: 'showValue',
            type: 'boolean',
            defaultValue: 'true',
            description: 'Displays current numerical value in an <output> element.',
        },
        {
            name: 'disabled',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Disables slider interaction.',
        },
        {
            name: 'onValueChange',
            type: '((val: number) => void) | ((val: [number, number]) => void)',
            defaultValue: '-',
            description: 'Callback fired on value change.',
        },
    ],
    cssHooks: [
        '.mr-slider',
        '.mr-slider-field',
        '.mr-slider__row',
        '.mr-slider__value',
        '.mr-slider-range-container',
        '.mr-slider--range',
        '.mr-slider--lower',
        '.mr-slider--upper',
        '[data-size]',
        '[data-tone]',
        '[data-disabled]',
        '[data-invalid]',
    ],
    tokens: [
        '--mr-bg-inverse',
        '--mr-accent-solid',
        '--mr-danger-solid',
        '--mr-border-control',
        '--mr-bg-canvas',
        '--mr-focus-ring',
        '--mr-duration-state',
        '--mr-space-1',
        '--mr-space-4',
        '--mr-space-5',
        '--mr-space-6',
    ],
    keyboardNavigation: [
        {
            key: ['ArrowRight', 'ArrowUp'],
            action: 'Increments value by step.',
            context: 'Focused slider thumb',
        },
        {
            key: ['ArrowLeft', 'ArrowDown'],
            action: 'Decrements value by step.',
            context: 'Focused slider thumb',
        },
        {
            key: 'Home',
            action: 'Sets value to minimum bound.',
            context: 'Focused slider thumb',
        },
        {
            key: 'End',
            action: 'Sets value to maximum bound.',
            context: 'Focused slider thumb',
        },
        {
            key: ['PageUp', 'PageDown'],
            action: 'Jumps value by a larger increment (10% of range).',
            context: 'Focused slider thumb',
        },
    ],
    a11y: [
        'Native <input type="range"> elements guaranteeing implicit ARIA roles.',
        'Full keyboard navigation support (arrows, Home, End, PageUp, PageDown).',
        'Associated <output htmlFor="..."> element for screen reader and visual feedback.',
        'Visible focus ring complying with contrast requirements.',
    ],
    i18n: sliderI18n,
}

export function SliderDocs() {
    return <DocPage doc={docData} />
}
