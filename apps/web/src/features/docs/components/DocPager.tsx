import { localizePath, useLocale, useMessages } from '@/shared/i18n'
import { Link } from 'react-router-dom'

export interface DocPagerTarget {
    title: string
    description?: string
    to: string
}

export interface DocPagerProps {
    prev?: DocPagerTarget
    next?: DocPagerTarget
    className?: string
}

export function DocPager({ prev, next, className = '' }: DocPagerProps) {
    const { locale } = useLocale()
    const pagerMessages = useMessages().docs.pager

    if (!prev && !next) return null

    return (
        <nav
            aria-label={pagerMessages.ariaLabel}
            className={`docs-pager ${!prev && next ? 'docs-pager--next-only' : ''} ${className}`.trim()}
        >
            {prev ? (
                <Link
                    to={localizePath(prev.to, locale)}
                    className="docs-pager__link docs-pager__link--prev"
                >
                    <span className="docs-pager__direction">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path
                                d="M10 3.5L5.5 8L10 12.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                vectorEffect="non-scaling-stroke"
                            />
                        </svg>
                        <span>{pagerMessages.previous}</span>
                    </span>
                    <strong className="docs-pager__title">{prev.title}</strong>
                    {prev.description ? (
                        <span className="docs-pager__desc">{prev.description}</span>
                    ) : null}
                </Link>
            ) : null}

            {next ? (
                <Link
                    to={localizePath(next.to, locale)}
                    className="docs-pager__link docs-pager__link--next"
                >
                    <span className="docs-pager__direction">
                        <span>{pagerMessages.next}</span>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path
                                d="M6 3.5L10.5 8L6 12.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                vectorEffect="non-scaling-stroke"
                            />
                        </svg>
                    </span>
                    <strong className="docs-pager__title">{next.title}</strong>
                    {next.description ? (
                        <span className="docs-pager__desc">{next.description}</span>
                    ) : null}
                </Link>
            ) : null}
        </nav>
    )
}
