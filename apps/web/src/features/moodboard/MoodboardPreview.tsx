import { Container, Stack } from '@monority/ui'
import { MoodboardDashboardView } from './components/MoodboardDashboardView'
import { MoodboardShowcaseCards } from './components/MoodboardShowcaseCards'
import { MoodboardTokensView } from './components/MoodboardTokensView'

export function MoodboardPreview() {
    return (
        <div data-testid="moodboard-preview" style={{ width: '100%' }}>
            <Container size="xl" style={{ paddingBlock: 'var(--mr-space-6) var(--mr-space-8)' }}>
                <Stack gap="xl">
                    <MoodboardDashboardView />
                    <MoodboardShowcaseCards />
                    <MoodboardTokensView />
                </Stack>
            </Container>
        </div>
    )
}
