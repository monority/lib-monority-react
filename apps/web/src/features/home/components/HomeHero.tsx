import { HeroHeader } from '@/shared/components/HeroHeader'
import { ButtonLink } from '@monority/ui/button-link'
import { Section } from '@monority/ui/section'
import { useLocale, useMessages } from '@/shared/i18n'
import { localizePath } from '@/shared/i18n/locales'
import { docsComponentRegistry } from '@/features/docs/components/registry'

export function HomeHero() {
    const { locale } = useLocale()
    const messages = useMessages().home.hero

    return (
        <Section spacing="lg" aria-label={messages.ariaLabel}>
            <HeroHeader
                kicker={messages.kicker}
                title={messages.title}
                description={messages.description}
                align="center"
                size="lg"
                actions={
                    <>
                        <ButtonLink
                            href={localizePath('/docs', locale)}
                            variant="primary"
                            size="md"
                        >
                            {messages.docsCta(docsComponentRegistry.length)}
                        </ButtonLink>
                        <ButtonLink
                            href={localizePath('/moodboard', locale)}
                            variant="secondary"
                            size="md"
                        >
                            {messages.studio}
                        </ButtonLink>
                        <ButtonLink
                            href={localizePath('/docs/installation', locale)}
                            variant="ghost"
                            size="md"
                        >
                            {messages.installation}
                        </ButtonLink>
                    </>
                }
            />
        </Section>
    )
}
