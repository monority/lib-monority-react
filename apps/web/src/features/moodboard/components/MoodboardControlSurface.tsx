import { Card } from '@monority/ui/card'
import { Checkbox } from '@monority/ui/checkbox'
import { Grid } from '@monority/ui/grid'
import { Input } from '@monority/ui/input'
import { Select } from '@monority/ui/select'
import { Stack } from '@monority/ui/stack'
import { Switch } from '@monority/ui/switch'
import { Tabs } from '@monority/ui/tabs'
import { Textarea } from '@monority/ui/textarea'

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
        <Card className="moodboard-card" padding="md">
            <Card.Header className="moodboard-card__topline">
                <div>
                    <span className="moodboard-kicker">CONTROL SURFACE</span>
                    <h3>Component language</h3>
                </div>
                <Tabs
                    size="sm"
                    value={tab}
                    onChange={onTabChange}
                    items={tabItems}
                    aria-label="Preview sections"
                />
            </Card.Header>
            <Card.Content>
                <Stack gap="md">
                    <Grid columns={2} className="moodboard-form-grid">
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
                    <Stack direction="horizontal" gap="md" className="moodboard-form-row">
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
                    </Stack>
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
