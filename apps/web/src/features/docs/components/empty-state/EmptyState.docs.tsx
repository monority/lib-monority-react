import { Button } from '@monority/ui/button'
import { EmptyState } from '@monority/ui/empty-state'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    EmptyStateBasicExample,
    EmptyStateWithActionExample,
    EmptyStateWithIconExample,
    EmptyStateWithSecondaryActionExample,
} from './EmptyState.examples'

function EmptyStatePlaygroundDemo(props: {
    title: string
    description: string
    actionLabel: string
}) {
    return (
        <div style={{ width: '100%', maxWidth: '440px', margin: '0 auto' }}>
            <EmptyState
                title={props.title}
                description={props.description}
                action={
                    props.actionLabel ? (
                        <Button variant="primary">{props.actionLabel}</Button>
                    ) : undefined
                }
            />
        </div>
    )
}

const emptyStatePlayground = (
    <ComponentPlayground<{
        title: string
        description: string
        actionLabel: string
    }>
        componentName="EmptyState"
        importCode="import { EmptyState } from '@monority/ui/empty-state'"
        getCode={(p) => {
            const actionProp = p.actionLabel
                ? `\n  action={<Button variant="primary">${p.actionLabel}</Button>}`
                : ''
            return `import { Button } from '@monority/ui/button'\nimport { EmptyState } from '@monority/ui/empty-state'\n\n<EmptyState\n  title="${p.title}"\n  description="${p.description}"${actionProp}\n/>`
        }}
        controls={[
            {
                name: 'title',
                type: 'text',
                label: 'Titre principal',
                defaultValue: 'Aucun projet trouve',
            },
            {
                name: 'description',
                type: 'text',
                label: 'Description explicative',
                defaultValue: 'Creez votre premier projet ou modifiez vos criteres de filtre.',
            },
            {
                name: 'actionLabel',
                type: 'text',
                label: 'Libelle du bouton d action',
                defaultValue: 'Nouveau projet',
            },
        ]}
        render={(props) => <EmptyStatePlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'EmptyState',
    description:
        'A centered fallback surface for empty collections, quiet queues, and first-run moments.',
    importCode: "import { EmptyState } from '@monority/ui/empty-state'",
    usageCode: '<EmptyState title="No results found" description="Try adjusting your filters." />',
    preview: () => <EmptyStateBasicExample />,
    playground: emptyStatePlayground,
    examples: [
        { title: 'With action', content: <EmptyStateWithActionExample /> },
        { title: 'With icon', content: <EmptyStateWithIconExample /> },
        {
            title: 'With secondary action',
            content: <EmptyStateWithSecondaryActionExample />,
        },
    ],
    props: [
        {
            name: 'title',
            type: `string`,
            defaultValue: '-',
            description: 'Main empty state heading.',
        },
        {
            name: 'description',
            type: `string`,
            defaultValue: '-',
            description: 'Supporting description.',
        },
        {
            name: 'icon',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Optional leading visual.',
        },
        {
            name: 'action',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Primary action button.',
        },
        {
            name: 'secondaryAction',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Secondary action.',
        },
    ],
    cssHooks: [
        '.mr-empty-state',
        '.mr-empty-state__icon',
        '.mr-empty-state__content',
        '.mr-empty-state__title',
        '.mr-empty-state__description',
        '.mr-empty-state__actions',
    ],
    tokens: [
        '--mr-bg-surface',
        '--mr-border-subtle',
        '--mr-radius-md',
        '--mr-space-6',
        '--mr-text-primary',
        '--mr-text-secondary',
    ],
    a11y: [
        'Uses heading semantics for the title.',
        'Icon is decorative; aria-hidden should be applied when present.',
        'Action buttons maintain normal focus and activation order.',
    ],
}

export function EmptyStateDocs() {
    return <DocPage doc={docData} />
}
