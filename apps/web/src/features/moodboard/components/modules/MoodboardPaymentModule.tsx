import { useState } from 'react'
import { Badge, Button, Card, Stack, Switch, Text, Title } from '@monority/ui'

export function MoodboardPaymentModule() {
    const [autoRenew, setAutoRenew] = useState(true)

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
                            Payment & Subscription
                        </Title>
                        <Text tone="muted" size="sm">
                            Manage billing card, invoice receipt, and plan tier
                        </Text>
                    </div>
                    <Badge variant="primary" size="sm">
                        Pro Tier
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
                    {/* Visual credit card strip */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 'var(--mr-space-3)',
                            borderRadius: 'var(--mr-radius-md)',
                            border: '1px solid var(--mr-border-subtle)',
                            background: 'var(--mr-bg-sunken)',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--mr-space-3)',
                            }}
                        >
                            <div
                                style={{
                                    width: 38,
                                    height: 26,
                                    borderRadius: 'var(--mr-radius-sm)',
                                    background: 'var(--mr-accent-solid)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--mr-bg-canvas)',
                                    fontFamily: 'var(--mr-font-family-mono)',
                                    fontWeight: 700,
                                    fontSize: '0.625rem',
                                    letterSpacing: '0.05em',
                                }}
                            >
                                VISA
                            </div>
                            <div>
                                <Text
                                    size="sm"
                                    style={{
                                        fontWeight: 600,
                                        fontFamily: 'var(--mr-font-family-mono)',
                                    }}
                                >
                                    •••• •••• •••• 4242
                                </Text>
                                <Text tone="muted" size="sm" style={{ fontSize: '0.75rem' }}>
                                    Expires 08/28 · Default
                                </Text>
                            </div>
                        </div>
                        <Badge variant="success" size="sm">
                            Verified
                        </Badge>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 'var(--mr-space-1) 0',
                        }}
                    >
                        <div>
                            <Text size="sm" style={{ fontWeight: 600, display: 'block' }}>
                                Next billing: $49.00
                            </Text>
                            <Text
                                tone="muted"
                                size="sm"
                                style={{ fontSize: '0.75rem', display: 'block' }}
                            >
                                Renews automatically on Nov 1, 2026
                            </Text>
                        </div>
                        <Switch
                            id="moodboard-autorenew"
                            label="Auto-renew"
                            checked={autoRenew}
                            onChange={(e) => setAutoRenew(e.target.checked)}
                            tone="accent"
                            size="sm"
                        />
                    </div>
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
                            Update Card
                        </Button>
                        <Button variant="ghost" size="sm">
                            Invoices
                        </Button>
                    </div>
                    <Text tone="muted" size="sm" style={{ fontSize: '0.75rem' }}>
                        256-bit SSL encrypted
                    </Text>
                </div>
            </Card.Content>
        </Card>
    )
}
