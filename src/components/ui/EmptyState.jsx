import { cn } from '@/lib/cn'
import { Stack } from './Stack'
import { Text } from './Text'
import { Title } from './Title'

export function EmptyState({ title, description, icon, action, secondaryAction, className }) {
    return (
        <div className={cn('ui-empty-state ui-card ui-card--md', className)}>
            <Stack gap="s">
                {icon ? <div className="ui-empty-state__icon" aria-hidden="true">{icon}</div> : null}
                <Title as="h3" size="sm">
                    {title}
                </Title>
                {description ? <Text tone="base">{description}</Text> : null}
                {action || secondaryAction ? (
                    <div className="cluster ui-empty-state__actions">
                        {action}
                        {secondaryAction}
                    </div>
                ) : null}
            </Stack>
        </div>
    )
}
