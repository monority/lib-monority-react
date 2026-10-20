import { Badge, Button, Card, Text, Timeline, Title, Toolbar } from '@monority/ui'
import { useState } from 'react'

interface ActivityItem {
    id: string
    title: string
    time: string
    badge: string
    badgeVariant: 'primary' | 'success' | 'default'
    status: 'primary' | 'success' | 'default'
    read: boolean
}

const initialActivities: ActivityItem[] = [
    {
        id: '1',
        title: 'PR #42 merged: CSS layer architecture',
        time: '12m ago',
        badge: 'merge',
        badgeVariant: 'primary',
        status: 'primary',
        read: false,
    },
    {
        id: '2',
        title: 'Sofia promoted edge cluster to v2.4.1',
        time: '1h ago',
        badge: 'release',
        badgeVariant: 'success',
        status: 'success',
        read: false,
    },
    {
        id: '3',
        title: 'Automated nightly snapshot verified',
        time: '4h ago',
        badge: 'backup',
        badgeVariant: 'default',
        status: 'default',
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
                <div>
                    <Title as="h3" size="sm" className="mr-card__title">
                        Activity & Notifications
                    </Title>
                    <Card.Description>
                        Real-time workspace events and automated triggers
                    </Card.Description>
                </div>
                <Badge variant={unreadCount > 0 ? 'primary' : 'default'} size="sm">
                    {unreadCount > 0 ? `${unreadCount} New` : 'All Caught Up'}
                </Badge>
            </Card.Header>

            <Card.Content style={{ flex: 1 }}>
                <Timeline size="sm">
                    {activities.map((item) => (
                        <Timeline.Item key={item.id} status={item.status}>
                            <Timeline.Point status={item.status} />
                            <Timeline.Content>
                                <Timeline.Header>
                                    <Timeline.Date>{item.time}</Timeline.Date>
                                    <Timeline.Extra>
                                        <Badge variant={item.badgeVariant} size="sm">
                                            {item.badge}
                                        </Badge>
                                    </Timeline.Extra>
                                </Timeline.Header>
                                <Timeline.Title
                                    style={{
                                        fontWeight: item.read ? 400 : 600,
                                    }}
                                >
                                    {item.title}
                                </Timeline.Title>
                            </Timeline.Content>
                        </Timeline.Item>
                    ))}
                </Timeline>
            </Card.Content>

            <Card.Footer>
                <Toolbar>
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
                </Toolbar>
                <Text tone="muted" size="sm">
                    WebSocket live feed
                </Text>
            </Card.Footer>
        </Card>
    )
}
