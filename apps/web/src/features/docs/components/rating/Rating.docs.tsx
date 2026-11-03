import { Rating } from '@monority/ui/rating'
import { useState } from 'react'
import { useLocale } from '../../../../shared/i18n'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { RatingBasicExample, RatingReadOnlyExample, RatingSizesExample } from './Rating.examples'
import { ratingI18n } from './Rating.messages'

function RatingPlaygroundDemo(props: {
    size: 'sm' | 'md' | 'lg'
    max: number
    readOnly: boolean
    disabled: boolean
}) {
    const { locale } = useLocale()
    const isFr = locale === 'fr'
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
                {isFr ? 'Note sélectionnée : ' : 'Selected score: '}
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
                label: 'Size',
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
                label: 'Max stars',
                defaultValue: 5,
            },
            {
                name: 'readOnly',
                type: 'boolean',
                label: 'Read-only',
                defaultValue: false,
            },
            {
                name: 'disabled',
                type: 'boolean',
                label: 'Disabled',
                defaultValue: false,
            },
        ]}
        render={(props) => <RatingPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'Rating',
    description: 'Interactive star rating component for form feedback or static read-only display.',
    importCode: "import { Rating } from '@monority/ui/rating'",
    usageCode: `<Rating value={score} onChange={setScore} />`,
    preview: () => <RatingBasicExample />,
    playground: ratingPlayground,
    examples: [
        { title: 'Sizes', content: <RatingSizesExample /> },
        { title: 'Read-only mode', content: <RatingReadOnlyExample /> },
    ],
    props: [
        {
            name: 'value',
            type: 'number',
            defaultValue: '-',
            description: 'Controlled score value.',
        },
        {
            name: 'defaultValue',
            type: 'number',
            defaultValue: '0',
            description: 'Initial uncontrolled score value.',
        },
        {
            name: 'max',
            type: 'number',
            defaultValue: '5',
            description: 'Maximum number of stars.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Star icon size density.',
        },
        {
            name: 'readOnly',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Renders in non-interactive read-only state.',
        },
        {
            name: 'disabled',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Disables user interaction and dims presentation.',
        },
        {
            name: 'onChange',
            type: '(value: number) => void',
            defaultValue: '-',
            description: 'Callback fired when score changes.',
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
            action: 'Increments the rating by one star.',
            context: 'Rating control',
        },
        {
            key: ['ArrowLeft', 'ArrowDown'],
            action: 'Decrements the rating by one star.',
            context: 'Rating control',
        },
        {
            key: 'Home',
            action: 'Selects the first available star (1 star).',
            context: 'Rating control',
        },
        {
            key: 'End',
            action: 'Selects the maximum star rating.',
            context: 'Rating control',
        },
    ],
    a11y: [
        'Keyboard accessible via radiogroup pattern and radio items.',
        'Directional arrow navigation (right/left and up/down).',
        'Clear accessible label specifying score (e.g., "4 out of 5 stars").',
    ],
    i18n: ratingI18n,
}

export function RatingDocs() {
    return <DocPage doc={docData} />
}
