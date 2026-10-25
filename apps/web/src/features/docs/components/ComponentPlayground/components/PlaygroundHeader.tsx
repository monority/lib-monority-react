import { useMessages } from '@/shared/i18n'
import { Badge } from '@monority/ui/badge'
import { Button } from '@monority/ui/button'

export interface PlaygroundHeaderProps {
    componentName: string
    onReset: () => void
}

export function PlaygroundHeader({ componentName, onReset }: PlaygroundHeaderProps) {
    const messages = useMessages().docs.playground

    return (
        <div className="component-playground__header">
            <div className="component-playground__title-group">
                <Badge variant="default" tone="accent" size="sm">
                    {messages.badge}
                </Badge>
                <span className="component-playground__component-name docs-preview-label">
                    {componentName}
                </span>
            </div>
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onReset}
                aria-label={messages.resetLabel}
                title={messages.resetLabel}
            >
                {messages.reset}
            </Button>
        </div>
    )
}
