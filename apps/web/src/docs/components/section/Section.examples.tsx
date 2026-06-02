import { Section } from '@monority/ui/section'

export function SectionBasicExample() {
    return (
        <Section title="Account activity" variant="card">
            <p style={{ margin: 0, color: 'var(--mr-fg-muted)' }}>
                Sections group related content with a stable title, spacing rhythm, and optional
                surface treatment.
            </p>
        </Section>
    )
}

export function SectionSpacingExample() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            <Section spacing="sm" variant="bordered">
                <h3>Small spacing</h3>
                <p>Minimal vertical spacing.</p>
            </Section>
            <Section spacing="md" variant="muted">
                <h3>Medium spacing</h3>
                <p>Default vertical spacing.</p>
            </Section>
            <Section spacing="lg" variant="card">
                <h3>Large spacing</h3>
                <p>Generous vertical spacing.</p>
            </Section>
        </div>
    )
}
