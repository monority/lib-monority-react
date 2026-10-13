import { useState } from 'react'
import { Badge, Button, Card, Stack, Text, Title } from '@monority/ui'

interface ActivityItem {
    id: string
    title: string
    time: string
    badge: string
    badgeVariant: 'primary' | 'success' | 'default'
    read: boolean
}

const initialActivities: ActivityItem[] = [
    {
        id: '1',
        title: 'PR #42 merged: CSS layer architecture',
        time: '12m ago',
        badge: 'merge',
        badgeVariant: 'primary',
        read: false,
    },
    {
        id: '2',
        title: 'Sofia promoted edge cluster to v2.4.1',
        time: '1h ago',
        badge: 'release',
        badgeVariant: 'success',
        read: false,
    },
    {
        id: '3',
        title: 'Automated nightly snapshot verified',
        time: '4h ago',
        badge: 'backup',
        badgeVariant: 'default',
        read: true,
    },
]

export function MoodboardActivityModule() {
    const [activities, setActivities] = useState<ActivityItem[]>(initialActivities)

    const unreadCount = activities.filter((a) => !a.read).length

    const handleMarkAllRead = () => {
        setActivities((prev) => prev.map((a) => ({ ...a, read: true })))
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
                            Activity & Notifications
                        </Title>
                        <Text tone="muted" size="sm">
                            Real-time workspace events and automated triggers
                        </Text>
                    </div>
                    <Badge variant={unreadCount > 0 ? 'primary' : 'default'} size="sm">
                        {unreadCount > 0 ? `${unreadCount} New` : 'All Caught Up'}
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
                <Stack gap="xs">
                    {activities.map((item) => (
                        <div
                            key={item.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: 'var(--mr-space-2)',
                                padding: 'var(--mr-space-2) var(--mr-space-3)',
                                borderRadius: 'var(--mr-radius-md)',
                                background: item.read ? 'transparent' : 'var(--mr-bg-sunken)',
                                border: '1px solid',
                                borderColor: item.read ? 'transparent' : 'var(--mr-border-subtle)',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--mr-space-2)',
                                    minWidth: 0,
                                }}
                            >
                                <span
                                    style={{
                                        width: 6,
                                        height: 6,
                                        borderRadius: '50%',
                                        backgroundColor: item.read
                                            ? 'transparent'
                                            : 'var(--mr-accent-solid)',
                                        flexShrink: 0,
                                    }}
                                />
                                <div style={{ minWidth: 0 }}>
                                    <Text
                                        size="sm"
                                        style={{
                                            fontWeight: item.read ? 400 : 600,
                                            display: 'block',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {item.title}
                                    </Text>
                                    <Text
                                        tone="muted"
                                        size="sm"
                                        style={{ fontSize: '0.75rem', display: 'block' }}
                                    >
                                        {item.time}
                                    </Text>
                                </div>
                            </div>
                            <Badge variant={item.badgeVariant} size="sm">
                                {item.badge}
                            </Badge>
                        </div>
                    ))}
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
                            disabled={unreadCount === 0}
                            onClick={handleMarkAllRead}
                        >
                            Mark all read
                        </Button>
                        <Button variant="ghost" size="sm">
                            Filter
                        </Button>
                    </div>
                    <Text tone="muted" size="sm" style={{ fontSize: '0.75rem' }}>
                        WebSocket live feed
                    </Text>
                </div>
            </Card.Content>
        </Card>
    )
}
