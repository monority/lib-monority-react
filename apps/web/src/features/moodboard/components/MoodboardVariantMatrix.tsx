import { Badge, Button, Card, Stack, Text } from '@monority/ui'

const buttonVariants = ['primary', 'secondary', 'ghost', 'danger'] as const
const badgeVariants = ['default', 'primary', 'success', 'warning', 'danger'] as const
const buttonSizes = ['sm', 'md', 'lg'] as const

export function MoodboardVariantMatrix() {
    return (
        <Card padding="md">
            <Card.Header>
                <Text size="sm" tone="muted">
                    BUTTON VARIANTS
                </Text>
            </Card.Header>
            <Card.Content>
                <Stack gap="md">
                    <Stack
                        direction="horizontal"
                        gap="xs"
                        align="center"
                        style={{ flexWrap: 'wrap' }}
                    >
                        {buttonVariants.map((variant) => (
                            <Button key={variant} variant={variant} size="sm">
                                {variant}
                            </Button>
                        ))}
                        <Button size="sm" disabled>
                            disabled
                        </Button>
                        <Button size="sm" loading>
                            loading
                        </Button>
                    </Stack>

                    <Text size="sm" tone="muted">
                        BADGE VARIANTS
                    </Text>
                    <Stack
                        direction="horizontal"
                        gap="xs"
                        align="center"
                        style={{ flexWrap: 'wrap' }}
                    >
                        {badgeVariants.map((variant) => (
                            <Badge key={variant} variant={variant}>
                                {variant}
                            </Badge>
                        ))}
                    </Stack>

                    <Text size="sm" tone="muted">
                        SIZE LADDER
                    </Text>
                    <Stack
                        direction="horizontal"
                        gap="xs"
                        align="center"
                        style={{ flexWrap: 'wrap' }}
                    >
                        {buttonSizes.map((size) => (
                            <Button key={size} size={size}>
                                Button {size}
                            </Button>
                        ))}
                    </Stack>
                </Stack>
            </Card.Content>
        </Card>
    )
}
