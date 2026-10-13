import { useState } from 'react'
import { Badge, Button, Card, ColorSwatch, Grid, InputOTP, Stack, Text, Title } from '@monority/ui'

const surfaceSwatches = [
    { color: 'var(--mr-bg-canvas)', label: 'Canvas' },
    { color: 'var(--mr-bg-surface)', label: 'Surface' },
    { color: 'var(--mr-accent-solid)', label: 'Accent' },
    { color: 'var(--mr-border-default)', label: 'Border' },
]

export function MoodboardTokensModule() {
    const [otpValue, setOtpValue] = useState('582194')

    return (
        <Card padding="md" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Card.Header>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                    }}
                >
                    <div>
                        <Title as="h3" size="sm">
                            Design Tokens & Primitives
                        </Title>
                        <Text tone="muted" size="sm">
                            Direct validation of active theme tokens, buttons and variants
                        </Text>
                    </div>
                    <Badge variant="primary" size="sm">
                        Dynamic
                    </Badge>
                </div>
            </Card.Header>

            <Card.Content
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 'var(--mr-space-3)',
                }}
            >
                <Stack gap="sm">
                    {/* Action button variants */}
                    <div
                        style={{
                            display: 'flex',
                            gap: 'var(--mr-space-2)',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                        }}
                    >
                        <Button variant="primary" size="sm">
                            primary
                        </Button>
                        <Button variant="danger" size="sm">
                            danger
                        </Button>
                        <Button size="sm" loading>
                            loading
                        </Button>
                        <Button variant="ghost" size="sm">
                            ghost
                        </Button>
                    </div>

                    {/* Badge variants */}
                    <div
                        style={{
                            display: 'flex',
                            gap: 'var(--mr-space-2)',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                        }}
                    >
                        <Badge variant="success">success</Badge>
                        <Badge variant="warning">warning</Badge>
                        <Badge variant="primary">primary</Badge>
                        <Badge variant="default">default</Badge>
                    </div>

                    {/* 2FA OTP & Color Swatches */}
                    <Grid columns={2}>
                        <div>
                            <Text
                                size="sm"
                                tone="muted"
                                style={{
                                    fontWeight: 600,
                                    fontSize: '0.6875rem',
                                    display: 'block',
                                    marginBottom: 'var(--mr-space-1)',
                                }}
                            >
                                2FA CODE
                            </Text>
                            <InputOTP value={otpValue} onChange={setOtpValue} maxLength={6}>
                                <InputOTP.Group>
                                    <InputOTP.Slot index={0} />
                                    <InputOTP.Slot index={1} />
                                    <InputOTP.Slot index={2} />
                                </InputOTP.Group>
                                <InputOTP.Separator />
                                <InputOTP.Group>
                                    <InputOTP.Slot index={3} />
                                    <InputOTP.Slot index={4} />
                                    <InputOTP.Slot index={5} />
                                </InputOTP.Group>
                            </InputOTP>
                        </div>

                        <div>
                            <Text
                                size="sm"
                                tone="muted"
                                style={{
                                    fontWeight: 600,
                                    fontSize: '0.6875rem',
                                    display: 'block',
                                    marginBottom: 'var(--mr-space-1)',
                                }}
                            >
                                PALETTE TOKENS
                            </Text>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: 'var(--mr-space-2)',
                                    flexWrap: 'wrap',
                                }}
                            >
                                {surfaceSwatches.map((s) => (
                                    <ColorSwatch
                                        key={s.label}
                                        value={s.color}
                                        label={s.label}
                                        size="sm"
                                    />
                                ))}
                            </div>
                        </div>
                    </Grid>
                </Stack>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 'var(--mr-space-2)',
                        paddingTop: 'var(--mr-space-2)',
                        borderTop: '1px solid var(--mr-border-subtle)',
                    }}
                >
                    <div style={{ display: 'flex', gap: 'var(--mr-space-2)' }}>
                        <Button variant="secondary" size="sm">
                            Inspect Tokens
                        </Button>
                        <Button variant="ghost" size="sm">
                            Copy Tokens
                        </Button>
                    </div>
                    <Text tone="muted" size="sm" style={{ fontSize: '0.75rem' }}>
                        CSS variables synced
                    </Text>
                </div>
            </Card.Content>
        </Card>
    )
}
