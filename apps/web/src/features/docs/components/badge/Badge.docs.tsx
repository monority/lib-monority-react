import { Badge } from '@monority/ui/badge'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    BadgeDefaultExample,
    BadgePrimaryExample,
    BadgeSuccessExample,
    BadgeDangerExample,
    BadgeWarningExample,
    BadgeVariantsExample,
} from './Badge.examples'

function BadgePlaygroundDemo(props: {
    variant: 'default' | 'primary' | 'success' | 'warning' | 'danger'
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
            <Badge variant={props.variant}>{props.label}</Badge>
        </div>
    )
}

const badgePlayground = (
    <ComponentPlayground<{
        variant: 'default' | 'primary' | 'success' | 'warning' | 'danger'
        label: string
    }>
        componentName="Badge"
        importCode="import { Badge } from '@monority/ui/badge'"
        getCode={(p) => {
            const variantProp = p.variant !== 'default' ? ` variant="${p.variant}"` : ''
            return `import { Badge } from '@monority/ui/badge'\n\n<Badge${variantProp}>${p.label}</Badge>`
        }}
        controls={[
            {
                name: 'label',
                type: 'text',
                label: 'Texte du badge',
                defaultValue: 'En production',
            },
            {
                name: 'variant',
                type: 'select',
                label: 'Variante visuelle',
                defaultValue: 'primary',
                options: [
                    { value: 'default', label: 'Default' },
                    { value: 'primary', label: 'Primary' },
                    { value: 'success', label: 'Success' },
                    { value: 'warning', label: 'Warning' },
                    { value: 'danger', label: 'Danger' },
                ],
            },
        ]}
        render={(props) => <BadgePlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'Badge',
    description: 'Compact status label for metadata, lifecycle states, and small categorization.',
    importCode: "import { Badge } from '@monority/ui/badge'",
    usageCode: '<Badge>Draft</Badge>',
    preview: () => <BadgeDefaultExample />,
    playground: badgePlayground,
    examples: [
        { title: 'Primary', content: <BadgePrimaryExample /> },
        { title: 'Success', content: <BadgeSuccessExample /> },
        { title: 'Warning', content: <BadgeWarningExample /> },
        { title: 'Danger', content: <BadgeDangerExample /> },
        { title: 'All variants', content: <BadgeVariantsExample /> },
    ],
    props: [
        {
            name: 'variant',
            type: `'default' | 'primary' | 'success' | 'warning' | 'danger'`,
            defaultValue: "'default'",
            description: 'Visual variant.',
        },
        {
            name: 'children',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Short label text.',
        },
    ],
    cssHooks: ['.mr-badge', '[data-variant]'],
    tokens: [
        '--mr-radius-xs',
        '--mr-font-size-xs',
        '--mr-accent-subtle',
        '--mr-success-soft',
        '--mr-warning-soft',
        '--mr-danger-soft',
    ],
    a11y: ['Use concise text.', 'Avoid color-only meaning for critical states.'],
}

export function BadgeDocs() {
    return <DocPage doc={docData} />
}
