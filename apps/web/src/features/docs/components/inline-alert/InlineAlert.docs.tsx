import { InlineAlert } from '@monority/ui/inline-alert'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    InlineAlertBasicExample,
    InlineAlertTonesExample,
    InlineAlertWithActionExample,
} from './InlineAlert.examples'

function InlineAlertPlaygroundDemo(props: {
    tone: 'info' | 'success' | 'warning' | 'danger'
    title: string
    description: string
    actionLabel: string
}) {
    return (
        <div style={{ width: '100%', maxWidth: '520px', margin: '0 auto' }}>
            <InlineAlert
                tone={props.tone}
                title={props.title}
                description={props.description}
                actionLabel={props.actionLabel || undefined}
                onAction={props.actionLabel ? () => alert('Action declenchee') : undefined}
            />
        </div>
    )
}

const inlineAlertPlayground = (
    <ComponentPlayground<{
        tone: 'info' | 'success' | 'warning' | 'danger'
        title: string
        description: string
        actionLabel: string
    }>
        componentName="InlineAlert"
        importCode="import { InlineAlert } from '@monority/ui/inline-alert'"
        getCode={(p) => {
            const propsStr = [
                `  tone="${p.tone}"`,
                `  title="${p.title}"`,
                `  description="${p.description}"`,
                p.actionLabel ? `  actionLabel="${p.actionLabel}"` : '',
                p.actionLabel ? '  onAction={() => handleAction()}' : '',
            ]
                .filter(Boolean)
                .join('\n')

            return `import { InlineAlert } from '@monority/ui/inline-alert'\n\n<InlineAlert\n${propsStr}\n/>`
        }}
        controls={[
            {
                name: 'title',
                type: 'text',
                label: 'Titre de l alerte',
                defaultValue: 'Validation requise',
            },
            {
                name: 'description',
                type: 'text',
                label: 'Description',
                defaultValue: 'Une approbation supplementaire est attendue avant deploiment.',
            },
            {
                name: 'tone',
                type: 'select',
                label: 'Tonalite visuelle',
                defaultValue: 'warning',
                options: [
                    { value: 'info', label: 'Info' },
                    { value: 'success', label: 'Success' },
                    { value: 'warning', label: 'Warning' },
                    { value: 'danger', label: 'Danger' },
                ],
            },
            {
                name: 'actionLabel',
                type: 'text',
                label: 'Bouton d action (optionnel)',
                defaultValue: 'Verifier',
            },
        ]}
        render={(props) => <InlineAlertPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'InlineAlert',
    description:
        'Inline status surface for contextual messaging inside forms, settings, and content workflows.',
    importCode: "import { InlineAlert } from '@monority/ui/inline-alert'",
    usageCode: `<InlineAlert tone="warning" title="Docs review expires soon" description="Only one approval is still missing." />`,
    preview: () => <InlineAlertBasicExample />,
    playground: inlineAlertPlayground,
    examples: [
        { title: 'Tones', content: <InlineAlertTonesExample /> },
        { title: 'With action', content: <InlineAlertWithActionExample /> },
    ],
    props: [
        {
            name: 'tone',
            type: `'info' | 'success' | 'warning' | 'danger'`,
            defaultValue: '-',
            description: 'Visual tone.',
        },
        { name: 'title', type: `string`, defaultValue: '-', description: 'Alert title.' },
        {
            name: 'description',
            type: `string`,
            defaultValue: '-',
            description: 'Alert description.',
        },
        {
            name: 'actionLabel',
            type: `string`,
            defaultValue: '-',
            description: 'Action button label.',
        },
        {
            name: 'onAction',
            type: `() => void`,
            defaultValue: '-',
            description: 'Action callback.',
        },
    ],
    cssHooks: [
        '.mr-inline-alert',
        '.mr-inline-alert__marker',
        '.mr-inline-alert__body',
        '.mr-inline-alert__title',
        '.mr-inline-alert__description',
        '.mr-inline-alert__content',
        '.mr-inline-alert__action',
        '[data-tone]',
    ],
    tokens: [
        '--mr-bg-raised',
        '--mr-border-subtle',
        '--mr-shadow-xs',
        '--mr-accent-solid',
        '--mr-success-solid',
        '--mr-warning-solid',
        '--mr-danger-solid',
    ],
    a11y: [
        'Danger tone sets role="alert" for immediate screen reader notice.',
        'Other tones use role="status".',
        'Ensure descriptive text so color is not the only differentiator.',
    ],
}

export function InlineAlertDocs() {
    return <DocPage doc={docData} />
}
