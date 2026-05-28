import { Title } from '@monority/ui'

export function TitleBasicExample() {
  return (
    <>
      <Title>Example</Title>
    </>
  )
}

export function TitleSizesExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Title as="h1" size="display">Display Title</Title>
      <Title as="h2" size="lg">Large Heading</Title>
      <Title as="h3" size="md">Medium Heading</Title>
      <Title as="h4" size="sm">Small Heading</Title>
    </div>
  )
}

export function TitleLevelsExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Title as="h1">H1 - Page title</Title>
      <Title as="h2">H2 - Section title</Title>
      <Title as="h3">H3 - Subsection title</Title>
      <Title as="h4">H4 - Card title</Title>
    </div>
  )
}
