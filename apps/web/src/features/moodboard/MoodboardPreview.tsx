import { Container, Grid, Stack } from '@monority/ui'
import { MoodboardAdvancedControls } from './components/MoodboardAdvancedControls'
import { MoodboardControlSurface } from './components/MoodboardControlSurface'
import { MoodboardMetricOverview } from './components/MoodboardMetricOverview'
import { MoodboardPageHeader } from './components/MoodboardPageHeader'
import { MoodboardServiceHealth } from './components/MoodboardServiceHealth'
import { MoodboardStateShowcase } from './components/MoodboardStateShowcase'
import { MoodboardThroughputCard } from './components/MoodboardThroughputCard'
import { MoodboardTokenMatrixCard } from './components/MoodboardTokenMatrixCard'
import { MoodboardTopbar } from './components/MoodboardTopbar'
import { MoodboardVariantMatrix } from './components/MoodboardVariantMatrix'

export interface PanelState {
    tab: string
    workspace: string
    region: string
    checked: boolean
    notifications: boolean
    selectedRow: string
}

interface MoodboardPreviewProps {
    state: PanelState
    onState: (next: Partial<PanelState>) => void
}

export function MoodboardPreview({ state, onState }: MoodboardPreviewProps) {
    return (
        <Stack gap="lg" data-testid="moodboard-preview">
            <MoodboardTopbar />

            <Container size="xl" style={{ paddingBottom: 'var(--mr-space-8)' }}>
                <Stack gap="lg">
                    <MoodboardPageHeader />
                    <MoodboardMetricOverview />

                    <Grid columns={2}>
                        <MoodboardThroughputCard />
                        <MoodboardServiceHealth
                            selectedRow={state.selectedRow}
                            onSelectRow={(service) => onState({ selectedRow: service })}
                        />
                    </Grid>

                    <MoodboardControlSurface
                        tab={state.tab}
                        workspace={state.workspace}
                        region={state.region}
                        checked={state.checked}
                        notifications={state.notifications}
                        onTabChange={(tab) => onState({ tab })}
                        onWorkspaceChange={(workspace) => onState({ workspace })}
                        onRegionChange={(region) => onState({ region })}
                        onCheckedChange={(checked) => onState({ checked })}
                        onNotificationsChange={(notifications) => onState({ notifications })}
                    />

                    <Grid columns={2}>
                        <MoodboardVariantMatrix />
                        <MoodboardStateShowcase />
                    </Grid>

                    <MoodboardAdvancedControls />
                    <MoodboardTokenMatrixCard />
                </Stack>
            </Container>
        </Stack>
    )
}
