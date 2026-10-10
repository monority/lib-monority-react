import { DocPage, type DocPageData } from '../DocPage'
import { RatingBasicExample, RatingReadOnlyExample, RatingSizesExample } from './Rating.examples'

const docData: DocPageData = {
    title: 'Rating',
    description:
        'Composant de notation par étoiles interactif pour formulaires ou en affichage statique en lecture seule.',
    importCode: "import { Rating } from '@monority/ui'",
    usageCode: `<Rating value={score} onChange={setScore} />`,
    preview: () => <RatingBasicExample />,
    examples: [
        { title: 'Tailles sm, md, lg', content: <RatingSizesExample /> },
        { title: 'Mode lecture seule (readOnly)', content: <RatingReadOnlyExample /> },
    ],
    props: [
        {
            name: 'value',
            type: 'number',
            defaultValue: '-',
            description: 'Valeur controlee de la note.',
        },
        {
            name: 'defaultValue',
            type: 'number',
            defaultValue: '0',
            description: 'Valeur initiale incontrolee.',
        },
        {
            name: 'max',
            type: 'number',
            defaultValue: '5',
            description: "Nombre maximum d'etoiles.",
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Taille des etoiles.',
        },
        {
            name: 'readOnly',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Passe le composant en lecture seule non-interactive.',
        },
        {
            name: 'disabled',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Desactive le composant.',
        },
        {
            name: 'onChange',
            type: '(value: number) => void',
            defaultValue: '-',
            description: 'Rappel declenche lors du changement de note.',
        },
    ],
    cssHooks: [
        '.mr-rating',
        '.mr-rating__item',
        '.mr-rating__icon',
        '[data-active]',
        '[data-hover]',
        '[data-size]',
        '[data-readonly]',
        '[data-disabled]',
    ],
    tokens: [
        '--mr-warning-solid',
        '--mr-text-tertiary',
        '--mr-ring-focus',
        '--mr-duration-state',
        '--mr-space-1',
        '--mr-space-3',
        '--mr-space-4',
        '--mr-space-6',
    ],
    a11y: [
        'Accessible au clavier via le motif radiogroup et elements radio.',
        'Navigation par fleches directionnelles (droite/gauche et haut/bas).',
        'Libelle accessible clair specifiant chaque note (ex: "4 etoiles sur 5").',
    ],
}

export function RatingDocs() {
    return <DocPage doc={docData} />
}
