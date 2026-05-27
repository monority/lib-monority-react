import { Component } from 'react'
import { Button, Container, Section, Stack, Text, Title } from '@monority/ui'

interface AppErrorBoundaryState {
    hasError: boolean
}

interface AppErrorBoundaryProps {
    children?: React.ReactNode
}

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
    constructor(props: AppErrorBoundaryProps) {
        super(props)
        this.state = {
            hasError: false,
        }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error: Error) {
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
                    <div className="surface mr-app-error">
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
