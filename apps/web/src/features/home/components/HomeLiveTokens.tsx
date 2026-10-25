import { useMessages, type Messages } from '@/shared/i18n'
import {
    Badge,
    Button,
    Card,
    Grid,
    Input,
    Progress,
    Section,
    Stack,
    Text,
    Title,
    ToggleGroup,
} from '@monority/ui'
import { type CSSProperties, useState } from 'react'

type AccentKey = keyof Messages['home']['liveTokens']['accents']
type RadiusKey = keyof Messages['home']['liveTokens']['radii']

const ACCENTS: { value: AccentKey; hue: string; chroma: string }[] = [
    { value: 'neutral', hue: '0', chroma: '0' },
    { value: 'violet', hue: '295', chroma: '0.18' },
    { value: 'emerald', hue: '152', chroma: '0.14' },
    { value: 'sky', hue: '230', chroma: '0.16' },
    { value: 'amber', hue: '75', chroma: '0.16' },
]

const RADII: { value: RadiusKey; val: string }[] = [
    { value: 'none', val: '0px' },
    { value: 'sm', val: '0.25rem' },
    { value: 'md', val: '0.5rem' },
    { value: 'lg', val: '1rem' },
]

export function HomeLiveTokens() {
    const messages = useMessages().home.liveTokens
    const [accent, setAccent] = useState<AccentKey>('violet')
    const [radius, setRadius] = useState<RadiusKey>('md')

    const currentAccent = ACCENTS.find((a) => a.value === accent) ?? ACCENTS[1]!
    const currentRadius = RADII.find((r) => r.value === radius) ?? RADII[2]!

    const customVars: Record<string, string> = {
        '--mr-radius-control': currentRadius.val,
        '--mr-radius-card': currentRadius.val,
        '--mr-radius-md': currentRadius.val,
        '--mr-radius-sm': currentRadius.val,
    }

    if (currentAccent.value !== 'neutral') {
        customVars['--mr-accent'] = `oklch(0.65 ${currentAccent.chroma} ${currentAccent.hue})`
        customVars['--mr-accent-hover'] = `oklch(0.58 ${currentAccent.chroma} ${currentAccent.hue})`
        customVars['--mr-accent-active'] =
            `oklch(0.52 ${currentAccent.chroma} ${currentAccent.hue})`
        customVars['--mr-accent-solid'] = `oklch(0.65 ${currentAccent.chroma} ${currentAccent.hue})`
    }

    return (
        <Section aria-labelledby="home-tokens-title" spacing="lg">
            <Stack gap="xs" style={{ marginBottom: 'var(--mr-space-5)' }}>
                <Title id="home-tokens-title" size="lg">
                    {messages.title}
                </Title>
                <Text tone="muted" size="md">
                    {messages.description}
                </Text>
            </Stack>

            <Grid columns={2}>
                <Card padding="md">
                    <Stack gap="md">
                        <div>
                            <Text
                                tone="muted"
                                size="sm"
                                style={{
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.06em',
                                    fontWeight: 600,
                                    marginBottom: 'var(--mr-space-2)',
                                    display: 'block',
                                }}
                            >
                                {messages.accentPalette}
                            </Text>
                            <ToggleGroup
                                value={accent}
                                onValueChange={(val) => {
                                    const v = Array.isArray(val) ? (val[0] ?? '') : String(val)
                                    const match = ACCENTS.find((a) => a.value === v)
                                    if (match) setAccent(match.value)
                                }}
                                items={ACCENTS.map((a) => ({
                                    value: a.value,
                                    label: messages.accents[a.value],
                                }))}
                                aria-label={messages.accentSwitcher}
                            />
                        </div>

                        <div>
                            <Text
                                tone="muted"
                                size="sm"
                                style={{
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.06em',
                                    fontWeight: 600,
                                    marginBottom: 'var(--mr-space-2)',
                                    display: 'block',
                                }}
                            >
                                {messages.geometry}
                            </Text>
                            <ToggleGroup
                                value={radius}
                                onValueChange={(val) => {
                                    const v = Array.isArray(val) ? (val[0] ?? '') : String(val)
                                    const match = RADII.find((r) => r.value === v)
                                    if (match) setRadius(match.value)
                                }}
                                items={RADII.map((r) => ({
                                    value: r.value,
                                    label: messages.radii[r.value],
                                }))}
                                aria-label={messages.radiusSwitcher}
                            />
                        </div>
                    </Stack>
                </Card>

                <Card padding="md" style={customVars as CSSProperties}>
                    <Stack gap="md">
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Title size="sm" as="h3">
                                {messages.previewTitle}
                            </Title>
                            <Badge variant="primary">{messages.activeTheme}</Badge>
                        </div>

                        <Input
                            label={messages.inputLabel}
                            placeholder={messages.inputPlaceholder}
                            defaultValue="design@monority.dev"
                        />

                        <Progress
                            value={82}
                            label={messages.progressLabel}
                            showValue
                            tone="success"
                        />

                        <div
                            style={{ display: 'flex', gap: 'var(--mr-space-2)', flexWrap: 'wrap' }}
                        >
                            <Button variant="primary" size="sm">
                                {messages.primaryAction}
                            </Button>
                            <Button variant="secondary" size="sm">
                                {messages.secondaryAction}
                            </Button>
                            <Button variant="ghost" size="sm">
                                {messages.subtleAction}
                            </Button>
                        </div>
                    </Stack>
                </Card>
            </Grid>
        </Section>
    )
}
