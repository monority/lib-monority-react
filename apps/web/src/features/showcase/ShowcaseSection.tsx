import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface ShowcaseSectionProps {
    eyebrow: string
    title: string
    description: string
    playgroundSlug?: string
    docsPath?: string
    children: ReactNode
}

export function ShowcaseSection({
    eyebrow,
    title,
    description,
    playgroundSlug,
    docsPath,
    children,
}: ShowcaseSectionProps) {
    return (
        <section className="sc-section" aria-labelledby={`sc-${eyebrow}`}>
            <div className="sc-section__heading">
                <p className="sc-eyebrow">{eyebrow}</p>
                <h2 id={`sc-${eyebrow}`} className="sc-title">
                    {title}
                </h2>
                <p className="sc-description">{description}</p>
                <div className="sc-links">
                    {playgroundSlug && (
                        <Link className="sc-link" to={`/playground?component=${playgroundSlug}`}>
                            Try in Playground
                        </Link>
                    )}
                    {docsPath && (
                        <Link className="sc-link sc-link--muted" to={docsPath}>
                            Read the docs
                        </Link>
                    )}
                </div>
            </div>
            <div className="sc-section__canvas">{children}</div>
        </section>
    )
}
