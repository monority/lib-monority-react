import { Button } from '@monority/ui/button'
import { Progress } from '@monority/ui/progress'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocale } from '../../../../shared/i18n'

export function ProgressBasicExample() {
    return <Progress value={68} label="Release migration" />
}

export function ProgressValuesExample() {
    return (
        <div style={{ display: 'grid', gap: 'var(--mr-space-5)' }}>
            <Progress value={0} label="Planning" />
            <Progress value={28} label="Shell alignment" />
            <Progress value={74} label="Docs rewrite" />
            <Progress value={100} label="Component pass complete" tone="success" />
        </div>
    )
}

export function ProgressTonesExample() {
    return (
        <div style={{ display: 'grid', gap: 'var(--mr-space-5)' }}>
            <Progress value={46} tone="neutral" label="Queued" />
            <Progress value={82} tone="success" label="Synced" />
            <Progress value={58} tone="warning" label="Needs review" />
            <Progress value={21} tone="danger" label="Blocked" />
        </div>
    )
}

export function ProgressWithoutValueExample() {
    return <Progress value={65} showValue={false} label="Upload progress" />
}

export function ProgressIndeterminateExample() {
    return <Progress mode="indeterminate" label="Rebuilding documentation bundle" />
}

export function ProgressAnimatedExample() {
    const [value, setValue] = useState(() =>
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 100
            : 0
    )

    useEffect(() => {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)')
        if (media.matches) {
            setValue(100)
            return
        }
        const interval = window.setInterval(() => {
            setValue((current) => Math.min(current + 5, 100))
        }, 200)
        return () => window.clearInterval(interval)
    }, [])

    useEffect(() => {
        if (
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            return
        }
        if (value >= 100) {
            const id = window.setTimeout(() => setValue(0), 1200)
            return () => window.clearTimeout(id)
        }
    }, [value])

    return <Progress value={value} label="Packaging release" />
}

export function ProgressStripedExample() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'
    return (
        <div style={{ display: 'grid', gap: 'var(--mr-space-4)' }}>
            <Progress
                value={65}
                striped
                label={isFr ? 'Stries statiques (striped)' : 'Static stripes (striped)'}
            />
            <Progress
                value={85}
                striped
                animated
                tone="accent"
                label={
                    isFr
                        ? 'Stries animées en flux continu (striped + animated)'
                        : 'Animated continuous stripes (striped + animated)'
                }
            />
        </div>
    )
}

export function ProgressRealisticServerExample() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'
    const [status, setStatus] = useState<'idle' | 'running' | 'done'>('idle')
    const [progress, setProgress] = useState(0)
    const timersRef = useRef<number[]>([])

    const clearTimers = useCallback(() => {
        for (const id of timersRef.current) {
            window.clearTimeout(id)
        }
        timersRef.current = []
    }, [])

    const startRealisticOperation = () => {
        clearTimers()
        setStatus('running')

        // 1. Instant start at 20% to acknowledge user interaction
        setProgress(20)

        // 2. Fast ramp up
        const t1 = window.setTimeout(() => setProgress(45), 250)
        const t2 = window.setTimeout(() => setProgress(72), 550)
        const t3 = window.setTimeout(() => setProgress(84), 900)

        // 3. Plateau around 85-88% while waiting for server response
        const t4 = window.setTimeout(() => setProgress(86), 1400)
        const t5 = window.setTimeout(() => setProgress(88), 1900)

        // 4. Final jump from 88% to 100% when server responds
        const t6 = window.setTimeout(() => {
            setProgress(100)
            setStatus('done')
        }, 2600)

        timersRef.current = [t1, t2, t3, t4, t5, t6]
    }

    const reset = () => {
        clearTimers()
        setStatus('idle')
        setProgress(0)
    }

    useEffect(() => {
        return () => clearTimers()
    }, [clearTimers])

    const getLabel = () => {
        if (status === 'idle') return isFr ? 'Prêt pour déploiement' : 'Ready for deployment'
        if (status === 'running')
            return isFr
                ? 'Synchronisation des conteneurs en cours...'
                : 'Container synchronization in progress...'
        return isFr ? 'Déploiement achevé avec succès' : 'Deployment completed successfully'
    }

    return (
        <div style={{ display: 'grid', gap: 'var(--mr-space-4)' }}>
            <Progress
                value={progress}
                label={getLabel()}
                tone={status === 'done' ? 'success' : 'accent'}
                striped={status === 'running'}
                animated={status === 'running'}
            />
            <div style={{ display: 'flex', gap: 'var(--mr-space-2)', alignItems: 'center' }}>
                <Button
                    onClick={startRealisticOperation}
                    disabled={status === 'running'}
                    variant="primary"
                    size="sm"
                >
                    {status === 'running'
                        ? isFr
                            ? 'Opération en cours...'
                            : 'Operation in progress...'
                        : isFr
                          ? 'Lancer déploiement réaliste'
                          : 'Run realistic deployment'}
                </Button>
                {status !== 'idle' && (
                    <Button
                        onClick={reset}
                        disabled={status === 'running'}
                        variant="ghost"
                        size="sm"
                    >
                        {isFr ? 'Réinitialiser' : 'Reset'}
                    </Button>
                )}
            </div>
        </div>
    )
}
