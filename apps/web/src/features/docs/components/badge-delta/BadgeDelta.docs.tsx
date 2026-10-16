import { BadgeDelta } from '@monority/ui/badge-delta'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    BadgeDeltaBasicExample,
    BadgeDeltaInvertedExample,
    BadgeDeltaSizesExample,
} from './BadgeDelta.examples'

function BadgeDeltaPlaygroundDemo(props: {
    deltaType: 'increase' | 'moderate-increase' | 'decrease' | 'moderate-decrease' | 'unchanged'
    size: 'sm' | 'md' | 'lg'
    isIncreasePositive: boolean
    label: string
}) {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 'var(--mr-space-6)',
            }}
        >
            <BadgeDelta
                deltaType={props.deltaType}
                size={props.size}
                isIncreasePositive={props.isIncreasePositive}
            >
                {props.label}
            </BadgeDelta>
        </div>
    )
}

const badgeDeltaPlayground = (
    <ComponentPlayground<{
        deltaType: 'increase' | 'moderate-increase' | 'decrease' | 'moderate-decrease' | 'unchanged'
        size: 'sm' | 'md' | 'lg'
        isIncreasePositive: boolean
        label: string
    }>
        componentName="BadgeDelta"
        importCode="import { BadgeDelta } from '@monority/ui/badge-delta'"
        getCode={(p) => {
            const propsStr = [
                `  deltaType="${p.deltaType}"`,
                p.size !== 'md' ? `  size="${p.size}"` : '',
                !p.isIncreasePositive ? '  isIncreasePositive={false}' : '',
            ]
                .filter(Boolean)
                .join('\n')

            return `import { BadgeDelta } from '@monority/ui/badge-delta'\n\n<BadgeDelta\n${propsStr}\n>\n  ${p.label}\n</BadgeDelta>`
        }}
        controls={[
            {
                name: 'label',
                type: 'text',
                label: 'Valeur de variation',
                defaultValue: '+24.5%',
            },
            {
                name: 'deltaType',
                type: 'select',
                label: 'Type de variation',
                defaultValue: 'increase',
                options: [
                    { value: 'increase', label: 'Hausse forte (increase)' },
                    { value: 'moderate-increase', label: 'Hausse moderee' },
                    { value: 'unchanged', label: 'Inchange' },
                    { value: 'moderate-decrease', label: 'Baisse moderee' },
                    { value: 'decrease', label: 'Baisse forte (decrease)' },
                ],
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
                name: 'isIncreasePositive',
                type: 'boolean',
                label: 'Hausse favorable (vert)',
                defaultValue: true,
            },
        ]}
        render={(props) => <BadgeDeltaPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'BadgeDelta',
    description:
        'Indicateur compact de variation statistique / tendance avec iconographie directionnelle et couleurs sémantiques.',
    importCode: "import { BadgeDelta } from '@monority/ui/badge-delta'",
    usageCode: `<BadgeDelta deltaType="increase">+18.4%</BadgeDelta>`,
    preview: () => <BadgeDeltaBasicExample />,
    playground: badgeDeltaPlayground,
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
    ],
}

export function BadgeDeltaDocs() {
    return <DocPage doc={docData} />
}
