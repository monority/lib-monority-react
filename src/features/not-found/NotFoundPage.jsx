import { Link } from 'react-router-dom'
import { primaryNavigationItems } from '@/app/config/navigation'
import { AppShell } from '@/app/layouts/AppShell'
import { Button, Container, Section, Stack, Text, Title } from '@/components/ui'
import { useTheme } from '@/hooks/useTheme'

export function NotFoundPage() {
    const { isDark, toggleTheme } = useTheme()

    return (
        <AppShell
            isDark={isDark}
            onToggleTheme={toggleTheme}
            navigationItems={primaryNavigationItems}
        >
            <Container size="md">
                <Section spacing="lg" className="stack-l">
                    <div className="surface not-found stack-m">
                        <Text className="eyebrow" tone="strong">
                            404
                        </Text>
                        <Title as="h1" size="lg">
                            La page demandee est introuvable.
                        </Title>
                        <Text tone="base" size="lg">
                            Le starter est maintenant pret pour un vrai flux multi-pages avec une
                            page de repli propre.
                        </Text>
                        <div className="cluster">
                            <Button as={Link} to="/" size="lg">
                                Retour a l&apos;accueil
                            </Button>
                        </div>
                    </div>
                </Section>
            </Container>
        </AppShell>
    )
}
