import { Link } from 'react-router-dom'
import { primaryNavigationItems } from '@/app/config/navigation'
import { AppPage } from '@/app/layouts/AppPage'
import { Button, Section, Text, Title } from '@/components/ui'

export function NotFoundPage() {
    return (
        <AppPage
            navigationItems={primaryNavigationItems}
            containerSize="md"
            seo={{
                title: 'Page introuvable',
                description: 'La page demandee est introuvable sur Model Starter.',
                robots: 'noindex,nofollow',
            }}
        >
            <Section spacing="lg" className="stack-l">
                <div className="surface not-found stack-m">
                    <Text className="eyebrow" tone="strong">
                        404
                    </Text>
                    <Title as="h1" size="lg">
                        La page demandee est introuvable.
                    </Title>
                    <Text tone="base" size="lg">
                        Le starter est maintenant pret pour un vrai flux multi-pages avec une page
                        de repli propre.
                    </Text>
                    <div className="cluster">
                        <Button as={Link} to="/" size="lg">
                            Retour a l&apos;accueil
                        </Button>
                    </div>
                </div>
            </Section>
        </AppPage>
    )
}
