import { ColorSwatch, Kbd, Stack, Text } from '@monority/ui'

export function TokenSwatchMatrix() {
    return (
        <Stack gap="md">
            <Stack gap="xs">
                <Text size="sm" tone="muted">
                    Surfaces
                </Text>
                <Stack direction="horizontal" gap="xs">
                    <ColorSwatch
                        value="var(--mr-bg-canvas)"
                        size="md"
                        title="Canvas"
                        aria-label="Canvas"
                    />
                    <ColorSwatch
                        value="var(--mr-bg-surface)"
                        size="md"
                        title="Surface"
                        aria-label="Surface"
                    />
                    <ColorSwatch
                        value="var(--mr-bg-raised)"
                        size="md"
                        title="Raised"
                        aria-label="Raised"
                    />
                    <ColorSwatch
                        value="var(--mr-bg-sunken)"
                        size="md"
                        title="Sunken"
                        aria-label="Sunken"
                    />
                </Stack>
            </Stack>

            <Stack gap="xs">
                <Text size="sm" tone="muted">
                    Accent
                </Text>
                <Stack direction="horizontal" gap="xs">
                    <ColorSwatch
                        value="var(--mr-accent)"
                        size="md"
                        title="Accent"
                        aria-label="Accent"
                    />
                    <ColorSwatch
                        value="var(--mr-accent-hover)"
                        size="md"
                        title="Accent Hover"
                        aria-label="Accent Hover"
                    />
                    <ColorSwatch
                        value="var(--mr-accent-active)"
                        size="md"
                        title="Accent Active"
                        aria-label="Accent Active"
                    />
                    <ColorSwatch
                        value="var(--mr-accent-subtle)"
                        size="md"
                        title="Accent Subtle"
                        aria-label="Accent Subtle"
                    />
                </Stack>
            </Stack>

            <Stack gap="xs">
                <Text size="sm" tone="muted">
                    Status
                </Text>
                <Stack direction="horizontal" gap="xs">
                    <ColorSwatch
                        value="var(--mr-success-text)"
                        size="md"
                        title="Success"
                        aria-label="Success"
                    />
                    <ColorSwatch
                        value="var(--mr-warning-text)"
                        size="md"
                        title="Warning"
                        aria-label="Warning"
                    />
                    <ColorSwatch
                        value="var(--mr-danger-text)"
                        size="md"
                        title="Danger"
                        aria-label="Danger"
                    />
                    <ColorSwatch
                        value="var(--mr-info-text)"
                        size="md"
                        title="Info"
                        aria-label="Info"
                    />
                </Stack>
            </Stack>

            <Stack gap="xs">
                <Text size="sm" tone="muted">
                    Charts
                </Text>
                <Stack direction="horizontal" gap="xs">
                    <ColorSwatch
                        value="var(--mr-chart-1)"
                        size="md"
                        title="Chart 1"
                        aria-label="Chart 1"
                    />
                    <ColorSwatch
                        value="var(--mr-chart-2)"
                        size="md"
                        title="Chart 2"
                        aria-label="Chart 2"
                    />
                    <ColorSwatch
                        value="var(--mr-chart-3)"
                        size="md"
                        title="Chart 3"
                        aria-label="Chart 3"
                    />
                    <ColorSwatch
                        value="var(--mr-chart-4)"
                        size="md"
                        title="Chart 4"
                        aria-label="Chart 4"
                    />
                    <ColorSwatch
                        value="var(--mr-chart-5)"
                        size="md"
                        title="Chart 5"
                        aria-label="Chart 5"
                    />
                </Stack>
            </Stack>

            <Stack gap="xs">
                <Text size="sm" tone="muted">
                    Geometry
                </Text>
                <Stack direction="horizontal" gap="xs">
                    <ColorSwatch
                        value="var(--mr-bg-sunken)"
                        shape="square"
                        size="lg"
                        title="Square"
                        aria-label="Square"
                    />
                    <ColorSwatch
                        value="var(--mr-bg-sunken)"
                        shape="rounded"
                        size="lg"
                        title="Rounded"
                        aria-label="Rounded"
                    />
                    <ColorSwatch
                        value="var(--mr-bg-sunken)"
                        shape="circle"
                        size="lg"
                        title="Circle"
                        aria-label="Circle"
                    />
                </Stack>
            </Stack>

            <Stack gap="xs">
                <Text size="sm" tone="muted">
                    Typography
                </Text>
                <Stack direction="horizontal" gap="sm" align="center">
                    <Text size="lg" tone="strong">
                        Display
                    </Text>
                    <Text size="md" tone="strong">
                        Heading
                    </Text>
                    <Text size="md">Body text</Text>
                    <Kbd>code</Kbd>
                </Stack>
            </Stack>
        </Stack>
    )
}
