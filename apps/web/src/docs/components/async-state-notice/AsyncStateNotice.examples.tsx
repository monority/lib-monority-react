import { useState } from 'react'
import { AsyncStateNotice } from '@monority/ui/async-state-notice'
import { Button } from '@monority/ui/button'

export function AsyncStateNoticeBasicPreview() {
    return <AsyncStateNotice isLoading />
}

export function AsyncStateNoticeErrorExample() {
    return <AsyncStateNotice isError errorMessage="Unable to load the analytics snapshot." />
}

export function AsyncStateNoticeCustomMessageExample() {
    return <AsyncStateNotice isLoading loadingMessage="Fetching user profile..." />
}

export function AsyncStateNoticeToggleExample() {
    const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle')
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button size="sm" onClick={() => setState('loading')}>
                    Load
                </Button>
                <Button size="sm" variant="danger" onClick={() => setState('error')}>
                    Error
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setState('idle')}>
                    Reset
                </Button>
            </div>
            {state === 'loading' && <AsyncStateNotice isLoading />}
            {state === 'error' && (
                <AsyncStateNotice
                    isError
                    errorMessage="The sync request timed out. Try again in a moment."
                />
            )}
        </div>
    )
}
