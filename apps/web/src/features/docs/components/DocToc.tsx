import { useCallback, useEffect, useRef, useState } from 'react'
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
    const sections = document.querySelectorAll<HTMLElement>(
        '.docs-page .docs-section-card, .docs-page section[id]'
    )
    const headings: HeadingInfo[] = []
    const seenIds = new Set<string>()

    for (const section of sections) {
        const titleEl = section.querySelector<HTMLHeadingElement>(
            '.docs-section-card__title, h2, h3'
        )
        if (!titleEl) continue

        // Extraire uniquement le titre propre sans le hash d'ancrage "#"
        const anchorSpan = titleEl.querySelector('.docs-section-card__anchor > span')
        const rawText = anchorSpan?.textContent || titleEl.textContent || ''
        const cleanText = rawText.replace(/#+$/, '').trim()
        if (!cleanText) continue

        // L'ID cible priorise l'ID de la section semantique
        const targetId = section.id || titleEl.id || generateId(cleanText)
        if (!section.id) section.id = targetId

        if (seenIds.has(targetId)) continue
        seenIds.add(targetId)

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
    const isClickScrollingRef = useRef(false)
    const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
    const location = useLocation()

    // Collecte continue et reactive des titres de section
    useEffect(() => {
        let isMounted = true

        function refreshHeadings() {
            if (!isMounted) return
            const collected = collectHeadings()
            if (collected.length > 0) {
                setHeadings(collected)
                const hashId = location.hash ? location.hash.replace('#', '') : ''
                if (hashId && collected.some((h) => h.id === hashId)) {
                    setActiveId(hashId)
                } else {
                    setActiveId((prev) =>
                        collected.some((h) => h.id === prev) ? prev : collected[0]!.id
                    )
                }
            }
        }

        refreshHeadings()
        const t1 = setTimeout(refreshHeadings, 60)
        const t2 = setTimeout(refreshHeadings, 200)

        let observer: MutationObserver | null = null
        const pageContent = document.querySelector('.docs-page, .docs-page-content')
        if (typeof MutationObserver !== 'undefined' && pageContent) {
            observer = new MutationObserver(() => {
                refreshHeadings()
            })
            observer.observe(pageContent, { childList: true, subtree: true })
        }

        return () => {
            isMounted = false
            clearTimeout(t1)
            clearTimeout(t2)
            observer?.disconnect()
        }
    }, [location.pathname, location.hash])

    // Scrollspy deterministe
    useEffect(() => {
        if (headings.length === 0) return

        const READING_LINE_OFFSET = 120 // Header sticky (56px) + marge confortable

        function updateActive() {
            if (isClickScrollingRef.current) return

            const scrollY = window.scrollY
            const scrollHeight = Math.max(
                document.documentElement.scrollHeight,
                document.body.scrollHeight
            )
            const windowHeight = window.innerHeight

            // En tout debut de page (HeroHeader visible), activer la premiere section
            if (scrollY < 60) {
                setActiveId(headings[0]!.id)
                return
            }

            // En toute fin de page (bas de document atteint)
            if (windowHeight + scrollY >= scrollHeight - 20) {
                for (let i = headings.length - 1; i >= 0; i--) {
                    const el = document.getElementById(headings[i]!.id)
                    if (!el) continue
                    const rect = el.getBoundingClientRect()
                    if (rect.top <= windowHeight * 0.75) {
                        setActiveId(headings[i]!.id)
                        return
                    }
                }
                setActiveId(headings[headings.length - 1]!.id)
                return
            }

            // Parcours standard : trouver la section qui intersecte la ligne de lecture
            let matchedId: string | null = null
            for (let i = 0; i < headings.length; i++) {
                const el = document.getElementById(headings[i]!.id)
                if (!el) continue

                const rect = el.getBoundingClientRect()
                // La section chevauche la ligne de lecture
                if (rect.top <= READING_LINE_OFFSET && rect.bottom > READING_LINE_OFFSET) {
                    matchedId = headings[i]!.id
                    break
                }
            }

            // Si aucune section ne chevauche exactement la ligne de lecture (ex: marge entre cartes),
            // prendre la derniere section situee au-dessus de la ligne
            if (!matchedId) {
                for (let i = 0; i < headings.length; i++) {
                    const el = document.getElementById(headings[i]!.id)
                    if (!el) continue

                    const rect = el.getBoundingClientRect()
                    if (rect.top <= READING_LINE_OFFSET) {
                        matchedId = headings[i]!.id
                    } else {
                        break
                    }
                }
            }

            if (matchedId) {
                setActiveId(matchedId)
            }
        }

        updateActive()
        window.addEventListener('scroll', updateActive, { passive: true })

        const unlockScroll = () => {
            isClickScrollingRef.current = false
            if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current)
        }
        window.addEventListener('wheel', unlockScroll, { passive: true })
        window.addEventListener('touchstart', unlockScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', updateActive)
            window.removeEventListener('wheel', unlockScroll)
            window.removeEventListener('touchstart', unlockScroll)
            if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current)
        }
    }, [headings])

    const handleClick = useCallback((id: string) => {
        const el = document.getElementById(id)
        if (el) {
            isClickScrollingRef.current = true
            setActiveId(id)

            // Header sticky (56px) + 24px de marge au-dessus du titre de section = 80px
            const y = Math.max(0, el.getBoundingClientRect().top + window.scrollY - 80)
            window.scrollTo({ top: y, behavior: 'smooth' })

            if (clickTimeoutRef.current) {
                clearTimeout(clickTimeoutRef.current)
            }
            clickTimeoutRef.current = setTimeout(() => {
                isClickScrollingRef.current = false
            }, 800)
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
