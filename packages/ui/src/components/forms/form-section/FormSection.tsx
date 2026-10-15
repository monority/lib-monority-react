import { cn } from '@/lib/cn'
import { Card } from '@/components/display/card/Card'
import { Title } from '@/components/typography/title/Title'
import { Text } from '@/components/typography/text/Text'
import type {
    FormSectionBodyProps,
    FormSectionDescriptionProps,
    FormSectionFooterProps,
    FormSectionHeaderProps,
    FormSectionMetaProps,
    FormSectionProps,
    FormSectionTitleProps,
} from './FormSection.types'

export function FormSectionHeader({ ref, className, children, ...props }: FormSectionHeaderProps) {
    return (
        <div ref={ref} className={cn('mr-form-section__header', className)} {...props}>
            {children}
        </div>
    )
}

export function FormSectionTitle({
    ref,
    as: Tag = 'h3',
    className,
    children,
    ...props
}: FormSectionTitleProps) {
    return (
        <Title
            as={Tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'}
            size="sm"
            ref={ref}
            className={cn('mr-form-section__header-title', className)}
            {...props}
        >
            {children}
        </Title>
    )
}

export function FormSectionDescription({
    ref,
    className,
    children,
    ...props
}: FormSectionDescriptionProps) {
    return (
        <Text
            ref={ref}
            tone="muted"
            className={cn('mr-form-section__header-description', className)}
            {...props}
        >
            {children}
        </Text>
    )
}

export function FormSectionMeta({ ref, className, children, ...props }: FormSectionMetaProps) {
    return (
        <div ref={ref} className={cn('mr-form-section__header-end', className)} {...props}>
            <span className="mr-form-section__header-meta">{children}</span>
        </div>
    )
}

export function FormSectionBody({ ref, className, children, ...props }: FormSectionBodyProps) {
    return (
        <div ref={ref} className={cn('mr-form-section__body', className)} {...props}>
            {children}
        </div>
    )
}

export function FormSectionFooter({ ref, className, children, ...props }: FormSectionFooterProps) {
    return (
        <div ref={ref} className={cn('mr-form-section__footer', className)} {...props}>
            {children}
        </div>
    )
}

export function FormSection({
    ref,
    title,
    description,
    meta,
    actions,
    children,
    className,
    ...props
}: FormSectionProps) {
    const hasHeader = title != null || description != null || meta != null

    return (
        <Card
            ref={ref}
            className={cn('mr-form-section', className)}
            padding="md"
            data-mr-form-section=""
            data-has-actions={actions != null ? 'true' : undefined}
            {...props}
        >
            {hasHeader ? (
                <div className="mr-form-section__header">
                    <div className="mr-form-section__header-text">
                        {title != null ? (
                            <Title as="h3" size="sm" className="mr-form-section__header-title">
                                {title}
                            </Title>
                        ) : null}
                        {description != null ? (
                            <Text tone="muted" className="mr-form-section__header-description">
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
            {hasHeader || actions != null ? (
                children != null ? (
                    <div className="mr-form-section__body">{children}</div>
                ) : null
            ) : (
                children
            )}
            {actions != null ? <div className="mr-form-section__footer">{actions}</div> : null}
        </Card>
    )
}

FormSection.Header = FormSectionHeader
FormSection.Title = FormSectionTitle
FormSection.Description = FormSectionDescription
FormSection.Meta = FormSectionMeta
FormSection.Body = FormSectionBody
FormSection.Footer = FormSectionFooter
FormSection.Actions = FormSectionFooter

export { FormSectionFooter as FormSectionActions }

export type {
    FormSectionProps,
    FormSectionHeaderProps,
    FormSectionTitleProps,
    FormSectionDescriptionProps,
    FormSectionMetaProps,
    FormSectionBodyProps,
    FormSectionFooterProps,
} from './FormSection.types'
