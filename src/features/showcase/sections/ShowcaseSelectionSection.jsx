import { useState } from 'react'
import { Card, Checkbox, Grid, Section, Switch, Tabs, Text, Title } from '@/components/ui'

const tabItems = [
    { label: 'Overview', value: 'overview' },
    { label: 'Preview', value: 'preview' },
    { label: 'Tokens', value: 'tokens' },
]

export function ShowcaseSelectionSection() {
    const [activeTab, setActiveTab] = useState('overview')

    return (
        <Section id="selection" surface className="stack-m">
            <div className="stack-s">
                <Text className="eyebrow" tone="strong">
                    Selection
                </Text>
                <Title as="h2" size="md">
                    Tabs, switch et checkbox
                </Title>
                <Text tone="base">
                    Ces composants couvrent des besoins courants d’app produit sans dépendance externe.
                </Text>
            </div>

            <Grid cols={2} gap="md">
                <Card padding="md" className="stack-m">
                    <Tabs items={tabItems} value={activeTab} onChange={setActiveTab} />
                    <Text tone="base">Tab actif: {activeTab}</Text>
                </Card>
                <Card padding="md" className="stack-m">
                    <Switch label="Activer les notifications" defaultChecked />
                    <Checkbox label="Recevoir les mises a jour produit" />
                </Card>
            </Grid>
        </Section>
    )
}
