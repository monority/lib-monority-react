import { Badge } from '@monority/ui/badge'
import { Button } from '@monority/ui/button'
import { Card } from '@monority/ui/card'
import { Section } from '@monority/ui/section'

const activity = [
    { title: 'Release 0.4.0 published', status: 'Synced', variant: 'success' as const },
    { title: 'Button docs updated', status: 'Active', variant: 'primary' as const },
    { title: 'Webhook failures on prod', status: 'Blocked', variant: 'danger' as const },
]

export function ActivityComposition() {
    return (
        <Section title="Project overview" variant="bordered" spacing="md">
            <div className="sc-activity">
                {activity.map((item) => (
                    <Card key={item.title} padding="md">
                        <div className="sc-activity__row">
                            <div>
                                <strong>{item.title}</strong>
                                <p className="sc-muted">Updated 2 hours ago by the core team.</p>
                            </div>
                            <Badge variant={item.variant}>{item.status}</Badge>
                        </div>
                    </Card>
                ))}
                <Card padding="md">
                    <div className="sc-activity__row">
                        <div>
                            <strong>No pending reviews</strong>
                            <p className="sc-muted">You are all caught up. Nice work.</p>
                        </div>
                        <Button variant="ghost" size="sm">
                            View archive
                        </Button>
                    </div>
                </Card>
            </div>
        </Section>
    )
}
