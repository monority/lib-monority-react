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
    Toolbar,
} from '@monority/ui'
import { useState } from 'react'

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
                <div>
                    <Card.Title>Deployment Trigger</Card.Title>
                    <Card.Description>
                        Configure target environment and rollout criteria
                    </Card.Description>
                </div>
                <Badge variant="default" size="sm">
                    Ready
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
                    <Grid columns={2} gap="md">
                        <Input
                            id="moodboard-workspace"
                            label="Workspace"
                            value={workspace}
                            onChange={(e) => setWorkspace(e.target.value)}
                            size="sm"
                            clearable
                        />
                        <Select
                            id="moodboard-region"
                            label="Region"
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            size="sm"
                            loading={isTriggering}
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

                    <Grid columns={2} gap="md">
                        <Checkbox
                            id="moodboard-signed"
                            label="Signed builds only"
                            checked={signedOnly}
                            onChange={(e) => setSignedOnly(e.target.checked)}
                            tone="accent"
                            size="sm"
                        />
                        <Switch
                            id="moodboard-notifications"
                            label="Notifications"
                            checked={notifications}
                            onChange={(e) => setNotifications(e.target.checked)}
                            tone="accent"
                            size="sm"
                        />
                    </Grid>
                </Stack>
            </Card.Content>

            <Card.Footer>
                <Toolbar>
                    <Button
                        variant="primary"
                        size="sm"
                        loading={isTriggering}
                        onClick={handleTrigger}
                    >
                        Rollout Canary
                    </Button>
                    <Button variant="ghost" size="sm">
                        Validate Spec
                    </Button>
                </Toolbar>
                {lastTriggered ? (
                    <Text tone="muted" size="sm">
                        Queued at {lastTriggered}
                    </Text>
                ) : (
                    <Text tone="muted" size="sm">
                        Automated checks passing
                    </Text>
                )}
            </Card.Footer>
        </Card>
    )
}
