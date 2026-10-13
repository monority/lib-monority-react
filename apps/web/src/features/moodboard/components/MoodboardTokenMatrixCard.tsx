import { Card } from '@monority/ui/card'
import { TokenSwatchMatrix } from './TokenSwatchMatrix'

export function MoodboardTokenMatrixCard() {
    return (
        <Card className="moodboard-card" padding="md">
            <Card.Header>
                <span className="moodboard-kicker">TOKEN MATRIX</span>
            </Card.Header>
            <Card.Content>
                <TokenSwatchMatrix />
            </Card.Content>
        </Card>
    )
}
