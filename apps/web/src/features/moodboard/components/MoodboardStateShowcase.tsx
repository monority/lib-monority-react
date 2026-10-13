import { Callout } from '@monority/ui/callout'
import { Card } from '@monority/ui/card'
import { Progress } from '@monority/ui/progress'
import { Stack } from '@monority/ui/stack'
import { StatCard } from '@monority/ui/stat-card'

export function MoodboardStateShowcase() {
    return (
        <Card className="moodboard-card" padding="md">
            <Card.Header>
                <span className="moodboard-kicker">DATA STATES</span>
            </Card.Header>
            <Card.Content>
                <Stack gap="md">
                    <div className="moodboard-data-grid">
                        <StatCard
                            label="LOADING"
                            value="—"
                            description="Waiting for the next release"
                        />
                        <Callout tone="info" title="No incidents">
                            All regions are inside the error budget.
                        </Callout>
                        <Callout tone="warning" title="Review required">
                            One deploy is waiting for approval.
                        </Callout>
                    </div>

                    <span className="moodboard-kicker">PROGRESS</span>
                    <div className="moodboard-progress-group">
                        <Progress label="Deploy" value={72} showValue tone="neutral" />
                        <Progress label="Migrations" value={45} showValue tone="warning" />
                        <Progress label="Tests" value={98} showValue tone="success" />
                    </div>
                </Stack>
            </Card.Content>
        </Card>
    )
}
