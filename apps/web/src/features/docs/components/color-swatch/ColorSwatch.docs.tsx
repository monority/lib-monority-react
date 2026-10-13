import { DocPage, type DocPageData } from '../DocPage'
import {
    ColorSwatchBasicExample,
    ColorSwatchSizesExample,
    ColorSwatchShapesExample,
    ColorSwatchValuesExample,
} from './ColorSwatch.examples'

const docData: DocPageData = {
    title: 'ColorSwatch',
    description:
        'Visual preview of a color token, theme level, or hex code with optional label and value.',
    importCode: "import { ColorSwatch } from '@monority/ui/color-swatch'",
    usageCode: `<ColorSwatch value="var(--mr-accent)" label="Accent" />
<ColorSwatch value="#ff0000" size="sm" shape="circle" />
<ColorSwatch value="var(--mr-bg-canvas)" label="Canvas" showValue />`,
    preview: () => <ColorSwatchBasicExample />,
    examples: [
        { title: 'Sizes', content: <ColorSwatchSizesExample /> },
        { title: 'Shapes', content: <ColorSwatchShapesExample /> },
        { title: 'With values', content: <ColorSwatchValuesExample /> },
    ],
    props: [
        {
            name: 'value',
            type: 'string',
            defaultValue: '-',
            description: 'Chromatic color value (hex, rgb, hsl, or CSS variable).',
        },
        {
            name: 'label',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Optional label accompanying the swatch.',
        },
        {
            name: 'showValue',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Displays the raw color value text alongside or below the label.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Size of the color swatch preview.',
        },
        {
            name: 'shape',
            type: "'square' | 'rounded' | 'circle'",
            defaultValue: "'rounded'",
            description: 'Geometric shape and border-radius of the preview swatch.',
        },
    ],
    cssHooks: [
        '.mr-color-swatch',
        '.mr-color-swatch__preview',
        '.mr-color-swatch__content',
        '.mr-color-swatch__label',
        '.mr-color-swatch__value',
        '[data-size]',
        '[data-shape]',
    ],
    tokens: [
        '--mr-space-4',
        '--mr-space-6',
        '--mr-border-default',
        '--mr-radius-sm',
        '--mr-radius-full',
        '--mr-text-primary',
        '--mr-text-secondary',
    ],
    a11y: [
        'Preview element has aria-hidden="true" when accompanied by text or label.',
        'Automatically adds role="img" when only aria-label is provided without visible text.',
    ],
}

export function ColorSwatchDocs() {
    return <DocPage doc={docData} />
}
