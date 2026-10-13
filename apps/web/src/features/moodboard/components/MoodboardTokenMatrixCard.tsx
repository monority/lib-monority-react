import { Card, Text } from '@monority/ui'
import { TokenSwatchMatrix } from './TokenSwatchMatrix'

export function MoodboardTokenMatrixCard() {
    return (
        <Card padding="md">
            <Card.Header>
                <Text size="sm" tone="muted">
                    TOKEN MATRIX
                </Text>
            </Card.Header>
            <Card.Content>
                <TokenSwatchMatrix />
            </Card.Content>
        </Card>
    )
}
