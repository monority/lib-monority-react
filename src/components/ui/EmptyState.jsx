import { cn } from '@/lib/cn'
import { Stack } from './Stack'
import { Text } from './Text'
import { Title } from './Title'

export function EmptyState({ title, description, action, className }) {
    return (
        <div className={cn('ui-empty-state ui-card', className)}>
            <Stack gap="s">
                <Title as="h3" size="sm">
                    {title}
                </Title>
                {description ? <Text tone="base">{description}</Text> : null}
                {action}
            </Stack>
        </div>
    )
}
