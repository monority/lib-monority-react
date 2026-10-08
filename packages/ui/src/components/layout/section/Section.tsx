import { cn } from '@/lib/cn'
import type { SectionProps } from './Section.types'

export function Section({
    ref,
    className,
    spacing = 'md',
    variant = 'default',
    as,
    title,
    titleAs: TitleTag = 'h2',
    children,
    ...props
}: SectionProps) {
    const Component = as ?? 'section'

    return (
        <Component
            ref={ref}
            className={cn('mr-section', className)}
            data-spacing={spacing}
            data-variant={variant}
            {...props}
        >
            {title != null && <TitleTag className="mr-section__title">{title}</TitleTag>}
            {children}
        </Component>
    )
}
