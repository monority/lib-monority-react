export const POSITION_PLACEMENTS = [
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'left-start',
    'left-end',
    'right',
    'right-start',
    'right-end',
] as const

export type PositionPlacement = (typeof POSITION_PLACEMENTS)[number]

export interface PositionRect {
    top: number
    right: number
    bottom: number
    left: number
    width: number
    height: number
}

export interface PositionViewport {
    width: number
    height: number
}

export interface PositionOptions {
    placement?: PositionPlacement
    offset?: number | string
    viewportPadding?: number
}

export interface PositionResult {
    x: number
    y: number
    placement: PositionPlacement
}

const opposite: Record<PositionPlacement, PositionPlacement> = {
    top: 'bottom',
    'top-start': 'bottom-start',
    'top-end': 'bottom-end',
    bottom: 'top',
    'bottom-start': 'top-start',
    'bottom-end': 'top-end',
    left: 'right',
    'left-start': 'right-start',
    'left-end': 'right-end',
    right: 'left',
    'right-start': 'left-start',
    'right-end': 'left-end',
}

function coordinates(
    placement: PositionPlacement,
    anchor: PositionRect,
    floating: { width: number; height: number },
    offset: number
): { x: number; y: number } {
    const centerX = anchor.left + anchor.width / 2 - floating.width / 2
    const centerY = anchor.top + anchor.height / 2 - floating.height / 2
    const [side, align = 'center'] = placement.split('-') as [
        'top' | 'bottom' | 'left' | 'right',
        'start' | 'end' | 'center' | undefined,
    ]

    if (side === 'top' || side === 'bottom') {
        return {
            x:
                align === 'start'
                    ? anchor.left
                    : align === 'end'
                      ? anchor.right - floating.width
                      : centerX,
            y: side === 'top' ? anchor.top - floating.height - offset : anchor.bottom + offset,
        }
    }

    return {
        x: side === 'left' ? anchor.left - floating.width - offset : anchor.right + offset,
        y:
            align === 'start'
                ? anchor.top
                : align === 'end'
                  ? anchor.bottom - floating.height
                  : centerY,
    }
}

function fits(
    value: { x: number; y: number },
    floating: { width: number; height: number },
    viewport: PositionViewport,
    padding: number
) {
    return (
        value.x >= padding &&
        value.y >= padding &&
        value.x + floating.width <= viewport.width - padding &&
        value.y + floating.height <= viewport.height - padding
    )
}

export function computePosition(
    anchor: PositionRect,
    floating: { width: number; height: number },
    viewport: PositionViewport,
    options: PositionOptions = {}
): PositionResult {
    const requestedPlacement = options.placement ?? 'bottom'
    const offset = typeof options.offset === 'number' ? options.offset : 4
    const padding = options.viewportPadding ?? 8
    let placement = requestedPlacement
    let value = coordinates(placement, anchor, floating, offset)

    if (!fits(value, floating, viewport, padding)) {
        const flippedPlacement = opposite[requestedPlacement]
        const flipped = coordinates(flippedPlacement, anchor, floating, offset)
        if (fits(flipped, floating, viewport, padding)) {
            placement = flippedPlacement
            value = flipped
        }
    }

    return {
        placement,
        x: Math.min(
            Math.max(value.x, padding),
            Math.max(padding, viewport.width - floating.width - padding)
        ),
        y: Math.min(
            Math.max(value.y, padding),
            Math.max(padding, viewport.height - floating.height - padding)
        ),
    }
}

function resolveOffset(element: HTMLElement, offset: number | string | undefined): number {
    if (typeof offset === 'number') return offset
    if (typeof offset === 'string') {
        const tokenValue = getComputedStyle(element).getPropertyValue(offset).trim()
        const parsed = Number.parseFloat(tokenValue)
        if (Number.isFinite(parsed)) return parsed
    }
    return 4
}

/** Positionne un overlay et synchronise son ancrage tant qu'il reste ouvert. */
export function positionOverlay(
    element: HTMLElement,
    anchor: PositionRect,
    options: PositionOptions = {}
): () => void {
    let frame: number | null = null

    const update = () => {
        frame = null
        const rect = element.getBoundingClientRect()
        const result = computePosition(
            anchor,
            { width: rect.width, height: rect.height },
            { width: window.innerWidth, height: window.innerHeight },
            { ...options, offset: resolveOffset(element, options.offset) }
        )
        element.style.position = 'fixed'
        element.style.left = `${result.x}px`
        element.style.top = `${result.y}px`
        element.dataset.placement = result.placement
    }

    const schedule = () => {
        if (frame !== null) return
        frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, true)
    window.addEventListener('resize', schedule)

    return () => {
        if (frame !== null) cancelAnimationFrame(frame)
        window.removeEventListener('scroll', schedule, true)
        window.removeEventListener('resize', schedule)
    }
}
