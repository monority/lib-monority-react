import { Button } from '@monority/ui/button'

export interface MoodboardSidebarHeaderProps {
    onCopy: () => void
    onReset: () => void
    copied: boolean
}

export function MoodboardSidebarHeader({ onCopy, onReset, copied }: MoodboardSidebarHeaderProps) {
    return (
        <header className="moodboard-sidebar__header">
            <div className="moodboard-sidebar__title">
                <span className="moodboard-kicker">MONORITY UI</span>
                <strong>Design Studio</strong>
            </div>
            <div className="moodboard-sidebar__actions">
                <Button variant="ghost" size="sm" onClick={onCopy} data-testid="moodboard-copy">
                    {copied ? 'Copied' : 'Copy'}
                </Button>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={onReset}
                    data-testid="moodboard-reset"
                >
                    Reset
                </Button>
            </div>
        </header>
    )
}
