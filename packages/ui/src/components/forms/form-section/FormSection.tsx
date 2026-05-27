import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { Card } from '@/components/display/card/Card'
import { Title } from '@/components/typography/title/Title'
import { Text } from '@/components/typography/text/Text'
import type { FormSectionProps } from './FormSection.types'

export const FormSection = forwardRef<HTMLDivElement, FormSectionProps>(
  function FormSection({ title, description, meta, actions, children, className }, ref) {
    return (
      <div ref={ref} className={cn('mr-form-section', className)} data-mr-form-section="">
        <Card>
          {title || description || meta ? (
            <div className="mr-form-section__header">
              <div className="mr-form-section__header-text">
                {title ? <Title as="h3">{title}</Title> : null}
                {description ? <Text tone="muted">{description}</Text> : null}
              </div>
              <div className="mr-form-section__header-meta">
                {meta}
              </div>
            </div>
          ) : null}
          {actions ? (
            <div className="mr-form-section__actions">{actions}</div>
          ) : null}
          {children ? (
            <div className="mr-form-section__body">{children}</div>
          ) : null}
        </Card>
      </div>
    )
  },
)

export type { FormSectionProps } from './FormSection.types'
