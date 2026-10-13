import { Card } from '@monority/ui/card'
import { MiniBarChart, type ChartDayItem } from './MiniBarChart'

const chartData: ChartDayItem[] = [
    { label: 'Mon', values: [65, 45, 30] },
    { label: 'Tue', values: [50, 60, 25] },
    { label: 'Wed', values: [75, 35, 40] },
    { label: 'Thu', values: [40, 55, 35] },
    { label: 'Fri', values: [60, 50, 45] },
    { label: 'Sat', values: [30, 25, 20] },
    { label: 'Sun', values: [20, 15, 15] },
]

export function MoodboardThroughputCard() {
    return (
        <Card className="moodboard-card" padding="md">
            <Card.Header className="moodboard-card__topline">
                <span className="moodboard-kicker">THROUGHPUT</span>
                <span className="moodboard-mono">7-DAY TREND</span>
            </Card.Header>
            <Card.Content>
                <MiniBarChart data={chartData} />
            </Card.Content>
        </Card>
    )
}
