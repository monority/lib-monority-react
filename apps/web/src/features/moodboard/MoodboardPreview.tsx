import { Container, Stack, Tabs } from '@monority/ui'
import { useState } from 'react'
import { MoodboardCatalogView } from './components/MoodboardCatalogView'
import { MoodboardDashboardView } from './components/MoodboardDashboardView'

export function MoodboardPreview() {
    const [activeTab, setActiveTab] = useState('dashboard')

    return (
        <section
            data-testid="moodboard-preview"
            aria-label="Aperçu du Studio"
            style={{ width: '100%' }}
        >
            <Container size="xl" style={{ paddingBlock: 'var(--mr-space-6) var(--mr-space-8)' }}>
                <Stack gap="lg">
                    <Tabs
                        value={activeTab}
                        onChange={setActiveTab}
                        aria-label="Mode de vue du Studio"
                        items={[
                            {
                                value: 'dashboard',
                                label: 'Tableau de bord (Control Plane)',
                            },
                            {
                                value: 'catalog',
                                label: 'Catalogue complet (Tous les composants)',
                            },
                        ]}
                    />

                    {activeTab === 'dashboard' ? (
                        <MoodboardDashboardView />
                    ) : (
                        <MoodboardCatalogView />
                    )}
                </Stack>
            </Container>
        </section>
    )
}
