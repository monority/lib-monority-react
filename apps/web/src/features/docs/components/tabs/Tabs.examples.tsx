import { Stack } from '@monority/ui/stack'
import { Tabs } from '@monority/ui/tabs'
import { Text } from '@monority/ui/text'
import { useState } from 'react'

export function TabsBasicExample() {
    const [value, setValue] = useState('overview')
    const items = [
        { value: 'overview', label: 'Overview' },
        { value: 'activity', label: 'Activity' },
        { value: 'releases', label: 'Releases' },
    ]

    return <Tabs items={items} value={value} onChange={setValue} />
}

export function TabsTonesExample() {
    const [neutral, setNeutral] = useState('summary')
    const [accent, setAccent] = useState('summary')
    const [danger, setDanger] = useState('summary')
    const items = [
        { value: 'summary', label: 'Summary' },
        { value: 'history', label: 'History' },
    ]

    return (
        <Stack gap="md">
            <Tabs items={items} value={neutral} onChange={setNeutral} tone="neutral" />
            <Tabs items={items} value={accent} onChange={setAccent} tone="accent" />
            <Tabs items={items} value={danger} onChange={setDanger} tone="danger" />
        </Stack>
    )
}

export function TabsSizesExample() {
    const [small, setSmall] = useState('api')
    const [medium, setMedium] = useState('api')
    const [large, setLarge] = useState('api')
    const items = [
        { value: 'api', label: 'API' },
        { value: 'examples', label: 'Examples' },
    ]

    return (
        <Stack gap="md">
            <Tabs items={items} value={small} onChange={setSmall} size="sm" />
            <Tabs items={items} value={medium} onChange={setMedium} size="md" />
            <Tabs items={items} value={large} onChange={setLarge} size="lg" />
        </Stack>
    )
}

export function TabsDisabledExample() {
    const [value, setValue] = useState('members')
    const items = [
        { value: 'members', label: 'Members' },
        { value: 'guests', label: 'Guests' },
    ]

    return <Tabs items={items} value={value} onChange={setValue} disabled />
}

export function TabsFullWidthExample() {
    const [value, setValue] = useState('overview')
    const items = [
        { value: 'overview', label: 'Overview' },
        { value: 'details', label: 'Details' },
        { value: 'settings', label: 'Settings' },
    ]

    return <Tabs items={items} value={value} onChange={setValue} fullWidth />
}

export function TabsCompoundExample() {
    return (
        <Tabs defaultValue="account">
            <Tabs.List>
                <Tabs.Trigger value="account">Account</Tabs.Trigger>
                <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
                <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="account">
                <Text.Muted size="sm">
                    Manage your account profile, email addresses, and connected social accounts.
                </Text.Muted>
            </Tabs.Content>
            <Tabs.Content value="notifications">
                <Text.Muted size="sm">
                    Configure alert thresholds, daily digest frequency, and desktop push alerts.
                </Text.Muted>
            </Tabs.Content>
            <Tabs.Content value="billing">
                <Text.Muted size="sm">
                    Review your enterprise plan tier, invoices history, and active seats allocation.
                </Text.Muted>
            </Tabs.Content>
        </Tabs>
    )
}
