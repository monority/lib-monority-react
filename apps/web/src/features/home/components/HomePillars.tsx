import { useState } from 'react'
import { Badge, Card, Grid, Section, Stack, Text, Title } from '@monority/ui'
import { Link } from 'react-router-dom'
import { localizePath, useLocale, useMessages } from '@/shared/i18n'

const ACCENT_PRESETS = [
    { id: 'violet', label: 'Violet', value: 'oklch(0.62 0.24 290)' },
    { id: 'cyan', label: 'Cyan', value: 'oklch(0.72 0.16 215)' },
    { id: 'amber', label: 'Amber', value: 'oklch(0.75 0.18 70)' },
    { id: 'emerald', label: 'Emerald', value: 'oklch(0.72 0.19 155)' },
]

export function HomePillars() {
    const { locale } = useLocale()
    const messages = useMessages().home.pillars
    const [activeAccent, setActiveAccent] = useState('violet')

    const handleSelectAccent = (preset: (typeof ACCENT_PRESETS)[number]) => {
        setActiveAccent(preset.id)
        if (typeof document !== 'undefined') {
            document.documentElement.style.setProperty('--mr-accent-solid', preset.value)
        }
    }

    return (
        <Section aria-labelledby="home-pillars-title" spacing="lg">
            <Stack
                gap="xs"
                style={{
                    marginBottom: 'var(--mr-space-6)',
                    textAlign: 'center',
                    maxWidth: '44rem',
                    marginInline: 'auto',
                }}
            >
                <Title id="home-pillars-title" size="lg">
                    {messages.title}
                </Title>
                <Text tone="muted" size="md">
                    {messages.description}
                </Text>
            </Stack>

            <Grid columns={3}>
                {/* Pilier 1 : CSS @layer Cascade Isolation */}
                <Card padding="lg" style={{ display: 'flex', flexDirection: 'column' }}>
                    <Card.Header>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: 'var(--mr-space-2)',
                                marginBottom: 'var(--mr-space-2)',
                            }}
                        >
                            <Card.Title>{messages.layerCard.title}</Card.Title>
                            <Badge variant="primary" size="sm">
                                {messages.layerCard.badge}
                            </Badge>
                        </div>
                    </Card.Header>
                    <Card.Content style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <Card.Description style={{ marginBottom: 'var(--mr-space-4)' }}>
                            {messages.layerCard.description}
                        </Card.Description>

                        {/* Micro-diagramme de la cascade ordonnée */}
                        <div
                            style={{
                                marginTop: 'auto',
                                padding: 'var(--mr-space-3)',
                                backgroundColor: 'var(--mr-bg-sunken)',
                                borderRadius: 'var(--mr-radius-md)',
                                border: '1px solid var(--mr-border-subtle)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px',
                            }}
                        >
                            {messages.layerCard.layers.map((layerName, index) => {
                                const isConsumer = index === 0
                                return (
                                    <div
                                        key={layerName}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '4px 8px',
                                            borderRadius: 'var(--mr-radius-sm)',
                                            fontSize: 'var(--mr-font-size-xs)',
                                            fontFamily: 'monospace',
                                            backgroundColor: isConsumer
                                                ? 'var(--mr-accent-subtle)'
                                                : 'var(--mr-bg-surface)',
                                            color: isConsumer
                                                ? 'var(--mr-accent-solid)'
                                                : 'var(--mr-text-secondary)',
                                            fontWeight: isConsumer ? 700 : 500,
                                            border: isConsumer
                                                ? '1px solid var(--mr-accent-solid)'
                                                : '1px solid var(--mr-border-subtle)',
                                        }}
                                    >
                                        <span>{layerName}</span>
                                        <span style={{ fontSize: '10px', opacity: 0.8 }}>
                                            {isConsumer ? 'WINNER' : `#${index + 1}`}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </Card.Content>
                </Card>

                {/* Pilier 2 : Thématisation OKLCH au Runtime */}
                <Card padding="lg" style={{ display: 'flex', flexDirection: 'column' }}>
                    <Card.Header>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: 'var(--mr-space-2)',
                                marginBottom: 'var(--mr-space-2)',
                            }}
                        >
                            <Card.Title>{messages.themingCard.title}</Card.Title>
                            <Badge variant="default" size="sm">
                                {messages.themingCard.badge}
                            </Badge>
                        </div>
                    </Card.Header>
                    <Card.Content style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <Card.Description style={{ marginBottom: 'var(--mr-space-4)' }}>
                            {messages.themingCard.description}
                        </Card.Description>

                        {/* Sélecteur d'accentuation dynamique */}
                        <div
                            style={{
                                marginTop: 'auto',
                                padding: 'var(--mr-space-4)',
                                backgroundColor: 'var(--mr-bg-sunken)',
                                borderRadius: 'var(--mr-radius-md)',
                                border: '1px solid var(--mr-border-subtle)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'var(--mr-space-3)',
                            }}
                        >
                            <span
                                style={{
                                    fontSize: 'var(--mr-font-size-xs)',
                                    fontWeight: 600,
                                    color: 'var(--mr-text-secondary)',
                                }}
                            >
                                {messages.themingCard.accentLabel}
                            </span>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--mr-space-3)',
                                }}
                            >
                                {ACCENT_PRESETS.map((preset) => {
                                    const isSelected = activeAccent === preset.id
                                    return (
                                        <button
                                            key={preset.id}
                                            type="button"
                                            onClick={() => handleSelectAccent(preset)}
                                            aria-label={preset.label}
                                            title={preset.label}
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: 'var(--mr-radius-full)',
                                                backgroundColor: preset.value,
                                                border: isSelected
                                                    ? '3px solid var(--mr-bg-canvas)'
                                                    : '1px solid var(--mr-border-subtle)',
                                                outline: isSelected
                                                    ? `2px solid ${preset.value}`
                                                    : 'none',
                                                cursor: 'pointer',
                                                transition:
                                                    'transform var(--mr-duration-state) var(--mr-ease-out), outline var(--mr-duration-state) var(--mr-ease-out)',
                                                transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                                            }}
                                        />
                                    )
                                })}
                            </div>
                            <div
                                style={{
                                    padding: '6px 8px',
                                    backgroundColor: 'var(--mr-bg-surface)',
                                    borderRadius: 'var(--mr-radius-sm)',
                                    fontSize: 'var(--mr-font-size-xs)',
                                    fontFamily: 'monospace',
                                    color: 'var(--mr-text-secondary)',
                                }}
                            >
                                --mr-accent-solid:{' '}
                                {ACCENT_PRESETS.find((p) => p.id === activeAccent)?.value}
                            </div>
                        </div>
                    </Card.Content>
                </Card>

                {/* Pilier 3 : 84 Primitives Accessibles */}
                <Card padding="lg" style={{ display: 'flex', flexDirection: 'column' }}>
                    <Card.Header>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: 'var(--mr-space-2)',
                                marginBottom: 'var(--mr-space-2)',
                            }}
                        >
                            <Card.Title>{messages.primitivesCard.title}</Card.Title>
                            <Badge variant="success" size="sm">
                                {messages.primitivesCard.badge}
                            </Badge>
                        </div>
                    </Card.Header>
                    <Card.Content style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <Card.Description style={{ marginBottom: 'var(--mr-space-4)' }}>
                            {messages.primitivesCard.description}
                        </Card.Description>

                        {/* Nuage interactif de composants phares */}
                        <div
                            style={{
                                marginTop: 'auto',
                                padding: 'var(--mr-space-3)',
                                backgroundColor: 'var(--mr-bg-sunken)',
                                borderRadius: 'var(--mr-radius-md)',
                                border: '1px solid var(--mr-border-subtle)',
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '6px',
                            }}
                        >
                            {messages.primitivesCard.primitives.map((compName) => (
                                <Link
                                    key={compName}
                                    to={localizePath(
                                        `/docs/components/${compName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`,
                                        locale
                                    )}
                                    style={{
                                        textDecoration: 'none',
                                        fontSize: 'var(--mr-font-size-xs)',
                                        fontWeight: 500,
                                        padding: '4px 8px',
                                        borderRadius: 'var(--mr-radius-sm)',
                                        backgroundColor: 'var(--mr-bg-surface)',
                                        color: 'var(--mr-text-primary)',
                                        border: '1px solid var(--mr-border-subtle)',
                                        transition:
                                            'border-color var(--mr-duration-state) var(--mr-ease-out), background-color var(--mr-duration-state) var(--mr-ease-out)',
                                    }}
                                >
                                    {compName}
                                </Link>
                            ))}
                        </div>
                    </Card.Content>
                </Card>
            </Grid>
        </Section>
    )
}
