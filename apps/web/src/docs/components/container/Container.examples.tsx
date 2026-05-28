import { Container } from '@monority/ui'

export function ContainerBasicExample() {
  return (
    <>
      <Container>Example</Container>
    </>
  )
}

export function ContainerSizesExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Container size="sm" style={{ background: 'var(--mr-bg-control)', padding: '0.5rem' }}>Small (sm)</Container>
      <Container size="md" style={{ background: 'var(--mr-bg-control)', padding: '0.5rem' }}>Medium (md)</Container>
      <Container size="lg" style={{ background: 'var(--mr-bg-control)', padding: '0.5rem' }}>Large (lg)</Container>
      <Container size="xl" style={{ background: 'var(--mr-bg-control)', padding: '0.5rem' }}>Extra large (xl)</Container>
    </div>
  )
}
