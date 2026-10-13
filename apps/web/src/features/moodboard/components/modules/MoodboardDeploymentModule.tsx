import { useState } from 'react'
import {
    Badge,
    Button,
    Card,
    Checkbox,
    Grid,
    Input,
    Select,
    Stack,
    Switch,
    Text,
    Textarea,
    Title,
} from '@monority/ui'

export function MoodboardDeploymentModule() {
    const [workspace, setWorkspace] = useState('monority-prod')
    const [region, setRegion] = useState('eu-west-1')
    const [notes, setNotes] = useState('Production rollout with calm tokens')
    const [signedOnly, setSignedOnly] = useState(true)
    const [notifications, setNotifications] = useState(true)
    const [isTriggering, setIsTriggering] = useState(false)
    const [lastTriggered, setLastTriggered] = useState<string | null>(null)

    const handleTrigger = () => {
        setIsTriggering(true)
        setTimeout(() => {
            setIsTriggering(false)
            setLastTriggered(new Date().toLocaleTimeString('en-US', { hour12: false }))
        }, 700)
    }

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
                            Deployment Trigger
                        </Title>
                        <Text tone="muted" size="sm">
                            Configure target environment and rollout criteria
                        </Text>
                    </div>
                    <Badge variant="default" size="sm">
                        Ready
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
                    <Grid columns={2}>
                        <Input
                            id="moodboard-workspace"
                            label="Workspace"
                            value={workspace}
                            onChange={(e) => setWorkspace(e.target.value)}
                            size="sm"
                        />
                        <Select
                            id="moodboard-region"
                            label="Region"
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            size="sm"
                        >
                            <option value="eu-west-1">EU West (Ireland)</option>
                            <option value="us-east-1">US East (Virginia)</option>
                            <option value="ap-south-1">AP South (Mumbai)</option>
                        </Select>
                    </Grid>

                    <Textarea
                        id="moodboard-notes"
                        label="Release notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={2}
                        size="sm"
                    />

                    <Grid columns={2}>
                        <Checkbox
                            id="moodboard-signed"
                            label="Signed builds only"
                            checked={signedOnly}
                            onChange={(e) => setSignedOnly(e.target.checked)}
                            size="sm"
                        />
                        <Switch
                            id="moodboard-notifications"
                            label="Notifications"
                            checked={notifications}
                            onChange={(e) => setNotifications(e.target.checked)}
                            size="sm"
                        />
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
                        <Button
                            variant="secondary"
                            size="sm"
                            loading={isTriggering}
                            onClick={handleTrigger}
                        >
                            Rollout Canary
                        </Button>
                        <Button variant="ghost" size="sm">
                            Validate Spec
                        </Button>
                    </div>
                    {lastTriggered && (
                        <Text tone="muted" size="sm" style={{ fontSize: '0.75rem' }}>
                            Queued at {lastTriggered}
                        </Text>
                    )}
                </div>
            </Card.Content>
        </Card>
    )
}
