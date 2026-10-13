import {
    Card,
    Checkbox,
    Grid,
    Input,
    Select,
    Stack,
    Switch,
    Tabs,
    Text,
    Textarea,
    Title,
} from '@monority/ui'

export interface MoodboardControlSurfaceProps {
    tab: string
    workspace: string
    region: string
    checked: boolean
    notifications: boolean
    onTabChange: (tab: string) => void
    onWorkspaceChange: (workspace: string) => void
    onRegionChange: (region: string) => void
    onCheckedChange: (checked: boolean) => void
    onNotificationsChange: (notifications: boolean) => void
}

const tabItems = [
    { value: 'overview', label: 'Overview' },
    { value: 'activity', label: 'Activity' },
    { value: 'settings', label: 'Settings' },
]

export function MoodboardControlSurface({
    tab,
    workspace,
    region,
    checked,
    notifications,
    onTabChange,
    onWorkspaceChange,
    onRegionChange,
    onCheckedChange,
    onNotificationsChange,
}: MoodboardControlSurfaceProps) {
    return (
        <Card padding="md">
            <Card.Header>
                <Stack
                    direction="horizontal"
                    justify="between"
                    align="center"
                    style={{ width: '100%' }}
                >
                    <Stack gap="xs">
                        <Text size="sm" tone="muted">
                            CONTROL SURFACE
                        </Text>
                        <Title as="h3" size="md">
                            Component language
                        </Title>
                    </Stack>
                    <Tabs
                        size="sm"
                        value={tab}
                        onChange={onTabChange}
                        items={tabItems}
                        aria-label="Preview sections"
                    />
                </Stack>
            </Card.Header>
            <Card.Content>
                <Stack gap="md">
                    <Grid columns={2}>
                        <Input
                            id="moodboard-workspace"
                            label="Workspace"
                            value={workspace}
                            onChange={(event) => onWorkspaceChange(event.target.value)}
                            size="sm"
                        />
                        <Select
                            id="moodboard-region"
                            label="Region"
                            value={region}
                            onChange={(event) => onRegionChange(event.target.value)}
                            size="sm"
                        >
                            <option value="eu-west-1">EU West / Ireland</option>
                            <option value="us-east-1">US East / Virginia</option>
                            <option value="ap-south-1">AP South / Mumbai</option>
                        </Select>
                    </Grid>
                    <Textarea
                        id="moodboard-notes"
                        label="Release notes"
                        defaultValue="Ship the same component language across every atmosphere."
                        rows={2}
                        size="sm"
                    />
                    <Grid columns={2}>
                        <Checkbox
                            id="moodboard-signed"
                            label="Signed builds only"
                            checked={checked}
                            onChange={(event) => onCheckedChange(event.target.checked)}
                            size="sm"
                        />
                        <Switch
                            id="moodboard-notifications"
                            label="Notifications"
                            checked={notifications}
                            onChange={(event) => onNotificationsChange(event.target.checked)}
                            size="sm"
                        />
                    </Grid>
                    <Checkbox
                        id="moodboard-validation"
                        label="Require owner approval"
                        error="Approval is required before deploy."
                        invalid
                        size="sm"
                    />
                </Stack>
            </Card.Content>
        </Card>
    )
}
