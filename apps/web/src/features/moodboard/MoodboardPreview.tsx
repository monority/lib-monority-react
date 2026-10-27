import { Container, Stack, Tabs } from '@monority/ui'
import { useState } from 'react'
import { useMessages } from '@/shared/i18n'
import { MoodboardCatalogView } from './components/MoodboardCatalogView'
import { MoodboardDashboardView } from './components/MoodboardDashboardView'

export function MoodboardPreview() {
    const [activeTab, setActiveTab] = useState('dashboard')
    const t = useMessages().moodboard

    return (
        <section
            data-testid="moodboard-preview"
            aria-label={t.preview.ariaLabel}
            style={{ width: '100%' }}
        >
            <Container size="xl" style={{ paddingBlock: 'var(--mr-space-6) var(--mr-space-8)' }}>
                <Stack gap="lg">
                    <Tabs
                        value={activeTab}
                        onChange={setActiveTab}
                        aria-label={t.preview.tabsAriaLabel}
                        items={[
                            {
                                value: 'dashboard',
                                label: t.preview.dashboardTab,
                            },
                            {
                                value: 'catalog',
                                label: t.preview.catalogTab,
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
