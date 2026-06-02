import { Text, Title } from '@monority/ui'

export function TitleBasicExample() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Title as="h1" size="display">
                Release readiness
            </Title>
            <Title as="h2" size="lg">
                Review queue
            </Title>
            <Text as="p" tone="base" size="md">
                Use titles to give product sections a clear hierarchy without changing semantic
                heading order.
            </Text>
            <Title as="h3" size="md">
                Pending approvals
            </Title>
            <Text as="p" tone="muted" size="sm">
                Pair a compact heading with muted supporting text when the surrounding UI already
                provides context.
            </Text>
        </div>
    )
}

export function TitleSizesExample() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Title as="h1" size="display">
                Workspace settings
            </Title>
            <Title as="h2" size="lg">
                Billing overview
            </Title>
            <Title as="h3" size="md">
                Team access
            </Title>
            <Title as="h4" size="sm">
                Invite permissions
            </Title>
        </div>
    )
}

export function TitleLevelsExample() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Title as="h1">H1 document title</Title>
            <Title as="h2">H2 page section</Title>
            <Title as="h3">H3 settings group</Title>
            <Title as="h4">H4 card title</Title>
            <Title as="h5">H5 field group</Title>
            <Title as="h6">H6 detail label</Title>
        </div>
    )
}
