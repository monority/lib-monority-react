import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { Card } from '@/components/display/card/Card'
import { Title } from '@/components/typography/title/Title'
import { Text } from '@/components/typography/text/Text'
import type { FormSectionProps } from './FormSection.types'

export const FormSection = forwardRef<HTMLDivElement, FormSectionProps>(
  function FormSection(
    { title, description, meta, actions, children, className },
    ref,
  ) {
    const hasHeader = title != null || description != null || meta != null

    return (
      <Card
        ref={ref}
        className={cn('mr-form-section', className)}
        padding="md"
        data-mr-form-section=""
         data-has-actions={actions != null ? 'true' : undefined}
      >
        {hasHeader ? (
          <div className="mr-form-section__header">
            <div className="mr-form-section__header-text">
               {title != null ? (
                <Title
                  as="h3"
                  size="sm"
                  className="mr-form-section__header-title"
                >
                  {title}
                </Title>
              ) : null}
               {description != null ? (
                <Text
                  tone="muted"
                  className="mr-form-section__header-description"
                >
                  {description}
                </Text>
              ) : null}
            </div>
             {meta != null ? (
              <div className="mr-form-section__header-end">
                <span className="mr-form-section__header-meta">{meta}</span>
              </div>
            ) : null}
          </div>
        ) : null}
         {children != null ? <div className="mr-form-section__body">{children}</div> : null}
         {actions != null ? <div className="mr-form-section__footer">{actions}</div> : null}
      </Card>
    )
  },
)

export type { FormSectionProps } from './FormSection.types'
