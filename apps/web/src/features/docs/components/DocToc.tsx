import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

interface HeadingInfo {
    id: string
    text: string
    level: number
}

function generateId(text: string): string {
    return text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
}

function collectHeadings(): HeadingInfo[] {
    // Cibler uniquement les vraies sections de la page de documentation.
    // Exclure formellement tout element present dans une previsualisation de composant.
    const sections = document.querySelectorAll<HTMLElement>('.docs-page .docs-section-card')
    const headings: HeadingInfo[] = []

    for (const section of sections) {
        const titleEl = section.querySelector<HTMLHeadingElement>('.docs-section-card__title')
        if (!titleEl) continue

        // Extraire uniquement le titre propre sans le hash d'ancrage "#"
        const anchorSpan = titleEl.querySelector('.docs-section-card__anchor > span')
        const rawText = anchorSpan?.textContent || titleEl.textContent || ''
        const cleanText = rawText.replace(/#+$/, '').trim()
        if (!cleanText) continue

        // L'ID cible priorise l'ID de la section semantique
        const targetId = section.id || titleEl.id || generateId(cleanText)
        if (!section.id) section.id = targetId

        headings.push({
            id: targetId,
            text: cleanText,
            level: 2,
        })
    }

    return headings
}

export function DocToc() {
    const [headings, setHeadings] = useState<HeadingInfo[]>([])
    const [activeId, setActiveId] = useState<string>('')
    const location = useLocation()

    useEffect(() => {
        // Collect headings on mount and whenever location.pathname changes
        const timer = setTimeout(() => {
            const collected = collectHeadings()
            setHeadings(collected)
            if (collected.length > 0) {
                setActiveId(collected[0]!.id)
            }
        }, 20)
        return () => clearTimeout(timer)
    }, [location.pathname])

    useEffect(() => {
        if (headings.length === 0) return

        const HEADER_OFFSET = 100

        function updateActive() {
            let current = headings[0]!.id

            for (let i = 0; i < headings.length; i++) {
                const el = document.getElementById(headings[i]!.id)
                if (!el) continue

                const rect = el.getBoundingClientRect()
                if (rect.top <= HEADER_OFFSET) {
                    current = headings[i]!.id
                } else {
                    break
                }
            }

            if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 50) {
                current = headings[headings.length - 1]!.id
            }

            setActiveId(current)
        }

        updateActive()
        window.addEventListener('scroll', updateActive, { passive: true })
        return () => window.removeEventListener('scroll', updateActive)
    }, [headings])

    const handleClick = useCallback((id: string) => {
        const el = document.getElementById(id)
        if (el) {
            // Decalage pour tenir compte du header sticky (3.5rem = 56px + 20px de marge)
            const y = el.getBoundingClientRect().top + window.scrollY - 76
            window.scrollTo({ top: y, behavior: 'smooth' })
        }
    }, [])

    if (headings.length === 0) return null

    return (
        <nav className="docs-toc" aria-label="Table of contents">
            <h4 className="docs-toc__title">On this page</h4>
            <ul className="docs-toc__list">
                {headings.map((h) => (
                    <li key={h.id} data-level={h.level}>
                        <a
                            href={'#' + h.id}
                            className={
                                'docs-toc__link' +
                                (h.id === activeId ? ' docs-toc__link--active' : '')
                            }
                            aria-current={h.id === activeId ? 'location' : undefined}
                            onClick={(e) => {
                                e.preventDefault()
                                handleClick(h.id)
                            }}
                        >
                            {h.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
