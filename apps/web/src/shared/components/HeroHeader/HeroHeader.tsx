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
            {kicker && <p className="hero-header__kicker">{kicker}</p>}
            <h1 className="hero-header__title">{title}</h1>
            {description && <p className="hero-header__description">{description}</p>}
            {actions && <div className="hero-header__actions">{actions}</div>}
        </PageHeader>
    )
}
