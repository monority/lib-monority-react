import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Stack } from '@/components/layout/stack/Stack'
import { Text } from '@/components/typography/text/Text'
import { Title } from '@/components/typography/title/Title'

export interface EmptyStateProps { title: ReactNode; description?: ReactNode; icon?: ReactNode; action?: ReactNode; secondaryAction?: ReactNode; className?: string }

export function EmptyState({ title, description, icon, action, secondaryAction, className }: EmptyStateProps) {
  return (
    <div className={cn('ui-empty-state ui-card ui-card--md', className)}>
      <Stack gap="s">
        {icon ? <div className="ui-empty-state__icon" aria-hidden="true">{icon}</div> : null}
        <Title as="h3" size="sm">{title}</Title>
        {description ? <Text tone="base">{description}</Text> : null}
        {action || secondaryAction ? <div className="cluster ui-empty-state__actions">{action}{secondaryAction}</div> : null}
      </Stack>
    </div>
  )
}
