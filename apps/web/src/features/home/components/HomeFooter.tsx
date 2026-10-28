import { Separator, Text } from '@monority/ui'
import { Link } from 'react-router-dom'
import { localizePath, useLocale, useMessages } from '@/shared/i18n'

export function HomeFooter() {
    const { locale } = useLocale()
    const messages = useMessages().common.footer

    return (
        <footer
            role="contentinfo"
            style={{
                marginTop: 'var(--mr-space-8)',
                paddingTop: 'var(--mr-space-6)',
                paddingBottom: 'var(--mr-space-8)',
            }}
        >
            <Separator style={{ marginBottom: 'var(--mr-space-6)' }} />

            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 'var(--mr-space-4)',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--mr-space-3)' }}>
                    <Text tone="muted" size="sm">
                        {messages.license}
                    </Text>
                </div>

                <nav
                    aria-label={messages.navigation}
                    style={{ display: 'flex', alignItems: 'center', gap: 'var(--mr-space-5)' }}
                >
                    <Link
                        to={localizePath('/docs', locale)}
                        style={{
                            color: 'var(--mr-text-secondary)',
                            textDecoration: 'none',
                            fontSize: 'var(--mr-font-size-sm)',
                        }}
                    >
                        {messages.documentation}
                    </Link>
                    <a
                        href="https://github.com/monority/lib-monority-react"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: 'var(--mr-text-secondary)',
                            textDecoration: 'none',
                            fontSize: 'var(--mr-font-size-sm)',
                        }}
                    >
                        GitHub
                    </a>
                </nav>
            </div>
        </footer>
    )
}
