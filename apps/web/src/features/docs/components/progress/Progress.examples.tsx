import { Progress } from '@monority/ui/progress'
import { useEffect, useRef, useState } from 'react'

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
    const [value, setValue] = useState(0)
    const directionRef = useRef(1)

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setValue(100)
            return
        }

        const interval = window.setInterval(() => {
            setValue((current) => {
                const next = Math.min(100, Math.max(0, current + 5 * directionRef.current))
                if (next >= 100) directionRef.current = -1
                else if (next <= 0) directionRef.current = 1
                return next
            })
        }, 200)
        return () => window.clearInterval(interval)
    }, [])

    return <Progress value={value} label="Packaging release" />
}
