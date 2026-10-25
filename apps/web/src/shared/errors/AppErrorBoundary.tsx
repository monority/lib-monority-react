import { Button, Container, Section, Stack, Text, Title } from '@monority/ui'
import { Component } from 'react'
import { getLocaleFromPath } from '@/shared/i18n/locales'
import { messages } from '@/shared/i18n/messages'

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

        const pathname = typeof window === 'undefined' ? '' : (window.location?.pathname ?? '')
        const locale = getLocaleFromPath(pathname)
        const copy = messages[locale].common.error

        return (
            <Container size="md">
                <Section spacing="lg" className="mr-stack-m">
                    <div className="mr-surface mr-app-error">
                        <Stack gap="md">
                            <Text tone="strong" className="eyebrow">
                                {copy.eyebrow}
                            </Text>
                            <Title as="h1" size="lg">
                                {copy.title}
                            </Title>
                            <Text tone="base">{copy.description}</Text>
                            <div className="mr-cluster">
                                <Button onClick={this.handleReload}>{copy.reload}</Button>
                            </div>
                        </Stack>
                    </div>
                </Section>
            </Container>
        )
    }
}
