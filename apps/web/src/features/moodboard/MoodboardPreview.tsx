import { Container } from '@monority/ui'
import { MoodboardDashboardView } from './components/MoodboardDashboardView'

export function MoodboardPreview() {
    return (
        <div data-testid="moodboard-preview" style={{ width: '100%' }}>
            <Container size="xl" style={{ paddingBlock: 'var(--mr-space-6) var(--mr-space-8)' }}>
                <MoodboardDashboardView />
            </Container>
        </div>
    )
}
