import { BadgeDelta } from '@monority/ui/badge-delta'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { badgeDeltaI18n } from './BadgeDelta.messages'
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
                label: 'Delta value',
                defaultValue: '+24.5%',
            },
            {
                name: 'deltaType',
                type: 'select',
                label: 'Delta type',
                defaultValue: 'increase',
                options: [
                    { value: 'increase', label: 'Strong increase (increase)' },
                    { value: 'moderate-increase', label: 'Moderate increase' },
                    { value: 'unchanged', label: 'Unchanged' },
                    { value: 'moderate-decrease', label: 'Moderate decrease' },
                    { value: 'decrease', label: 'Strong decrease (decrease)' },
                ],
            },
            {
                name: 'size',
                type: 'select',
                label: 'Size',
                defaultValue: 'md',
                options: [
                    { value: 'sm', label: 'Small (sm)' },
                    { value: 'md', label: 'Medium (md)' },
                    { value: 'lg', label: 'Large (lg)' },
                ],
            },
            {
                name: 'isIncreasePositive',
                type: 'boolean',
                label: 'Increase is positive (green)',
                defaultValue: true,
            },
        ]}
        render={(props) => <BadgeDeltaPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'BadgeDelta',
    description:
        'Compact statistical variation badge displaying trend direction with arrows and semantic color indicators.',
    importCode: "import { BadgeDelta } from '@monority/ui/badge-delta'",
    usageCode: `<BadgeDelta deltaType="increase">+18.4%</BadgeDelta>`,
    preview: () => <BadgeDeltaBasicExample />,
    playground: badgeDeltaPlayground,
    examples: [
        { title: 'All sizes (sm, md, lg)', content: <BadgeDeltaSizesExample /> },
        {
            title: 'Inverted trend polarity (e.g. latency)',
            content: <BadgeDeltaInvertedExample />,
        },
    ],
    props: [
        {
            name: 'deltaType',
            type: "'increase' | 'moderate-increase' | 'decrease' | 'moderate-decrease' | 'unchanged'",
            defaultValue: "'increase'",
            description: 'Type of variation to represent.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Badge size and density.',
        },
        {
            name: 'isIncreasePositive',
            type: 'boolean',
            defaultValue: 'true',
            description: 'Defines whether an increase is positive (green) or negative (red).',
        },
        {
            name: 'children',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Displayed metric change or percentage.',
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
        'Integrated directional icons are hidden from screen readers (aria-hidden).',
        'Supports aria-label on the badge for an explicit spoken representation of trend and value.',
    ],
    i18n: badgeDeltaI18n,
}

export function BadgeDeltaDocs() {
    return <DocPage doc={docData} />
}
