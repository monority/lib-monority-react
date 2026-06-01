import { Section } from './Section'
import { Text } from '../../typography/text/Text'
import { Stack } from '../stack/Stack'

export function SectionBasicExample() {
  return (
    <Section>
      <Text>Basic section with default spacing.</Text>
    </Section>
  )
}

export function SectionSpacingExample() {
  return (
    <Stack gap="md">
      <Section spacing="sm"><Text>Small spacing</Text></Section>
      <Section spacing="md"><Text>Medium spacing (default)</Text></Section>
      <Section spacing="lg"><Text>Large spacing</Text></Section>
      <Section spacing="xl"><Text>Extra large spacing</Text></Section>
    </Stack>
  )
}

export function SectionVariantExample() {
  return (
    <Stack gap="md">
      <Section variant="bordered"><Text>Bordered section</Text></Section>
      <Section variant="muted"><Text>Muted background</Text></Section>
      <Section variant="card"><Text>Card style</Text></Section>
    </Stack>
  )
}

export function SectionTitleExample() {
  return (
    <Section title="Features" variant="card">
      <Text>Section with a title rendered as h2.</Text>
    </Section>
  )
}
