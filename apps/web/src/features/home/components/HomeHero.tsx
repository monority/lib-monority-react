import { useState } from 'react'
import { Badge, ButtonLink, Stack, Text, Title } from '@monority/ui'
import { localizePath, useLocale, useMessages } from '@/shared/i18n'

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
        <section
            aria-label={messages.ariaLabel}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                paddingBlock: 'var(--mr-space-6) var(--mr-space-2)',
                maxWidth: '56rem',
                marginInline: 'auto',
            }}
        >
            <Stack gap="md" align="center">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Badge
                        variant="primary"
                        size="md"
                        style={{
                            boxShadow:
                                '0 0 16px color-mix(in oklch, var(--mr-accent-solid) 22%, transparent)',
                            borderColor:
                                'color-mix(in oklch, var(--mr-accent-solid) 40%, transparent)',
                        }}
                    >
                        {messages.kicker}
                    </Badge>
                </div>

                <Title
                    as="h1"
                    style={{
                        fontSize: 'clamp(2.5rem, 5.5vw, 4rem)',
                        fontWeight: 700,
                        lineHeight: 1.1,
                        letterSpacing: '-0.035em',
                        color: 'var(--mr-text-primary)',
                        maxWidth: '48rem',
                        textWrap: 'balance',
                        margin: 0,
                    }}
                >
                    {messages.title}
                </Title>

                <Text
                    tone="muted"
                    style={{
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        lineHeight: 1.6,
                        maxWidth: '42rem',
                        margin: 0,
                        textWrap: 'balance',
                    }}
                >
                    {messages.description}
                </Text>

                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 'var(--mr-space-3)',
                        paddingTop: 'var(--mr-space-3)',
                    }}
                >
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
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.625rem',
                            height: '2.75rem',
                            paddingInline: '1rem',
                            borderRadius: 'var(--mr-radius-control)',
                            border: '1px solid var(--mr-border-control)',
                            background: 'var(--mr-bg-sunken)',
                            color: 'var(--mr-text-primary)',
                            fontFamily: 'var(--mr-font-family-mono)',
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            transition: 'all var(--mr-duration-state) ease',
                        }}
                    >
                        <span style={{ color: 'var(--mr-text-muted)' }} aria-hidden="true">
                            $
                        </span>
                        <span>{messages.installCommand}</span>
                        <span
                            style={{
                                color: copied ? 'var(--mr-success-solid)' : 'var(--mr-text-muted)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                transition: 'color var(--mr-duration-state) ease',
                            }}
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
            </Stack>
        </section>
    )
}
