import {
    Badge,
    Button,
    Card,
    ColorSwatch,
    Grid,
    SegmentedControl,
    Stack,
    Text,
    Title,
} from '@monority/ui'

const buttonVariants = ['primary', 'secondary', 'ghost', 'danger'] as const
const badgeVariants = ['default', 'primary', 'success', 'warning', 'danger'] as const
const buttonSizes = ['sm', 'md', 'lg'] as const

const surfaceSwatches = [
    { color: 'var(--mr-bg-canvas)', label: 'Canvas' },
    { color: 'var(--mr-bg-surface)', label: 'Surface' },
    { color: 'var(--mr-bg-sunken)', label: 'Sunken' },
    { color: 'var(--mr-border-subtle)', label: 'Border' },
]

const accentSwatches = [
    { color: 'var(--mr-accent-solid)', label: 'Accent' },
    { color: 'var(--mr-success-text)', label: 'Success' },
    { color: 'var(--mr-warning-text)', label: 'Warning' },
    { color: 'var(--mr-danger-text)', label: 'Danger' },
]

export function MoodboardTokensView() {
    return (
        <Card padding="md">
            <Card.Header>
                <Title as="h3" size="sm">
                    Design Tokens & Primitives
                </Title>
                <Text tone="muted" size="sm">
                    Observe how design tokens propagate across atomic components and state variants
                </Text>
            </Card.Header>
            <Card.Content>
                <Stack gap="lg">
                    {/* Swatches Row */}
                    <div>
                        <Text
                            tone="muted"
                            size="sm"
                            style={{
                                fontWeight: 600,
                                letterSpacing: '0.04em',
                                textTransform: 'uppercase',
                                fontSize: '0.6875rem',
                                marginBottom: 'var(--mr-space-2)',
                                display: 'block',
                            }}
                        >
                            Active Palette Tokens
                        </Text>
                        <Grid columns={2}>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: 'var(--mr-space-3)',
                                    flexWrap: 'wrap',
                                }}
                            >
                                {surfaceSwatches.map((s) => (
                                    <ColorSwatch
                                        key={s.label}
                                        value={s.color}
                                        label={s.label}
                                        size="md"
                                    />
                                ))}
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: 'var(--mr-space-3)',
                                    flexWrap: 'wrap',
                                }}
                            >
                                {accentSwatches.map((s) => (
                                    <ColorSwatch
                                        key={s.label}
                                        value={s.color}
                                        label={s.label}
                                        size="md"
                                    />
                                ))}
                            </div>
                        </Grid>
                    </div>

                    {/* Component Variants */}
                    <div>
                        <Text
                            tone="muted"
                            size="sm"
                            style={{
                                fontWeight: 600,
                                letterSpacing: '0.04em',
                                textTransform: 'uppercase',
                                fontSize: '0.6875rem',
                                marginBottom: 'var(--mr-space-2)',
                                display: 'block',
                            }}
                        >
                            Actions & Badges
                        </Text>
                        <Stack gap="md">
                            <div
                                style={{
                                    display: 'flex',
                                    gap: 'var(--mr-space-2)',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                }}
                            >
                                {buttonVariants.map((variant) => (
                                    <Button key={variant} variant={variant} size="sm">
                                        {variant}
                                    </Button>
                                ))}
                                <Button size="sm" loading>
                                    loading
                                </Button>
                                <Button size="sm" disabled>
                                    disabled
                                </Button>
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    gap: 'var(--mr-space-2)',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                }}
                            >
                                {badgeVariants.map((variant) => (
                                    <Badge key={variant} variant={variant}>
                                        {variant}
                                    </Badge>
                                ))}
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    gap: 'var(--mr-space-3)',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                }}
                            >
                                {buttonSizes.map((size) => (
                                    <Button key={size} size={size} variant="secondary">
                                        Size {size}
                                    </Button>
                                ))}
                                <SegmentedControl
                                    size="sm"
                                    defaultValue="standard"
                                    options={[
                                        { value: 'compact', label: 'Compact' },
                                        { value: 'standard', label: 'Standard' },
                                        { value: 'expanded', label: 'Expanded' },
                                    ]}
                                />
                            </div>
                        </Stack>
                    </div>
                </Stack>
            </Card.Content>
        </Card>
    )
}
