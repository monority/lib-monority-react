import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { Title } from '@/components/typography/title/Title'
import { Text } from '@/components/typography/text/Text'
import type { FormSectionProps } from './FormSection.types'

export const FormSection = forwardRef<HTMLDivElement, FormSectionProps>(
  function FormSection(
    { title, description, meta, actions, children, className },
    ref,
  ) {
    const hasHeader = Boolean(title || description || meta)

    return (
      <div
        ref={ref}
        className={cn('mr-form-section', className)}
        data-mr-form-section=""
        data-has-actions={actions ? 'true' : undefined}
      >
        {hasHeader ? (
          <div className="mr-form-section__header">
            <div className="mr-form-section__header-text">
              {title ? (
                <Title
                  as="h3"
                  size="sm"
                  className="mr-form-section__header-title"
                >
                  {title}
                </Title>
              ) : null}
              {description ? (
                <Text
                  tone="muted"
                  className="mr-form-section__header-description"
                >
                  {description}
                </Text>
              ) : null}
            </div>
            {meta ? (
              <div className="mr-form-section__header-end">
                <span className="mr-form-section__header-meta">{meta}</span>
              </div>
            ) : null}
          </div>
        ) : null}
        {children ? <div className="mr-form-section__body">{children}</div> : null}
        {actions ? <div className="mr-form-section__footer">{actions}</div> : null}
      </div>
    )
  },
)

export type { FormSectionProps } from './FormSection.types'
