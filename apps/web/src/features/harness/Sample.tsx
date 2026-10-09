import type { ReactNode } from 'react'

export function Sample({ label, children }: { label: string; children: ReactNode }) {
    return (
        <section
            data-harness-sample
            data-testid={`sample-${label.toLowerCase().replaceAll(' ', '-')}`}
        >
            <span className="harness-sample-label">{label}</span>
            {children}
        </section>
    )
}
