import { localizePath, useLocale, useMessages } from '@/shared/i18n'
import { Badge, ButtonLink, Text, Title } from '@monority/ui'
import { useState } from 'react'
import { HeroMonolith3D } from './monolith/HeroMonolith3D'
import './HomeHero.css'

export function HomeHero() {
    const { locale } = useLocale()
    const messages = useMessages().home.hero
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(messages.installCommand)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            /* noop */
        }
    }

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

                    <button
                        type="button"
                        onClick={handleCopy}
                        aria-label={copied ? messages.copied : messages.installCommand}
                        className="mr-hero__install-btn"
                    >
                        <span className="mr-hero__install-prompt" aria-hidden="true">
                            $
                        </span>
                        <span>{messages.installCommand}</span>
                        <span
                            className={
                                copied
                                    ? 'mr-hero__install-icon mr-hero__install-icon--copied'
                                    : 'mr-hero__install-icon'
                            }
                            aria-hidden="true"
                        >
                            {copied ? (
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            ) : (
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </svg>
                            )}
                        </span>
                    </button>
                </div>
            </div>

            <div className="mr-hero__visual">
                <HeroMonolith3D />
            </div>
        </section>
    )
}
