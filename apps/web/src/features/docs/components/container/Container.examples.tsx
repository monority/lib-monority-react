import { Container } from '@monority/ui/container'
import { Text } from '@monority/ui/text'

export function ContainerBasicExample() {
    return (
        <Container data-surface="true">
            <Text.Strong>Content rail</Text.Strong>
            <Text tone="muted" style={{ margin: '0.5rem 0 0' }}>
                The container centers content, controls line length, and can opt into a framed
                surface.
            </Text>
        </Container>
    )
}

export function ContainerSizesExample() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Container size="sm" data-surface="true">
                Small content rail
            </Container>
            <Container size="md" data-surface="true">
                Medium content rail
            </Container>
            <Container size="lg" data-surface="true">
                Large content rail
            </Container>
            <Container size="xl" data-surface="true">
                Extra large content rail
            </Container>
        </div>
    )
}
