import { ToastProvider, useToast } from '@monority/ui'
import { Button } from '@monority/ui/button'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const defaults: PlaygroundProps = {
    title: 'Release draft saved',
    description: 'Your docs changes are ready for review.',
    tone: 'neutral',
    duration: 3600,
}

function quote(value: unknown): string {
    return JSON.stringify(String(value ?? ''))
}

function codeFor(props: PlaygroundProps): string {
    const lines: string[] = []
    if (props.title) lines.push(`    title: ${quote(props.title)},`)
    if (props.description) lines.push(`    description: ${quote(props.description)},`)
    if (props.tone !== 'neutral') lines.push(`    tone: ${quote(props.tone)},`)
    if (props.duration !== 3600) lines.push(`    duration: ${Number(props.duration)},`)
    return `const { pushToast } = useToast()

pushToast({
${lines.join('\n')}
})`
}

function ToastLauncher(props: PlaygroundProps) {
    const { pushToast } = useToast()
    return (
        <div style={{ display: 'grid', gap: '0.75rem', justifyItems: 'start' }}>
            <Button
                onClick={() =>
                    pushToast({
                        title: String(props.title ?? '') || undefined,
                        description: String(props.description ?? '') || undefined,
                        tone: props.tone as 'neutral' | 'success' | 'danger',
                        duration: Number(props.duration ?? 3600),
                    })
                }
            >
                Show toast
            </Button>
            <p className="sc-muted" style={{ margin: 0, fontSize: '0.8125rem' }}>
                Toasts auto-dismiss after the duration. Open several to test the queue, or set
                duration to Infinity for a sticky toast.
            </p>
        </div>
    )
}

function ToastPreview(props: PlaygroundProps) {
    // Isolated queue so the generic registry test (no app providers) still renders.
    return (
        <ToastProvider>
            <ToastLauncher {...props} />
        </ToastProvider>
    )
}

export const toastPlayground: PlaygroundDefinition = {
    slug: 'toast',
    label: 'Toast',
    docsPath: '/docs/toast',
    importStatement:
        "import { ToastProvider, useToast } from '@monority/ui'\nimport { Button } from '@monority/ui/button'",
    controls: [
        { name: 'title', type: 'text', placeholder: 'Release draft saved' },
        { name: 'description', type: 'text', placeholder: 'Your docs changes are ready.' },
        { name: 'tone', type: 'select', options: ['neutral', 'success', 'danger'] },
        { name: 'duration', type: 'number', label: 'duration (ms)', min: 0 },
    ],
    defaultProps: defaults,
    render: (props) => <ToastPreview {...props} />,
    generateCode: codeFor,
}
