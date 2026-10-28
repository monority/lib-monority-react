import { Card, PreCode, Section, SegmentedControl, Stack, Text, Title } from '@monority/ui'
import { useState } from 'react'
import { useMessages } from '@/shared/i18n'

const CODE_EXAMPLES = {
    app: `import { Button, Card, Input, MetricGrid, StatCard } from '@monority/ui'

export function Dashboard() {
    return (
        <Card padding="lg">
            <Card.Header>
                <Card.Title>Cluster Performance</Card.Title>
                <Card.Description>Production metrics across 8 edge regions</Card.Description>
            </Card.Header>
            <Card.Content>
                <StatCard
                    label="REQUESTS / SEC"
                    value="42,850 req/s"
                    trend="+12.4%"
                    trendTone="success"
                />
            </Card.Content>
            <Card.Footer>
                <Button variant="primary" size="sm">Deploy Update</Button>
            </Card.Footer>
        </Card>
    )
}`,
    tokens: `/* packages/styles/src/themes/my-brand.css */
@layer mr.themes {
    :root[data-theme="my-brand"] {
        color-scheme: dark;
        --mr-bg-canvas: oklch(0.14 0.02 260);
        --mr-bg-surface: oklch(0.18 0.025 260);
        --mr-accent-solid: oklch(0.68 0.22 290);
        --mr-radius-control: 0.375rem;
        --mr-radius-card: 0.75rem;
    }
}`,
    html: `<!-- apps/web/index.html (Zero FOUC SSR Theme Injection) -->
<head>
    <script>
        (function() {
            var theme = localStorage.getItem('theme') || 'dark';
            document.documentElement.dataset.theme = theme;
        })();
    </script>
    <link rel="stylesheet" href="/node_modules/@monority/ui/dist/index.css">
</head>`,
}

export function HomeCodeExperience() {
    const messages = useMessages().home.codeExperience
    const [selectedTab, setSelectedTab] = useState<'app' | 'tokens' | 'html'>('app')

    return (
        <Section spacing="lg" aria-labelledby="code-exp-title">
            <Stack
                gap="xs"
                style={{
                    marginBottom: 'var(--mr-space-6)',
                    textAlign: 'center',
                    maxWidth: '38rem',
                    marginInline: 'auto',
                }}
            >
                <Title id="code-exp-title" size="lg">
                    {messages.title}
                </Title>
                <Text tone="muted" size="md">
                    {messages.description}
                </Text>
            </Stack>

            <Card
                style={{
                    padding: 0,
                    maxWidth: '56rem',
                    marginInline: 'auto',
                    overflow: 'hidden',
                    border: '1px solid var(--mr-border-default)',
                    boxShadow: 'var(--mr-shadow-overlay)',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 'var(--mr-space-2) var(--mr-space-4)',
                        borderBottom: '1px solid var(--mr-border-subtle)',
                        background: 'var(--mr-bg-sunken)',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <span
                            style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                background: '#ff5f56',
                            }}
                        />
                        <span
                            style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                background: '#ffbd2e',
                            }}
                        />
                        <span
                            style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                background: '#27c93f',
                            }}
                        />
                    </div>

                    <SegmentedControl
                        size="sm"
                        value={selectedTab}
                        onChange={(val) => setSelectedTab(val as 'app' | 'tokens' | 'html')}
                        options={[
                            { label: messages.tabComponent, value: 'app' },
                            { label: messages.tabTheme, value: 'tokens' },
                            { label: messages.tabHtml, value: 'html' },
                        ]}
                    />
                </div>

                <div style={{ padding: 'var(--mr-space-2)' }}>
                    <PreCode
                        language={
                            selectedTab === 'html'
                                ? 'html'
                                : selectedTab === 'tokens'
                                  ? 'css'
                                  : 'tsx'
                        }
                    >
                        {CODE_EXAMPLES[selectedTab]}
                    </PreCode>
                </div>
            </Card>
        </Section>
    )
}
