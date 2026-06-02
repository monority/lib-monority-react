import { useCallback, useEffect, useState } from 'react'

interface HeadingInfo {
    id: string
    text: string
    level: number
}

function generateId(text: string): string {
    return text
        .toLowerCase()
        .replace(/s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
}

function collectHeadings(): HeadingInfo[] {
    const elements = document.querySelectorAll<HTMLHeadingElement>('.docs-page h2, .docs-page h3')
    const headings: HeadingInfo[] = []

    elements.forEach((el) => {
        if (!el.id) {
            el.id = generateId(el.textContent || '')
        }
        headings.push({
            id: el.id,
            text: el.textContent || '',
            level: el.tagName === 'H2' ? 2 : 3,
        })
    })

    return headings
}

export function DocToc() {
    const [headings, setHeadings] = useState<HeadingInfo[]>([])
    const [activeId, setActiveId] = useState<string>('')

    useEffect(() => {
        const collected = collectHeadings()
        setHeadings(collected)
        if (collected.length > 0) {
            setActiveId(collected[0]!.id)
        }
    }, [])

    // Section-boundary active detection
    // Each heading is active when scrollY + OFFSET falls within [heading.offsetTop, nextHeading.offsetTop)
    useEffect(() => {
        if (headings.length === 0) return

        const OFFSET = 16 // small breathing room, no fixed header

        function updateActive() {
            const scrollPosition = window.scrollY + OFFSET
            let current = headings[0]!.id

            for (let i = 0; i < headings.length; i++) {
                const h = headings[i]!
                const el = document.getElementById(h.id)
                if (!el) continue

                const nextOffset =
                    i < headings.length - 1
                        ? (document.getElementById(headings[i + 1]!.id)?.offsetTop ?? Infinity)
                        : Infinity

                // Active if scroll position is within this heading's section
                if (el.offsetTop <= scrollPosition && scrollPosition < nextOffset) {
                    current = h.id
                    break
                }
            }

            // Fallback: if scrolled past all headings, activate the last one
            const lastEl = document.getElementById(headings[headings.length - 1]!.id)
            if (lastEl && window.scrollY + window.innerHeight >= document.body.scrollHeight - 50) {
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
            const y = el.getBoundingClientRect().top + window.scrollY - 16
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
