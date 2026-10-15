import { Section } from '@monority/ui/section'
import { Stack } from '@monority/ui/stack'
import { Text } from '@monority/ui/text'
import { Title } from '@monority/ui/title'

export function SectionBasicExample() {
    return (
        <Section title="Account activity" variant="card">
            <Text.Muted>
                Sections group related content with a stable title, spacing rhythm, and optional
                surface treatment.
            </Text.Muted>
        </Section>
    )
}

export function SectionCompoundExample() {
    return (
        <Section variant="card" spacing="lg">
            <Section.Header>
                <Section.Title as="h2">Architecture overview</Section.Title>
                <Section.Description>
                    Explore how layers, tokens, and components compose predictably across
                    applications.
                </Section.Description>
            </Section.Header>
            <Section.Content>
                <Text>
                    Sections provide clear boundary rhythm, semantic heading hierarchy, and
                    consistent surface treatments.
                </Text>
            </Section.Content>
        </Section>
    )
}

export function SectionSpacingExample() {
    return (
        <Stack gap="xs">
            <Section spacing="sm" variant="bordered">
                <Title as="h3" size="sm">
                    Small spacing
                </Title>
                <Text.Muted>Minimal vertical spacing.</Text.Muted>
            </Section>
            <Section spacing="md" variant="muted">
                <Title as="h3" size="sm">
                    Medium spacing
                </Title>
                <Text.Muted>Default vertical spacing.</Text.Muted>
            </Section>
            <Section spacing="lg" variant="card">
                <Title as="h3" size="sm">
                    Large spacing
                </Title>
                <Text.Muted>Generous vertical spacing.</Text.Muted>
            </Section>
        </Stack>
    )
}
