import { OVERLAY_ARROW_PADDING, OVERLAY_OFFSET, OVERLAY_VIEWPORT_GUTTER } from '@/lib/constants'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

export type FloatingSide = 'top' | 'bottom' | 'left' | 'right'
export type FloatingAlign = 'start' | 'center' | 'end'

export interface UseFloatingPositionOptions {
    side?: FloatingSide
    align?: FloatingAlign
    sideOffset?: number
    alignOffset?: number
    arrow?: boolean
    arrowPadding?: number
    viewportPadding?: number
    enabled?: boolean
    matchWidth?: boolean
}

export interface FloatingPositionResult {
    position: { top: number; left: number; width?: number }
    actualSide: FloatingSide
    actualAlign: FloatingAlign
    arrowPosition: { left?: number; top?: number }
    positioned: boolean
    updatePosition: () => void
}

/**
 * useFloatingPosition calcule et synchronise le positionnement absolu/fixe d'un overlay flottant
 * (DropdownMenu, Popover, HoverCard, Tooltip) ancré à un déclencheur, avec évitement de collisions
 * et respect strict des limites du viewport.
 */
export function useFloatingPosition(
    triggerRef: React.RefObject<Element | null> | React.MutableRefObject<Element | null>,
    contentRef: React.RefObject<HTMLElement | null> | React.MutableRefObject<HTMLElement | null>,
    options: UseFloatingPositionOptions = {}
): FloatingPositionResult {
    const {
        side = 'bottom',
        align = 'center',
        sideOffset = OVERLAY_OFFSET,
        alignOffset = 0,
        arrow = false,
        arrowPadding = OVERLAY_ARROW_PADDING,
        viewportPadding = OVERLAY_VIEWPORT_GUTTER,
        enabled = true,
        matchWidth = false,
    } = options

    const [position, setPosition] = useState<{ top: number; left: number; width?: number }>({
        top: 0,
        left: 0,
    })
    const [actualSide, setActualSide] = useState<FloatingSide>(side)
    const [actualAlign, setActualAlign] = useState<FloatingAlign>(align)
    const [arrowPosition, setArrowPosition] = useState<{ left?: number; top?: number }>({})
    const [positioned, setPositioned] = useState(false)
    const frameIdRef = useRef<number | null>(null)

    const updatePosition = useCallback(() => {
        const triggerEl = triggerRef.current
        const contentEl = contentRef.current
        if (!triggerEl || !contentEl) return

        const anchorRect = triggerEl.getBoundingClientRect()
        const computedWidth = matchWidth ? anchorRect.width : undefined
        // Utiliser offsetWidth / offsetHeight pour ne pas subir les déformations de scale CSS pendant l'animation
        const floatingWidth = matchWidth
            ? anchorRect.width
            : contentEl.offsetWidth || contentEl.getBoundingClientRect().width || 0
        const floatingHeight =
            contentEl.offsetHeight || contentEl.getBoundingClientRect().height || 0

        const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 1024
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 768

        // Espace disponible de chaque côté
        const spaceTop = anchorRect.top - sideOffset - viewportPadding
        const spaceBottom = viewportHeight - anchorRect.bottom - sideOffset - viewportPadding
        const spaceLeft = anchorRect.left - sideOffset - viewportPadding
        const spaceRight = viewportWidth - anchorRect.right - sideOffset - viewportPadding

        // Évitement de collision : bascule vers le côté opposé si le côté préféré manque d'espace
        let computedSide = side
        if (side === 'bottom' && spaceBottom < floatingHeight && spaceTop > spaceBottom) {
            computedSide = 'top'
        } else if (side === 'top' && spaceTop < floatingHeight && spaceBottom > spaceTop) {
            computedSide = 'bottom'
        } else if (side === 'right' && spaceRight < floatingWidth && spaceLeft > spaceRight) {
            computedSide = 'left'
        } else if (side === 'left' && spaceLeft < floatingWidth && spaceRight > spaceLeft) {
            computedSide = 'right'
        }

        let top = 0
        let left = 0
        let computedArrowLeft: number | undefined
        let computedArrowTop: number | undefined

        if (computedSide === 'top' || computedSide === 'bottom') {
            top =
                computedSide === 'top'
                    ? anchorRect.top - floatingHeight - sideOffset
                    : anchorRect.bottom + sideOffset

            let rawLeft = anchorRect.left + alignOffset
            if (align === 'center') {
                rawLeft = anchorRect.left + anchorRect.width / 2 - floatingWidth / 2 + alignOffset
            } else if (align === 'end') {
                rawLeft = anchorRect.right - floatingWidth - alignOffset
            }

            const maxLeft = viewportWidth - floatingWidth - viewportPadding
            left = Math.min(Math.max(rawLeft, viewportPadding), Math.max(viewportPadding, maxLeft))

            const isAnchorInVerticalView = anchorRect.bottom > 0 && anchorRect.top < viewportHeight
            if (isAnchorInVerticalView) {
                const maxTop = viewportHeight - floatingHeight - viewportPadding
                top = Math.min(Math.max(top, viewportPadding), Math.max(viewportPadding, maxTop))
            }

            if (arrow) {
                const rawArrow = anchorRect.left + anchorRect.width / 2 - left
                computedArrowLeft = Math.min(
                    Math.max(rawArrow, arrowPadding),
                    Math.max(arrowPadding, floatingWidth - arrowPadding)
                )
            }
        } else {
            left =
                computedSide === 'left'
                    ? anchorRect.left - floatingWidth - sideOffset
                    : anchorRect.right + sideOffset

            let rawTop = anchorRect.top + alignOffset
            if (align === 'center') {
                rawTop = anchorRect.top + anchorRect.height / 2 - floatingHeight / 2 + alignOffset
            } else if (align === 'end') {
                rawTop = anchorRect.bottom - floatingHeight - alignOffset
            }

            const isAnchorInVerticalView = anchorRect.bottom > 0 && anchorRect.top < viewportHeight
            if (isAnchorInVerticalView) {
                const maxTop = viewportHeight - floatingHeight - viewportPadding
                top = Math.min(Math.max(rawTop, viewportPadding), Math.max(viewportPadding, maxTop))
            } else {
                top = rawTop
            }

            const isAnchorInHorizontalView = anchorRect.right > 0 && anchorRect.left < viewportWidth
            if (isAnchorInHorizontalView) {
                const maxLeft = viewportWidth - floatingWidth - viewportPadding
                left = Math.min(Math.max(left, viewportPadding), Math.max(viewportPadding, maxLeft))
            }

            if (arrow) {
                const rawArrow = anchorRect.top + anchorRect.height / 2 - top
                computedArrowTop = Math.min(
                    Math.max(rawArrow, arrowPadding),
                    Math.max(arrowPadding, floatingHeight - arrowPadding)
                )
            }
        }

        setPosition((prev) =>
            prev.top === top && prev.left === left && prev.width === computedWidth
                ? prev
                : { top, left, width: computedWidth }
        )
        setActualSide((prev) => (prev === computedSide ? prev : computedSide))
        setActualAlign((prev) => (prev === align ? prev : align))
        setArrowPosition((prev) =>
            prev.left === computedArrowLeft && prev.top === computedArrowTop
                ? prev
                : { left: computedArrowLeft, top: computedArrowTop }
        )
        setPositioned((prev) => (prev ? prev : true))
    }, [
        side,
        align,
        sideOffset,
        alignOffset,
        arrow,
        arrowPadding,
        viewportPadding,
        matchWidth,
        triggerRef,
        contentRef,
    ])

    const scheduleUpdate = useCallback(() => {
        if (frameIdRef.current !== null) {
            cancelAnimationFrame(frameIdRef.current)
        }
        frameIdRef.current = requestAnimationFrame(() => {
            frameIdRef.current = null
            updatePosition()
        })
    }, [updatePosition])

    useLayoutEffect(() => {
        if (!enabled) {
            setPositioned(false)
            return
        }
        updatePosition()
        scheduleUpdate()
    }, [enabled, updatePosition, scheduleUpdate])

    useEffect(() => {
        if (!enabled) return

        function handleScrollOrResize() {
            scheduleUpdate()
        }

        window.addEventListener('scroll', handleScrollOrResize, true)
        window.addEventListener('resize', handleScrollOrResize)

        return () => {
            if (frameIdRef.current !== null) {
                cancelAnimationFrame(frameIdRef.current)
                frameIdRef.current = null
            }
            window.removeEventListener('scroll', handleScrollOrResize, true)
            window.removeEventListener('resize', handleScrollOrResize)
        }
    }, [enabled, scheduleUpdate])

    return {
        position,
        actualSide,
        actualAlign,
        arrowPosition,
        positioned,
        updatePosition,
    }
}
