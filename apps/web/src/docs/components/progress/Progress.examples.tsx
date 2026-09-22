import { Progress } from '@monority/ui/progress'
import { useEffect, useState } from 'react'

export function ProgressBasicExample() {
    return <Progress value={68} label="Release migration" />
}

export function ProgressValuesExample() {
    return (
        <div style={{ display: 'grid', gap: '1rem' }}>
            <Progress value={0} label="Planning" />
            <Progress value={28} label="Shell alignment" />
            <Progress value={74} label="Docs rewrite" />
            <Progress value={100} label="Component pass complete" tone="success" />
        </div>
    )
}

export function ProgressTonesExample() {
    return (
        <div style={{ display: 'grid', gap: '1rem' }}>
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

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setValue(100)
            return
        }
        const interval = setInterval(() => {
            setValue((current) => Math.min(current + 5, 100))
        }, 200)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (value >= 100) {
            const id = setTimeout(() => setValue(0), 1200)
            return () => clearTimeout(id)
        }
    }, [value])

    return <Progress value={value} label="Packaging release" />
}
