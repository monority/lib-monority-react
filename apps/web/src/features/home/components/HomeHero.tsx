import { localizePath, useLocale, useMessages } from '@/shared/i18n'
import { Badge, Button, ButtonLink, Text, Title } from '@monority/ui'
import { HeroMonolith3D } from './monolith/HeroMonolith3D'
import './HomeHero.css'

export function HomeHero() {
    const { locale } = useLocale()
    const messages = useMessages().home.hero

    return (
        <section aria-label={messages.ariaLabel} className="mr-hero">
            <div className="mr-hero__content">
                <div className="mr-hero__kicker">
                    <Badge variant="primary" size="md" className="mr-hero__badge">
                        {messages.kicker}
                    </Badge>
                </div>

                <Title as="h1" className="mr-hero__title">
                    {messages.title}
                </Title>

                <Text tone="muted" className="mr-hero__description">
                    {messages.description}
                </Text>

                <div className="mr-hero__actions">
                    <ButtonLink href={localizePath('/docs', locale)} variant="primary" size="lg">
                        {messages.docsCta}
                    </ButtonLink>

                    <ButtonLink
                        href="https://github.com/monority/lib-monority-react"
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="secondary"
                        size="lg"
                    >
                        {messages.githubCta || 'GitHub'}
                    </ButtonLink>

                    <Button
                        copyValue={messages.installCommand}
                        copiedLabel={messages.copied}
                        variant="secondary"
                        size="lg"
                        className="mr-hero__install-btn"
                        aria-label={messages.installCommand}
                    >
                        <span className="mr-hero__install-prompt" aria-hidden="true">
                            $
                        </span>
                        <span>{messages.installCommand}</span>
                    </Button>
                </div>
            </div>

            <div className="mr-hero__visual">
                <HeroMonolith3D />
            </div>
        </section>
    )
}
