import { localizePath, useLocale, useMessages } from '@/shared/i18n'
import { CodeViewer } from '@/shared/components/CodeViewer'
import { HeroHeader } from '@/shared/components/HeroHeader'
import { Card } from '@monority/ui/card'
import { Stack } from '@monority/ui/stack'
import { Stepper } from '@monority/ui/stepper'
import { Link } from 'react-router-dom'
import { DocContainer } from './components/DocContainer'
import { DocSection } from './components/DocSection'

export function Installation() {
    const { locale } = useLocale()
    const messages = useMessages().guides.installation

    return (
        <DocContainer className="docs-page">
            <HeroHeader
                kicker={messages.hero.kicker}
                title={messages.hero.title}
                description={messages.hero.description}
            />

            <DocSection
                id="steps"
                title={messages.steps.title}
                description={messages.steps.description}
            >
                <Stepper orientation="vertical" activeStep={0}>
                    <Stepper.Step
                        title={messages.steps.install.title}
                        description={messages.steps.install.description}
                    >
                        <Stack gap="sm" className="docs-step-stack">
                            <CodeViewer
                                code="pnpm add @monority/ui"
                                language="bash"
                                filename="terminal"
                            />
                            <CodeViewer
                                code="npm install @monority/ui"
                                language="bash"
                                filename="terminal"
                            />
                            <CodeViewer
                                code="yarn add @monority/ui"
                                language="bash"
                                filename="terminal"
                            />
                        </Stack>
                    </Stepper.Step>
                    <Stepper.Step
                        title={messages.steps.css.title}
                        description={messages.steps.css.description}
                    >
                        <div className="docs-step-content">
                            <CodeViewer
                                code={`// main.tsx or entrypoint\nimport '@monority/ui/styles.css'`}
                                filename="main.tsx"
                            />
                        </div>
                    </Stepper.Step>
                    <Stepper.Step
                        title={messages.steps.compose.title}
                        description={messages.steps.compose.description}
                    >
                        <div className="docs-step-content">
                            <CodeViewer
                                code={`// Main entry point\nimport { Button, Modal, Tooltip } from '@monority/ui'\n\n// Dedicated sub-paths for optimal tree-shaking\nimport { Button } from '@monority/ui/button'\nimport { Sheet } from '@monority/ui/sheet'`}
                                filename="App.tsx"
                            />
                        </div>
                    </Stepper.Step>
                </Stepper>
            </DocSection>

            <DocSection
                id="prerequisites"
                title={messages.prerequisites.title}
                description={messages.prerequisites.description}
            >
                <Card padding="md">
                    <ul className="docs-list">
                        {messages.prerequisites.items.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </Card>
            </DocSection>

            <DocSection
                id="next-steps"
                title={messages.nextSteps.title}
                description={messages.nextSteps.description}
            >
                <Card padding="md">
                    <ul className="docs-list">
                        <li>
                            {messages.nextSteps.browsePrefix}{' '}
                            <Link to={localizePath('/docs', locale)} className="docs-text-link">
                                {messages.nextSteps.docsLabel}
                            </Link>
                        </li>
                        <li>
                            {messages.nextSteps.testPrefix}{' '}
                            <Link
                                to={localizePath('/moodboard', locale)}
                                className="docs-text-link"
                            >
                                {messages.nextSteps.moodboardLabel}
                            </Link>
                        </li>
                    </ul>
                </Card>
            </DocSection>
        </DocContainer>
    )
}
