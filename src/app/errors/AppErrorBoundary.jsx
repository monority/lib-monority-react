import { Component } from 'react'
import { Button, Container, Section, Stack, Text, Title } from '@/components/ui'

export class AppErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false,
        }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error) {
        if (import.meta.env.DEV) {
            console.error('AppErrorBoundary caught an error:', error)
        }
    }

    handleReload = () => {
        window.location.reload()
    }

    render() {
        if (!this.state.hasError) {
            return this.props.children
        }

        return (
            <Container size="md">
                <Section spacing="lg" className="stack-m">
                    <div className="surface ui-app-error">
                        <Stack gap="m">
                            <Text tone="strong" className="eyebrow">
                                Application error
                            </Text>
                            <Title as="h1" size="lg">
                                Une erreur a interrompu le rendu de l&apos;application.
                            </Title>
                            <Text tone="base">
                                Le starter reste maintenant capable d&apos;afficher un etat
                                d&apos;erreur propre plutot qu&apos;un ecran casse.
                            </Text>
                            <div className="cluster">
                                <Button onClick={this.handleReload}>Recharger</Button>
                            </div>
                        </Stack>
                    </div>
                </Section>
            </Container>
        )
    }
}
