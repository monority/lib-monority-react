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

const ACCENTS = [
    { value: 'neutral', label: 'Neutral', hue: '0', chroma: '0' },
    { value: 'violet', label: 'Violet', hue: '295', chroma: '0.18' },
    { value: 'emerald', label: 'Emerald', hue: '152', chroma: '0.14' },
    { value: 'sky', label: 'Sky', hue: '230', chroma: '0.16' },
    { value: 'amber', label: 'Amber', hue: '75', chroma: '0.16' },
]

const RADII = [
    { value: 'none', label: 'Sharp', val: '0px' },
    { value: 'sm', label: 'Subtle', val: '0.25rem' },
    { value: 'md', label: 'Balanced', val: '0.5rem' },
    { value: 'lg', label: 'Round', val: '1rem' },
]

export function HomeLiveTokens() {
    const [accent, setAccent] = useState('violet')
    const [radius, setRadius] = useState('md')

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
                    Live Design Tokens
                </Title>
                <Text tone="muted" size="md">
                    Tweak system parameters in real time. Notice how every control, surface, and
                    feedback state inherits changes coherently.
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
                                Accent Palette
                            </Text>
                            <ToggleGroup
                                value={accent}
                                onValueChange={(val) => {
                                    const v = Array.isArray(val) ? (val[0] ?? '') : String(val)
                                    if (v) setAccent(v)
                                }}
                                items={ACCENTS.map((a) => ({ value: a.value, label: a.label }))}
                                aria-label="Accent switcher"
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
                                Geometry (Corner Radius)
                            </Text>
                            <ToggleGroup
                                value={radius}
                                onValueChange={(val) => {
                                    const v = Array.isArray(val) ? (val[0] ?? '') : String(val)
                                    if (v) setRadius(v)
                                }}
                                items={RADII.map((r) => ({ value: r.value, label: r.label }))}
                                aria-label="Radius switcher"
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
                                Live Component Preview
                            </Title>
                            <Badge variant="primary">Active Theme</Badge>
                        </div>

                        <Input
                            label="Email Address"
                            placeholder="jane@company.com"
                            defaultValue="design@monority.dev"
                        />

                        <Progress value={82} label="Deployment pipeline" showValue tone="success" />

                        <div
                            style={{ display: 'flex', gap: 'var(--mr-space-2)', flexWrap: 'wrap' }}
                        >
                            <Button variant="primary" size="sm">
                                Primary Action
                            </Button>
                            <Button variant="secondary" size="sm">
                                Secondary
                            </Button>
                            <Button variant="ghost" size="sm">
                                Subtle
                            </Button>
                        </div>
                    </Stack>
                </Card>
            </Grid>
        </Section>
    )
}
