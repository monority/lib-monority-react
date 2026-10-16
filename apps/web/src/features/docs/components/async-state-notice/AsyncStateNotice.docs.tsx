import { AsyncStateNotice } from '@monority/ui/async-state-notice'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    AsyncStateNoticeBasicPreview,
    AsyncStateNoticeCustomMessageExample,
    AsyncStateNoticeErrorExample,
    AsyncStateNoticeToggleExample,
} from './AsyncStateNotice.examples'

function AsyncStateNoticePlaygroundDemo(props: {
    stateMode: 'idle' | 'loading' | 'error'
    loadingMessage: string
    errorMessage: string
}) {
    return (
        <div style={{ width: '100%', maxWidth: '380px', margin: '0 auto' }}>
            <AsyncStateNotice
                isLoading={props.stateMode === 'loading'}
                isError={props.stateMode === 'error'}
                loadingMessage={props.loadingMessage}
                errorMessage={props.errorMessage}
            />
            {props.stateMode === 'idle' ? (
                <div
                    style={{
                        padding: 'var(--mr-space-3)',
                        fontSize: 'var(--mr-font-size-sm)',
                        color: 'var(--mr-text-secondary)',
                        textAlign: 'center',
                    }}
                >
                    Aucun processus asynchrone en cours (etat inactif).
                </div>
            ) : null}
        </div>
    )
}

const asyncStateNoticePlayground = (
    <ComponentPlayground<{
        stateMode: 'idle' | 'loading' | 'error'
        loadingMessage: string
        errorMessage: string
    }>
        componentName="AsyncStateNotice"
        importCode="import { AsyncStateNotice } from '@monority/ui/async-state-notice'"
        getCode={(p) => {
            const isLoading = p.stateMode === 'loading'
            const isError = p.stateMode === 'error'
            return `import { AsyncStateNotice } from '@monority/ui/async-state-notice'\n\n<AsyncStateNotice\n  isLoading={${isLoading}}\n  isError={${isError}}\n  loadingMessage="${p.loadingMessage}"\n  errorMessage="${p.errorMessage}"\n/>`
        }}
        controls={[
            {
                name: 'stateMode',
                type: 'select',
                label: 'Etat asynchrone',
                defaultValue: 'loading',
                options: [
                    { value: 'idle', label: 'Inactif (idle)' },
                    { value: 'loading', label: 'Chargement (loading)' },
                    { value: 'error', label: 'Erreur (error)' },
                ],
            },
            {
                name: 'loadingMessage',
                type: 'text',
                label: 'Message de chargement',
                defaultValue: 'Synchronisation des donnees...',
            },
            {
                name: 'errorMessage',
                type: 'text',
                label: 'Message d erreur',
                defaultValue: 'Echec de transmission avec l API.',
            },
        ]}
        render={(props) => <AsyncStateNoticePlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'AsyncStateNotice',
    description: 'Displays loading or error state notices for async operations.',
    importCode: "import { AsyncStateNotice } from '@monority/ui/async-state-notice'",
    usageCode: `<AsyncStateNotice isLoading={loading} isError={error} />`,
    preview: () => <AsyncStateNoticeBasicPreview />,
    playground: asyncStateNoticePlayground,
    examples: [
        { title: 'Error State', content: <AsyncStateNoticeErrorExample /> },
        { title: 'Custom Message', content: <AsyncStateNoticeCustomMessageExample /> },
        { title: 'Interactive', content: <AsyncStateNoticeToggleExample /> },
    ],
    cssHooks: ['.mr-async-state-notice', '[data-state]'],
    tokens: [
        '--mr-danger-text',
        '--mr-font-size-sm',
        '--mr-space-1',
        '--mr-space-2',
        '--mr-duration-enter',
        '--mr-ease-standard',
    ],
    a11y: [
        'aria-live="polite" for state announcements.',
        'Loading spinner is aria-hidden.',
        'Error state uses role="alert".',
    ],
    props: [
        {
            name: 'isLoading',
            type: `boolean`,
            defaultValue: '-',
            description: 'Show loading state.',
        },
        { name: 'isError', type: `boolean`, defaultValue: '-', description: 'Show error state.' },
        {
            name: 'loadingMessage',
            type: `string`,
            defaultValue: '-',
            description: 'Loading message text.',
        },
        {
            name: 'errorMessage',
            type: `string`,
            defaultValue: '-',
            description: 'Error message text.',
        },
        {
            name: 'loadingContent',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Custom loading content.',
        },
    ],
}

export function AsyncStateNoticeDocs() {
    return <DocPage doc={docData} />
}
