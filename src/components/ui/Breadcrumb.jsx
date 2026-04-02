import { cn } from '@/lib/cn'

export function Breadcrumb({ items = [], separator = '/', className }) {
    return (
        <nav className={cn('ui-breadcrumb', className)} aria-label="Fil d'Ariane">
            <ol className="ui-breadcrumb__list">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1

                    return (
                        <li key={`${item.label}-${index}`} className="ui-breadcrumb__item">
                            {item.href && !isLast ? (
                                <a className="ui-breadcrumb__link" href={item.href}>
                                    {item.label}
                                </a>
                            ) : (
                                <span
                                    className={cn('ui-breadcrumb__current', !isLast && 'ui-breadcrumb__link')}
                                    aria-current={isLast ? 'page' : undefined}
                                >
                                    {item.label}
                                </span>
                            )}
                            {!isLast ? (
                                <span className="ui-breadcrumb__separator" aria-hidden="true">
                                    {separator}
                                </span>
                            ) : null}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}
