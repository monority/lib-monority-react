import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { Title } from '@/components/typography/title/Title'
import { Text } from '@/components/typography/text/Text'
import type { EmptyStateProps } from './EmptyState.types'

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState(
    { title, description, icon, action, secondaryAction, className, ...props },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn('mr-empty-state mr-card mr-card--md', className)}
        {...props}
      >
        {icon ? <div className="mr-empty-state__icon" aria-hidden="true">{icon}</div> : null}
        <Title as="h3" size="sm">{title}</Title>
        {description ? <Text tone="base">{description}</Text> : null}
        {action || secondaryAction ? (
          <div className="mr-empty-state__actions">
            {action}{secondaryAction}
          </div>
        ) : null}
      </div>
    )
  },
)

export type { EmptyStateProps } from './EmptyState.types'
