import { Link } from 'react-router-dom'
import { HeroHeader } from '@/shared/components/HeroHeader'
import { CodeViewer } from '@/shared/components/CodeViewer'
import { Card } from '@monority/ui/card'
import { Stack } from '@monority/ui/stack'
import { Stepper } from '@monority/ui/stepper'
import { DocContainer } from './components/DocContainer'
import { DocSection } from './components/DocSection'

export function Installation() {
    return (
        <DocContainer className="docs-page">
            <HeroHeader
                kicker="Getting Started"
                title="Installation"
                description="Set up Monority UI in your project, load the shared styles, and start composing product-ready screens with the component system."
            />

            <DocSection
                id="steps"
                title="Guide pas à pas"
                description="Intégrez la bibliothèque dans votre projet en trois étapes simples."
            >
                <Stepper orientation="vertical" activeStep={0}>
                    <Stepper.Step
                        title="1. Installer le package"
                        description="Choisissez votre gestionnaire de paquets préféré."
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
                        title="2. Importer la fondation CSS"
                        description="Chargez la feuille de styles principale à l'entrée de votre application."
                    >
                        <div className="docs-step-content">
                            <CodeViewer
                                code={`// main.tsx ou entrypoint\nimport '@monority/ui/styles.css'`}
                                filename="main.tsx"
                            />
                        </div>
                    </Stepper.Step>
                    <Stepper.Step
                        title="3. Composer vos interfaces"
                        description="Importez directement depuis le point d'entrée principal ou via des sous-chemins optimisés."
                    >
                        <div className="docs-step-content">
                            <CodeViewer
                                code={`// Point d'entrée principal\nimport { Button, Modal, Tooltip } from '@monority/ui'\n\n// Sous-chemins dédiés pour tree-shaking optimal\nimport { Button } from '@monority/ui/button'\nimport { Sheet } from '@monority/ui/sheet'`}
                                filename="App.tsx"
                            />
                        </div>
                    </Stepper.Step>
                </Stepper>
            </DocSection>

            <DocSection
                id="prerequisites"
                title="Prérequis"
                description="Configuration d'exécution recommandée."
            >
                <Card padding="md">
                    <ul className="docs-list">
                        <li>React 19 ou version ultérieure</li>
                        <li>React DOM 19 ou version ultérieure</li>
                        <li>TypeScript 5.7+ pour une prise en charge complète des types</li>
                    </ul>
                </Card>
            </DocSection>

            <DocSection
                id="next-steps"
                title="Prochaines étapes"
                description="Explorez l'écosystème et commencez à concevoir."
            >
                <Card padding="md">
                    <ul className="docs-list">
                        <li>
                            Consultez la{' '}
                            <Link to="/docs" className="docs-text-link">
                                documentation des composants
                            </Link>
                        </li>
                        <li>
                            Testez vos combinaisons de tokens dans le{' '}
                            <Link to="/moodboard" className="docs-text-link">
                                Design Studio
                            </Link>
                        </li>
                    </ul>
                </Card>
            </DocSection>
        </DocContainer>
    )
}
