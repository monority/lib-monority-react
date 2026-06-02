import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { Title } from '@/components/typography/title/Title'
import { Text } from '@/components/typography/text/Text'
import type { EmptyStateProps } from './EmptyState.types'

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState(
    {
      title,
      description,
      icon,
      action,
      secondaryAction,
      className,
      ...props
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn('mr-empty-state', className)}
        data-has-icon={icon ? 'true' : undefined}
        data-has-actions={action || secondaryAction ? 'true' : undefined}
        {...props}
      >
        {icon ? (
          <div className="mr-empty-state__icon" aria-hidden="true">
            {icon}
          </div>
        ) : null}
        <div className="mr-empty-state__content">
          <Title as="h3" size="sm" className="mr-empty-state__title">
            {title}
          </Title>
          {description ? (
            <Text tone="muted" className="mr-empty-state__description">
              {description}
            </Text>
          ) : null}
        </div>
        {action || secondaryAction ? (
          <div className="mr-empty-state__actions">
            {action}
            {secondaryAction}
          </div>
        ) : null}
      </div>
    )
  },
)

export type { EmptyStateProps } from './EmptyState.types'
