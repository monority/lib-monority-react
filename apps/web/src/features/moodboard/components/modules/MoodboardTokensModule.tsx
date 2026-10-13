import { useState } from 'react'
import {
    Badge,
    Button,
    Card,
    ColorSwatch,
    Field,
    Grid,
    InputOTP,
    Stack,
    Text,
    Toolbar,
} from '@monority/ui'

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
                <div>
                    <Card.Title>Design Tokens & Primitives</Card.Title>
                    <Card.Description>
                        Direct validation of active theme tokens, buttons and variants
                    </Card.Description>
                </div>
                <Badge variant="primary" size="sm">
                    Dynamic
                </Badge>
            </Card.Header>

            <Card.Content
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 'var(--mr-space-4)',
                }}
            >
                <Stack gap="md">
                    {/* Action button variants */}
                    <Toolbar>
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
                    </Toolbar>

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
                    <Grid columns={2} gap="md">
                        <Field label="2FA Authentication Code" hint="6-digit TOTP token">
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
                        </Field>

                        <Field label="Active Theme Swatches" hint="Resolved CSS variables">
                            <div
                                style={{
                                    display: 'flex',
                                    gap: 'var(--mr-space-2)',
                                    flexWrap: 'wrap',
                                    paddingTop: 'var(--mr-space-1)',
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
                        </Field>
                    </Grid>
                </Stack>
            </Card.Content>

            <Card.Footer>
                <Toolbar>
                    <Button variant="secondary" size="sm">
                        Inspect Tokens
                    </Button>
                    <Button variant="ghost" size="sm">
                        Copy Tokens
                    </Button>
                </Toolbar>
                <Text tone="muted" size="sm">
                    CSS variables synced
                </Text>
            </Card.Footer>
        </Card>
    )
}
