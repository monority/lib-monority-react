import { Toast } from '@monority/ui/toast'
import { useToast } from '@monority/ui'
import { Button } from '@monority/ui/button'

export function ToastBasicExample() {
    return (
        <Toast
            title="Release draft saved"
            description="Your component docs changes were stored locally and are ready for review."
        />
    )
}

export function ToastProviderExample() {
    const { pushToast } = useToast()

    return (
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Button
                onClick={() =>
                    pushToast({
                        title: 'Review queued',
                        description: 'The next documentation batch is waiting for approval.',
                    })
                }
            >
                Push toast (3.6s)
            </Button>
            <Button
                variant="secondary"
                onClick={() =>
                    pushToast({
                        title: 'Deploy blocked',
                        description: 'Stays visible until dismissed.',
                        tone: 'danger',
                        duration: Infinity,
                    })
                }
            >
                Push sticky toast
            </Button>
        </div>
    )
}

export function ToastTonesExample() {
    return (
        <div style={{ display: 'grid', gap: '0.75rem' }}>
            <Toast
                title="Review queued"
                description="The next documentation batch is waiting for approval."
                tone="neutral"
            />
            <Toast
                title="Publish complete"
                description="Design tokens and docs pages were shipped successfully."
                tone="success"
            />
            <Toast
                title="Publish failed"
                description="A build error blocked the release. Check the failing page import."
                tone="danger"
            />
        </div>
    )
}
