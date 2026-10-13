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
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Libellé accessible associé au champ.',
        },
        {
            name: 'hint',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Texte d’aide explicatif sous le champ.',
        },
        {
            name: 'error',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Message d’erreur signalant une valeur non valide.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Taille du curseur et hauteur de la zone interactive.',
        },
        {
            name: 'tone',
            type: "'neutral' | 'accent' | 'danger'",
            defaultValue: "'neutral'",
            description: 'Tonalité chromatique de remplissage de la piste et du pouce.',
        },
        {
            name: 'range',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Active le mode intervalle à deux pouces de saisie.',
        },
        {
            name: 'value',
            type: 'number | [number, number]',
            defaultValue: '-',
            description: 'Valeur contrôlée (nombre ou tuple [min, max]).',
        },
        {
            name: 'defaultValue',
            type: 'number | [number, number]',
            defaultValue: '50 (ou [25, 75] en mode range)',
            description: 'Valeur initiale en mode non contrôlé.',
        },
        {
            name: 'min',
            type: 'number',
            defaultValue: '0',
            description: 'Valeur minimale admissible.',
        },
        {
            name: 'max',
            type: 'number',
            defaultValue: '100',
            description: 'Valeur maximale admissible.',
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
