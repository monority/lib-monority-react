import { Link } from 'react-router-dom'
import { HeroHeader } from '@/shared/components/HeroHeader'
import { CodeViewer } from '@/shared/components/CodeViewer'
import { Card } from '@monority/ui/card'
import { Stack } from '@monority/ui/stack'
import { Stepper } from '@monority/ui/stepper'

export function Installation() {
    return (
        <div className="docs-page">
            <HeroHeader
                kicker="Getting Started"
                title="Installation"
                description="Set up Monority UI in your project, load the shared styles, and start composing product-ready screens with the component system."
            />

            <section className="docs-section">
                <Stepper orientation="vertical" activeStep={0}>
                    <Stepper.Step
                        title="1. Installer le package"
                        description="Choisissez votre gestionnaire de paquets prefere."
                    >
                        <Stack gap="sm" style={{ marginTop: '0.75rem' }}>
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
                        description="Chargez la feuille de styles principale a l entree de votre application."
                    >
                        <div style={{ marginTop: '0.75rem' }}>
                            <CodeViewer
                                code={`// main.tsx ou entrypoint\nimport '@monority/ui/styles.css'`}
                                filename="main.tsx"
                            />
                        </div>
                    </Stepper.Step>
                    <Stepper.Step
                        title="3. Composer vos interfaces"
                        description="Importez directement depuis le point d entree principal ou via des sous-chemins optimises."
                    >
                        <div style={{ marginTop: '0.75rem' }}>
                            <CodeViewer
                                code={`// Point d entree principal\nimport { Button, Modal, Tooltip } from '@monority/ui'\n\n// Sous-chemins dedies pour tree-shaking optimal\nimport { Button } from '@monority/ui/button'\nimport { Sheet } from '@monority/ui/sheet'`}
                                filename="App.tsx"
                            />
                        </div>
                    </Stepper.Step>
                </Stepper>
            </section>

            <section className="docs-section">
                <h2>Prérequis</h2>
                <Card padding="md">
                    <ul className="docs-list" style={{ margin: 0 }}>
                        <li>React 19 ou version ultérieure</li>
                        <li>React DOM 19 ou version ultérieure</li>
                        <li>TypeScript 5.7+ pour une prise en charge complète des types</li>
                    </ul>
                </Card>
            </section>

            <section className="docs-section">
                <h2>Prochaines étapes</h2>
                <Card padding="md">
                    <ul className="docs-list" style={{ margin: 0 }}>
                        <li>
                            Consultez la{' '}
                            <Link to="/docs" className="docs-text-link">
                                documentation des composants
                            </Link>
                        </li>
                        <li>
                            Explorez le{' '}
                            <Link to="/showcase" className="docs-text-link">
                                Showcase
                            </Link>{' '}
                            pour voir des compositions réelles
                        </li>
                        <li>
                            Testez vos combinaisons de tokens dans le{' '}
                            <Link to="/moodboard" className="docs-text-link">
                                Design Studio
                            </Link>
                        </li>
                    </ul>
                </Card>
            </section>
        </div>
    )
}
