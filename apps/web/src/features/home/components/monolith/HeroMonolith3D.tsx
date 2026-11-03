import { useMessages } from '@/shared/i18n'
import { useEffect, useRef, useState } from 'react'
import { MonolithPoster } from './MonolithPoster'
import type { MonolithSceneController } from './monolith-scene'
import { readMonolithTokens } from './monolith-tokens'
import './HeroMonolith3D.css'

export function HeroMonolith3D() {
    const ariaLabel = useMessages().home.hero.monolithAriaLabel
    const rootRef = useRef<HTMLDivElement | null>(null)
    const stageRef = useRef<HTMLDivElement | null>(null)
    const sceneRef = useRef<MonolithSceneController | null>(null)

    const [ready, setReady] = useState(false)
    const [dragging, setDragging] = useState(false)

    useEffect(() => {
        const rootEl = rootRef.current
        const stageEl = stageRef.current
        if (!rootEl || !stageEl || typeof window === 'undefined') return

        if (
            typeof window.matchMedia === 'function' &&
            window.matchMedia('(forced-colors: active)').matches
        ) {
            return
        }

        let cancelled = false
        let resizeObserver: ResizeObserver | null = null
        let mutationObserver: MutationObserver | null = null
        let intersectionObserver: IntersectionObserver | null = null

        const finePointerMedia =
            typeof window.matchMedia === 'function'
                ? window.matchMedia('(hover: hover) and (pointer: fine)')
                : null
        const reducedMotionMedia =
            typeof window.matchMedia === 'function'
                ? window.matchMedia('(prefers-reduced-motion: reduce)')
                : null
        const colorSchemeMedia =
            typeof window.matchMedia === 'function'
                ? window.matchMedia('(prefers-color-scheme: dark)')
                : null

        const heroSection = rootEl.closest('.mr-hero') as HTMLElement | null

        const onHeroPointerMove = (e: PointerEvent) => {
            if (!finePointerMedia?.matches || !sceneRef.current) return
            const targetBox = (heroSection ?? rootEl).getBoundingClientRect()
            if (targetBox.width <= 0 || targetBox.height <= 0) return
            const nx = ((e.clientX - targetBox.left) / targetBox.width) * 2 - 1
            const ny = ((e.clientY - targetBox.top) / targetBox.height) * 2 - 1
            sceneRef.current.setPointerNormalized(nx, ny)
        }

        const onHeroPointerLeave = () => {
            sceneRef.current?.clearPointer()
        }

        const syncTokens = () => {
            if (!rootRef.current || !sceneRef.current) return
            sceneRef.current.setTokens(readMonolithTokens(rootRef.current))
        }

        import('./monolith-scene')
            .then(({ createMonolithScene }) => {
                if (cancelled || !stageRef.current || !rootRef.current) return

                const initialTokens = readMonolithTokens(rootRef.current)
                const controller = createMonolithScene(stageRef.current, initialTokens, {
                    onReady: () => {
                        if (!cancelled) {
                            setReady(true)
                        }
                    },
                    onDragChange: (isDragging) => {
                        if (!cancelled) {
                            setDragging(isDragging)
                        }
                    },
                })

                if (!controller) return
                sceneRef.current = controller

                if (typeof ResizeObserver !== 'undefined') {
                    resizeObserver = new ResizeObserver(() => {
                        controller.resize()
                    })
                    resizeObserver.observe(stageRef.current)
                }

                if (typeof IntersectionObserver !== 'undefined') {
                    intersectionObserver = new IntersectionObserver(
                        (entries) => {
                            const entry = entries[0]
                            if (entry) {
                                controller.setViewportVisible(entry.isIntersecting)
                            }
                        },
                        { threshold: 0.05 }
                    )
                    intersectionObserver.observe(rootRef.current)
                }

                if (typeof MutationObserver !== 'undefined') {
                    mutationObserver = new MutationObserver(syncTokens)
                    mutationObserver.observe(document.documentElement, {
                        attributes: true,
                        attributeFilter: [
                            'data-theme',
                            'data-brand',
                            'data-density',
                            'data-motion',
                            'style',
                            'class',
                        ],
                    })
                }

                const pointerHost = heroSection ?? rootRef.current
                pointerHost.addEventListener('pointermove', onHeroPointerMove, { passive: true })
                pointerHost.addEventListener('pointerleave', onHeroPointerLeave, { passive: true })

                reducedMotionMedia?.addEventListener('change', syncTokens)
                colorSchemeMedia?.addEventListener('change', syncTokens)
            })
            .catch(() => {
                /* En cas d'indisponibilité WebGL, MonolithPoster reste affiché */
            })

        return () => {
            cancelled = true
            const pointerHost = heroSection ?? rootEl
            pointerHost.removeEventListener('pointermove', onHeroPointerMove)
            pointerHost.removeEventListener('pointerleave', onHeroPointerLeave)
            reducedMotionMedia?.removeEventListener('change', syncTokens)
            colorSchemeMedia?.removeEventListener('change', syncTokens)
            mutationObserver?.disconnect()
            intersectionObserver?.disconnect()
            resizeObserver?.disconnect()
            sceneRef.current?.dispose()
            sceneRef.current = null
        }
    }, [])

    return (
        <div
            ref={rootRef}
            className="mr-monolith"
            role="img"
            aria-label={ariaLabel}
            data-webgl-ready={ready ? 'true' : 'false'}
        >
            <MonolithPoster hidden={ready} />
            <div
                ref={stageRef}
                className="mr-monolith__stage"
                data-ready={ready ? 'true' : 'false'}
                data-dragging={dragging ? 'true' : 'false'}
            />
        </div>
    )
}
