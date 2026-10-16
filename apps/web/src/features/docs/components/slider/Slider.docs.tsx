import { useState } from 'react'
import { Slider } from '@monority/ui/slider'
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
                label: 'Libelle (label)',
                defaultValue: 'Volume audio',
            },
            {
                name: 'size',
                type: 'select',
                label: 'Dimension (size)',
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
                label: 'Tonalite visuelle',
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
                label: 'Valeur min',
                defaultValue: 0,
            },
            {
                name: 'max',
                type: 'number',
                label: 'Valeur max',
                defaultValue: 100,
            },
            {
                name: 'step',
                type: 'number',
                label: 'Pas (step)',
                defaultValue: 5,
            },
            {
                name: 'disabled',
                type: 'boolean',
                label: 'Desactive (disabled)',
                defaultValue: false,
            },
        ]}
        render={(props) => <SliderPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'Slider',
    description:
        'Curseur de sélection numérique interactif prenant en charge les variantes de tailles, les tonalités sémantiques, le mode intervalle à double curseur et la granularité personnalisée.',
    importCode: "import { Slider } from '@monority/ui/slider'",
    usageCode: `import { useState } from 'react'
import { Slider } from '@monority/ui/slider'

const [value, setValue] = useState(50)

// Curseur simple
<Slider label="Luminosité" value={value} onValueChange={setValue} />

// Curseur d'intervalle (range)
<Slider label="Budget" range defaultValue={[25, 75]} />`,
    preview: () => <SliderBasicExample />,
    playground: sliderPlayground,
    examples: [
        {
            title: 'Tailles (sm, md, lg)',
            content: <SliderSizesExample />,
        },
        {
            title: 'Tonalités sémantiques (neutral, accent, danger)',
            content: <SliderTonesExample />,
        },
        {
            title: 'Mode intervalle double curseur (range)',
            content: <SliderDualRangeExample />,
        },
        {
            title: 'Paliers et granularité (step)',
            content: <SliderWithStepsExample />,
        },
        {
            title: 'Contrôlé avec synchronisation d’état',
            content: <SliderControlledExample />,
        },
        {
            title: 'Désactivé',
            content: <SliderDisabledExample />,
        },
        {
            title: 'État d’erreur',
            content: <SliderWithErrorExample />,
        },
    ],
    props: [
        {
            name: 'label',
            type: 'string',
            defaultValue: '-',
            description: 'Libellé textuel associé au champ du curseur.',
        },
        {
            name: 'hint',
            type: 'string',
            defaultValue: '-',
            description: 'Texte d’aide affiché sous le curseur.',
        },
        {
            name: 'error',
            type: 'string',
            defaultValue: '-',
            description: 'Message d’erreur visuel passant le composant en état invalide.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Variante de taille ajustant la hauteur de piste et les marges.',
        },
        {
            name: 'tone',
            type: "'neutral' | 'accent' | 'danger'",
            defaultValue: "'accent'",
            description: 'Tonalité chromatique de la piste active.',
        },
        {
            name: 'value',
            type: 'number | [number, number]',
            defaultValue: '-',
            description: 'Valeur contrôlée.',
        },
        {
            name: 'defaultValue',
            type: 'number | [number, number]',
            defaultValue: '0 | [min, max]',
            description: 'Valeur initiale incontrôlée.',
        },
        {
            name: 'range',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Active le mode intervalle à deux poignées (double curseur).',
        },
        {
            name: 'min',
            type: 'number',
            defaultValue: '0',
            description: 'Borne inférieure autorisée.',
        },
        {
            name: 'max',
            type: 'number',
            defaultValue: '100',
            description: 'Borne supérieure autorisée.',
        },
        {
            name: 'step',
            type: 'number',
            defaultValue: '1',
            description: 'Pas de déplacement du curseur.',
        },
        {
            name: 'showValue',
            type: 'boolean',
            defaultValue: 'true',
            description: 'Affiche la valeur numérique courante dans un élément <output>.',
        },
        {
            name: 'disabled',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Désactive le curseur et empêche les interactions.',
        },
        {
            name: 'onValueChange',
            type: '((val: number) => void) | ((val: [number, number]) => void)',
            defaultValue: '-',
            description: 'Rappel déclenché lors du déplacement avec la nouvelle valeur.',
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
            action: 'Incremente la valeur selon le pas (step).',
            context: 'Curseur focalise',
        },
        {
            key: ['ArrowLeft', 'ArrowDown'],
            action: 'Decremente la valeur selon le pas (step).',
            context: 'Curseur focalise',
        },
        {
            key: 'Home',
            action: 'Positionne le curseur sur la borne minimale (min).',
            context: 'Curseur focalise',
        },
        {
            key: 'End',
            action: 'Positionne le curseur sur la borne maximale (max).',
            context: 'Curseur focalise',
        },
        {
            key: ['PageUp', 'PageDown'],
            action: 'Effectue un saut de valeur plus important (10% de l echelle).',
            context: 'Curseur focalise',
        },
    ],
    a11y: [
        'Éléments natifs <input type="range"> garantissant les rôles ARIA implicites.',
        'Prise en charge complète de la navigation clavier (flèches, Début, Fin).',
        'Sortie visuelle associée <output htmlFor="..."> pour le retour de lecture.',
        'Anneau de focus visible et distinct au clavier.',
    ],
}

export function SliderDocs() {
    return <DocPage doc={docData} />
}
