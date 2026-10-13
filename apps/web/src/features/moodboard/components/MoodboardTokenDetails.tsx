import { PreCode, Text, designConfigToJSON, type DesignConfig } from '@monority/ui'

export interface MoodboardTokenDetailsProps {
    config: DesignConfig
}

export function MoodboardTokenDetails({ config }: MoodboardTokenDetailsProps) {
    return (
        <details
            style={{
                borderTop: '1px solid var(--mr-border-subtle)',
                paddingTop: 'var(--mr-space-3)',
            }}
        >
            <summary style={{ cursor: 'pointer', listStyle: 'none' }}>
                <Text size="sm" tone="muted" as="span">
                    Token Details
                </Text>
            </summary>
            <div style={{ marginTop: 'var(--mr-space-2)' }}>
                <PreCode size="sm" copyable copyValue={designConfigToJSON(config)}>
                    {designConfigToJSON(config)}
                </PreCode>
            </div>
        </details>
    )
}
