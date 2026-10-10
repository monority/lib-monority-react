import { DocPage, type DocPageData } from '../DocPage'
import {
    BadgeDeltaBasicExample,
    BadgeDeltaInvertedExample,
    BadgeDeltaSizesExample,
} from './BadgeDelta.examples'

const docData: DocPageData = {
    title: 'BadgeDelta',
    description:
        'Indicateur compact de variation statistique / tendance avec iconographie directionnelle et couleurs sémantiques.',
    importCode: "import { BadgeDelta } from '@monority/ui'",
    usageCode: `<BadgeDelta deltaType="increase">+18.4%</BadgeDelta>`,
    preview: () => <BadgeDeltaBasicExample />,
    examples: [
        { title: 'Toutes les tailles (sm, md, lg)', content: <BadgeDeltaSizesExample /> },
        {
            title: 'Sens de variation inverse (ex: latence)',
            content: <BadgeDeltaInvertedExample />,
        },
    ],
    props: [
        {
            name: 'deltaType',
            type: "'increase' | 'moderate-increase' | 'decrease' | 'moderate-decrease' | 'unchanged'",
            defaultValue: "'increase'",
            description: 'Type de variation a representer.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Taille du badge.',
        },
        {
            name: 'isIncreasePositive',
            type: 'boolean',
            defaultValue: 'true',
            description: 'Definit si une hausse est favorable (vert) ou defavorable (rouge).',
        },
        {
            name: 'children',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Libelle ou pourcentage affiche.',
        },
    ],
    cssHooks: ['.mr-badge-delta', '.mr-badge-delta__icon', '[data-type]', '[data-size]'],
    tokens: [
        '--mr-success-solid',
        '--mr-danger-solid',
        '--mr-text-secondary',
        '--mr-border-default',
        '--mr-radius-full',
        '--mr-space-1',
        '--mr-space-2',
    ],
    a11y: [
        "Iconographie directionnelle integree masquée aux lecteurs d'ecran (aria-hidden).",
        'Prend en charge aria-label sur le badge pour une restitution textuelle explicite.',
        'Contraste de couleur conforme aux exigences WCAG AA.',
    ],
}

export function BadgeDeltaDocs() {
    return <DocPage doc={docData} />
}
