import { Toast } from '@monority/ui/toast'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { ToastBasicExample, ToastProviderExample, ToastTonesExample } from './Toast.examples'

function ToastPlaygroundDemo(props: {
    tone: 'neutral' | 'success' | 'danger'
    title: string
    description: string
}) {
    return (
        <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
            <Toast
                tone={props.tone}
                title={props.title}
                description={props.description}
                onClose={() => {}}
            />
        </div>
    )
}

const toastPlayground = (
    <ComponentPlayground<{
        tone: 'neutral' | 'success' | 'danger'
        title: string
        description: string
    }>
        componentName="Toast"
        importCode="import { Toast } from '@monority/ui/toast'"
        getCode={(p) => {
            const toneProp = p.tone !== 'neutral' ? ` tone="${p.tone}"` : ''
            return `import { Toast } from '@monority/ui/toast'\n\n<Toast${toneProp}\n  title="${p.title}"\n  description="${p.description}"\n  onClose={() => dismissToast()}\n/>`
        }}
        controls={[
            {
                name: 'title',
                type: 'text',
                label: 'Titre de la notification',
                defaultValue: 'Projet sauvegarde',
            },
            {
                name: 'description',
                type: 'text',
                label: 'Description',
                defaultValue: 'Toutes les modifications ont ete synchronisees sur le cloud.',
            },
            {
                name: 'tone',
                type: 'select',
                label: 'Tonalite visuelle',
                defaultValue: 'success',
                options: [
                    { value: 'neutral', label: 'Neutral' },
                    { value: 'success', label: 'Success' },
                    { value: 'danger', label: 'Danger' },
                ],
            },
        ]}
        render={(props) => <ToastPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'Toast',
    description:
        'Transient notification surface for background status, success confirmation, and failure feedback. Use for temporary feedback tied to an action. Render one <Toast> directly, or push queued toasts through ToastProvider with useToast().',
    importCode: `import { Toast } from '@monority/ui/toast'
import { useToast } from '@monority/ui'`,
    usageCode: `<Toast title="Release draft saved" description="Your docs changes are ready for review." tone="neutral" />`,
    preview: () => <ToastBasicExample />,
    playground: toastPlayground,
    examples: [
        { title: 'Tones', content: <ToastTonesExample /> },
        { title: 'Provider queue', content: <ToastProviderExample /> },
    ],
    props: [
        { name: 'title', type: `ReactNode`, defaultValue: '-', description: 'Toast title' },
        {
            name: 'description',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Optional secondary text.',
        },
        {
            name: 'tone',
            type: `'neutral' | 'success' | 'danger'`,
            defaultValue: "'neutral'",
            description: 'Visual tone of the toast',
        },
        {
            name: 'onClose',
            type: `() => void`,
            defaultValue: '-',
            description:
                'Close button callback. Queued toasts also accept duration via pushToast (default 3600ms, Infinity stays).',
        },
    ],
    cssHooks: [
        '.mr-toast',
        '.mr-toast__body',
        '.mr-toast__header',
        '.mr-toast__heading',
        '.mr-toast__title',
        '.mr-toast__description',
        '.mr-toast__close',
        '.mr-toast-viewport',
    ],
    tokens: [
        '--mr-bg-raised',
        '--mr-border-subtle',
        '--mr-shadow-sm',
        '--mr-radius-md',
        '--mr-success',
        '--mr-danger',
    ],
    a11y: [
        'Neutral and success toasts use role="status" with polite announcements.',
        'Danger toasts use role="alert" with assertive announcements.',
        'Dismiss buttons expose an explicit aria-label.',
        'Queued toasts auto-dismiss after duration (default 3600ms); duration Infinity stays until dismissed.',
    ],
}

export function ToastDocs() {
    return <DocPage doc={docData} />
}
