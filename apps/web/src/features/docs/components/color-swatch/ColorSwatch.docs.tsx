import { ColorSwatch } from '@monority/ui/color-swatch'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    ColorSwatchShapesExample,
    ColorSwatchSizesExample,
    ColorSwatchValuesExample,
} from './ColorSwatch.examples'

function ColorSwatchPlayground() {
    const [colorType, setColorType] = useState<'accent' | 'success' | 'danger' | 'custom'>('accent')
    const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md')
    const [shape, setShape] = useState<'square' | 'rounded' | 'circle'>('rounded')
    const [showValue, setShowValue] = useState(true)

    const colorValue =
        colorType === 'accent'
            ? 'var(--mr-color-primary, #6366f1)'
            : colorType === 'success'
              ? '#10b981'
              : colorType === 'danger'
                ? '#ef4444'
                : '#f59e0b'

    const label =
        colorType === 'accent'
            ? 'Couleur d’accent'
            : colorType === 'success'
              ? 'Succès opérationnel'
              : colorType === 'danger'
                ? 'Erreur critique'
                : 'Avertissement'

    const snippet = `<ColorSwatch
  value="${colorValue}"
  label="${label}"
  size="${size}"
  shape="${shape}"${showValue ? '\n  showValue' : ''}
/>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    label: 'Teinte',
                    value: colorType,
                    options: [
                        { value: 'accent', label: 'Accent principal' },
                        { value: 'success', label: 'Succès (#10b981)' },
                        { value: 'danger', label: 'Danger (#ef4444)' },
                        { value: 'custom', label: 'Alerte (#f59e0b)' },
                    ],
                    onChange: (v) => setColorType(v as 'accent' | 'success' | 'danger' | 'custom'),
                },
                {
                    type: 'select',
                    label: 'Size',
                    value: size,
                    options: [
                        { value: 'sm', label: 'Small (sm)' },
                        { value: 'md', label: 'Medium (md)' },
                        { value: 'lg', label: 'Large (lg)' },
                    ],
                    onChange: (v) => setSize(v as 'sm' | 'md' | 'lg'),
                },
                {
                    type: 'select',
                    label: 'Forme (shape)',
                    value: shape,
                    options: [
                        { value: 'rounded', label: 'Arrondi (rounded)' },
                        { value: 'circle', label: 'Cercle (circle)' },
                        { value: 'square', label: 'Carré (square)' },
                    ],
                    onChange: (v) => setShape(v as 'square' | 'rounded' | 'circle'),
                },
                {
                    type: 'boolean',
                    label: 'Afficher la valeur brute',
                    value: showValue,
                    onChange: setShowValue,
                },
            ]}
            codeSnippet={snippet}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 96,
                }}
            >
                <ColorSwatch
                    value={colorValue}
                    label={label}
                    size={size}
                    shape={shape}
                    showValue={showValue}
                />
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'ColorSwatch',
    description:
        'Visual preview of a color token, theme level, or hex code with optional label and value.',
    importCode: "import { ColorSwatch } from '@monority/ui/color-swatch'",
    usageCode: `<ColorSwatch value="var(--mr-accent)" label="Accent" />
<ColorSwatch value="#ff0000" size="sm" shape="circle" />
<ColorSwatch value="var(--mr-bg-canvas)" label="Canvas" showValue />`,
    preview: () => <ColorSwatchPlayground />,
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
