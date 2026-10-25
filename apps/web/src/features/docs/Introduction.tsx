import { localizePath, useLocale, useMessages } from '@/shared/i18n'
import { CodeViewer } from '@/shared/components/CodeViewer'
import { HeroHeader } from '@/shared/components/HeroHeader'
import { Badge } from '@monority/ui/badge'
import { Card } from '@monority/ui/card'
import { Grid } from '@monority/ui/grid'
import { Stack } from '@monority/ui/stack'
import { Link } from 'react-router-dom'
import { DocContainer } from './components/DocContainer'
import { DocSection } from './components/DocSection'

export function Introduction() {
    const { locale } = useLocale()
    const messages = useMessages().guides.introduction

    return (
        <DocContainer className="docs-page">
            <HeroHeader
                kicker={messages.hero.kicker}
                title={messages.hero.title}
                description={messages.hero.description}
            />

            <DocSection
                id="propositions"
                title={messages.features.title}
                description={messages.features.description}
            >
                <Grid columns="auto-fit">
                    {messages.features.items.map((feature) => (
                        <Card key={feature.title} padding="md">
                            <Stack gap="xs">
                                <Badge variant={feature.variant} size="sm">
                                    {feature.title}
                                </Badge>
                                <p className="docs-feature-desc">{feature.description}</p>
                            </Stack>
                        </Card>
                    ))}
                </Grid>
            </DocSection>

            <DocSection
                id="quickstart"
                title={messages.quickstart.title}
                description={messages.quickstart.description}
            >
                <Stack gap="sm">
                    <CodeViewer code="pnpm add @monority/ui" language="bash" filename="terminal" />
                    <CodeViewer
                        code={`import { Button } from '@monority/ui'\nimport '@monority/ui/styles.css'\n\nfunction App() {\n  return <Button>Open workspace</Button>\n}`}
                        filename="App.tsx"
                    />
                </Stack>
                <p className="docs-text">
                    <Link
                        to={localizePath('/docs/installation', locale)}
                        className="docs-text-link"
                    >
                        {messages.quickstart.cta}
                    </Link>
                </p>
            </DocSection>

            <DocSection
                id="categories"
                title={messages.categories.title}
                description={messages.categories.description}
            >
                <Card padding="md">
                    <ul className="docs-list">
                        {messages.categories.items.map((category) => (
                            <li key={category.label}>
                                <strong>{category.label}</strong> — {category.items}
                            </li>
                        ))}
                    </ul>
                </Card>
            </DocSection>
        </DocContainer>
    )
}
