import { useMessages } from '@/shared/i18n'
import { Badge } from '@monority/ui'

export function HomeFrameworksStrip() {
    const messages = useMessages().home.frameworks

    return (
        <section
            aria-label={messages.label}
            style={{
                width: '100%',
                maxWidth: '56rem',
                marginInline: 'auto',
                paddingBlock: 'var(--mr-space-4)',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--mr-space-3)',
                    padding: 'var(--mr-space-3) var(--mr-space-4)',
                    backgroundColor: 'var(--mr-bg-sunken)',
                    borderRadius: 'var(--mr-radius-full)',
                    border: '1px solid var(--mr-border-subtle)',
                }}
            >
                {messages.items.map((item) => (
                    <div
                        key={item.name}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 'var(--mr-space-2)',
                            padding: 'var(--mr-space-1) var(--mr-space-3)',
                            borderRadius: 'var(--mr-radius-full)',
                            transition:
                                'background-color var(--mr-duration-state) var(--mr-ease-out), color var(--mr-duration-state) var(--mr-ease-out)',
                        }}
                    >
                        <span
                            style={{
                                fontSize: 'var(--mr-font-size-sm)',
                                fontWeight: 600,
                                color: 'var(--mr-text-primary)',
                                letterSpacing: '-0.01em',
                            }}
                        >
                            {item.name}
                        </span>
                        <Badge variant="default" size="sm">
                            {item.note}
                        </Badge>
                    </div>
                ))}
            </div>
        </section>
    )
}
