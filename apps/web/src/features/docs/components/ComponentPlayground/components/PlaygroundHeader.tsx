import { Badge } from '@monority/ui/badge'
import { Button } from '@monority/ui/button'

export interface PlaygroundHeaderProps {
    componentName: string
    onReset: () => void
}

export function PlaygroundHeader({ componentName, onReset }: PlaygroundHeaderProps) {
    return (
        <div className="component-playground__header">
            <div className="component-playground__title-group">
                <Badge variant="default" tone="accent" size="sm">
                    Playground
                </Badge>
                <span className="component-playground__component-name">{componentName}</span>
            </div>
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onReset}
                aria-label="Reset"
                title="Reset"
            >
                Reset
            </Button>
        </div>
    )
}
