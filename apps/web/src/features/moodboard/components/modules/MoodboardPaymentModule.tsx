import { useState } from 'react'
import { Badge, Button, Card, DataList, InlineAlert, Switch, Text, Toolbar } from '@monority/ui'

export function MoodboardPaymentModule() {
    const [autoRenew, setAutoRenew] = useState(true)

    const paymentDetails = [
        {
            label: 'Payment Method',
            value: 'Visa •••• 4242',
            render: () => (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--mr-space-2)',
                    }}
                >
                    <span
                        style={{
                            fontFamily: 'var(--mr-font-family-mono)',
                            fontWeight: 600,
                        }}
                    >
                        Visa •••• 4242
                    </span>
                    <Badge variant="success" size="sm">
                        Verified
                    </Badge>
                </div>
            ),
        },
        {
            label: 'Card Expiry',
            value: '08/2028',
        },
        {
            label: 'Next Billing',
            value: '$49.00 / month (renews Nov 1, 2026)',
        },
    ]

    return (
        <Card padding="md" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Card.Header>
                <div>
                    <Card.Title>Payment & Subscription</Card.Title>
                    <Card.Description>
                        Manage billing card, invoice receipt, and plan tier
                    </Card.Description>
                </div>
                <Badge variant="primary" size="sm">
                    Pro Tier
                </Badge>
            </Card.Header>

            <Card.Content
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--mr-space-4)',
                }}
            >
                <DataList items={paymentDetails} />

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <Text size="sm" style={{ fontWeight: 600, display: 'block' }}>
                            Auto-Renew Subscription
                        </Text>
                        <Text tone="muted" size="sm">
                            Automatically process upcoming billing cycle
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

                <InlineAlert tone="info" title="Payment Protection">
                    Transactions are encrypted end-to-end with TLS 1.3 security.
                </InlineAlert>
            </Card.Content>

            <Card.Footer>
                <Toolbar>
                    <Button variant="secondary" size="sm">
                        Update Card
                    </Button>
                    <Button variant="ghost" size="sm">
                        Invoices
                    </Button>
                </Toolbar>
                <Text tone="muted" size="sm">
                    256-bit SSL encrypted
                </Text>
            </Card.Footer>
        </Card>
    )
}
