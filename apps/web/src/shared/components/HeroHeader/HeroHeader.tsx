import type { ReactNode, Ref } from 'react'
import { PageHeader } from '@monority/ui/page-header'
import './HeroHeader.css'

export interface HeroHeaderProps {
    kicker?: string
    title: ReactNode
    description?: ReactNode
    actions?: ReactNode
    align?: 'left' | 'center'
    size?: 'sm' | 'md' | 'lg'
    className?: string
    ref?: Ref<HTMLElement>
}

export function HeroHeader({
    kicker,
    title,
    description,
    actions,
    align = 'left',
    size = 'md',
    className = '',
    ref,
}: HeroHeaderProps) {
    const classNames = [
        'hero-header',
        `hero-header--${align}`,
        `hero-header--size-${size}`,
        className,
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <PageHeader ref={ref} className={classNames}>
            {kicker && (
                <PageHeader.Kicker className="hero-header__kicker">{kicker}</PageHeader.Kicker>
            )}
            <PageHeader.Title as="h1" className="hero-header__title">
                {title}
            </PageHeader.Title>
            {description && (
                <PageHeader.Description className="hero-header__description">
                    {description}
                </PageHeader.Description>
            )}
            {actions && (
                <PageHeader.Actions className="hero-header__actions">{actions}</PageHeader.Actions>
            )}
        </PageHeader>
    )
}
