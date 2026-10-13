import {
    Button,
    PreCode,
    Separator,
    Stack,
    Text,
    Title,
    designConfigToJSON,
    type DesignConfig,
} from '@monority/ui'
import { MoodboardSidebarControls } from './components/MoodboardSidebarControls'

export interface MoodboardSidebarProps {
    config: DesignConfig
    onConfig: <K extends keyof DesignConfig>(key: K, value: DesignConfig[K]) => void
    onReset: () => void
    onCopy: () => void
    copied: boolean
}

export function MoodboardSidebar({
    config,
    onConfig,
    onReset,
    onCopy,
    copied,
}: MoodboardSidebarProps) {
    return (
        <Stack
            gap="lg"
            role="region"
            aria-label="Design configuration"
            style={{
                padding: 'var(--mr-space-4)',
                boxSizing: 'border-box',
                maxWidth: '100%',
                overflowX: 'hidden',
            }}
        >
            <Stack gap="xs">
                <Text
                    tone="muted"
                    size="sm"
                    style={{
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        fontSize: '0.6875rem',
                    }}
                >
                    MONORITY UI
                </Text>
                <Title as="h2" size="md">
                    Design Studio
                </Title>
                <Text tone="muted" size="sm">
                    Configure tokens live and inspect the resolved design contracts.
                </Text>
            </Stack>

            <div style={{ display: 'flex', gap: 'var(--mr-space-2)' }}>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={onReset}
                    data-testid="moodboard-reset"
                    style={{ flex: 1 }}
                >
                    Reset
                </Button>
                <Button
                    variant="primary"
                    size="sm"
                    onClick={onCopy}
                    data-testid="moodboard-copy"
                    style={{ flex: 1 }}
                >
                    {copied ? 'Copied!' : 'Copy JSON'}
                </Button>
            </div>

            <Separator />

            <MoodboardSidebarControls config={config} onConfig={onConfig} />

            <Separator />

            <details
                style={{
                    borderRadius: 'var(--mr-radius-md)',
                    border: '1px solid var(--mr-border-subtle)',
                    padding: 'var(--mr-space-3)',
                    background: 'var(--mr-bg-sunken)',
                }}
            >
                <summary
                    style={{
                        cursor: 'pointer',
                        fontSize: 'var(--mr-font-size-sm)',
                        fontWeight: 600,
                        color: 'var(--mr-text-primary)',
                        userSelect: 'none',
                    }}
                >
                    Token Details
                </summary>
                <div style={{ marginTop: 'var(--mr-space-3)' }}>
                    <PreCode language="json">{designConfigToJSON(config)}</PreCode>
                </div>
            </details>
        </Stack>
    )
}
