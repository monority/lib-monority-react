import { designConfigToJSON, type DesignConfig } from '@monority/ui'

export interface MoodboardTokenDetailsProps {
    config: DesignConfig
}

export function MoodboardTokenDetails({ config }: MoodboardTokenDetailsProps) {
    return (
        <details className="moodboard-sidebar__tokens">
            <summary className="moodboard-kicker">Token Details</summary>
            <pre className="moodboard-sidebar__json">{designConfigToJSON(config)}</pre>
        </details>
    )
}
