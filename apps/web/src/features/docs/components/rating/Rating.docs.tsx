import { useState } from 'react'
import { Rating } from '@monority/ui/rating'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { RatingBasicExample, RatingReadOnlyExample, RatingSizesExample } from './Rating.examples'

function RatingPlaygroundDemo(props: {
    size: 'sm' | 'md' | 'lg'
    max: number
    readOnly: boolean
    disabled: boolean
}) {
    const [score, setScore] = useState(4)
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--mr-space-3)',
            }}
        >
            <Rating
                size={props.size}
                max={props.max}
                readOnly={props.readOnly}
                disabled={props.disabled}
                value={score}
                onChange={setScore}
            />
            <span style={{ fontSize: 'var(--mr-font-size-sm)', color: 'var(--mr-text-primary)' }}>
                Note selectionnee :{' '}
                <strong>
                    {score} / {props.max}
                </strong>
            </span>
        </div>
    )
}

const ratingPlayground = (
    <ComponentPlayground<{
        size: 'sm' | 'md' | 'lg'
        max: number
        readOnly: boolean
        disabled: boolean
    }>
        componentName="Rating"
        importCode="import { Rating } from '@monority/ui/rating'"
        getCode={(p) => {
            const propsStr = [
                `  value={score}`,
                '  onChange={setScore}',
                p.max !== 5 ? `  max={${p.max}}` : '',
                p.size !== 'md' ? `  size="${p.size}"` : '',
                p.readOnly ? '  readOnly' : '',
                p.disabled ? '  disabled' : '',
            ]
                .filter(Boolean)
                .join('\n')

            return `import { useState } from 'react'\nimport { Rating } from '@monority/ui/rating'\n\nconst [score, setScore] = useState(4)\n\n<Rating\n${propsStr}\n/>`
        }}
        controls={[
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
                name: 'max',
                type: 'number',
                label: 'Etoiles max',
                defaultValue: 5,
            },
            {
                name: 'readOnly',
                type: 'boolean',
                label: 'Lecture seule (readOnly)',
                defaultValue: false,
            },
            {
                name: 'disabled',
                type: 'boolean',
                label: 'Desactive (disabled)',
                defaultValue: false,
            },
        ]}
        render={(props) => <RatingPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'Rating',
    description:
        'Composant de notation par étoiles interactif pour formulaires ou en affichage statique en lecture seule.',
    importCode: "import { Rating } from '@monority/ui/rating'",
    usageCode: `<Rating value={score} onChange={setScore} />`,
    preview: () => <RatingBasicExample />,
    playground: ratingPlayground,
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
    keyboardNavigation: [
        {
            key: ['ArrowRight', 'ArrowUp'],
            action: 'Augmente la note d une etoile.',
            context: 'Controle de notation (rating)',
        },
        {
            key: ['ArrowLeft', 'ArrowDown'],
            action: 'Diminue la note d une etoile.',
            context: 'Controle de notation (rating)',
        },
        {
            key: 'Home',
            action: 'Attribue la premiere note disponible (1 etoile).',
            context: 'Controle de notation (rating)',
        },
        {
            key: 'End',
            action: 'Attribue la note maximale disponible.',
            context: 'Controle de notation (rating)',
        },
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
