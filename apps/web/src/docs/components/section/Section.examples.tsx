import { Section } from '@monority/ui'

export function SectionBasicExample() {
  return (
    <>
      <Section>Example</Section>
    </>
  )
}

export function SectionSpacingExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      <Section spacing="sm" style={{ background: 'var(--mr-bg-control)' }}>
        <h3>Small spacing</h3>
        <p>Minimal vertical spacing.</p>
      </Section>
      <Section spacing="md" style={{ background: 'var(--mr-bg-surface-strong)' }}>
        <h3>Medium spacing</h3>
        <p>Default vertical spacing.</p>
      </Section>
      <Section spacing="lg" style={{ background: 'var(--mr-bg-control)' }}>
        <h3>Large spacing</h3>
        <p>Generous vertical spacing.</p>
      </Section>
    </div>
  )
}
