import { cn } from '@/lib/cn'
import type { ColorSwatchProps } from './ColorSwatch.types'

/**
 * ColorSwatch contract:
 * - Visualiseur chromatique d'un jeton de couleur ou d'une valeur CSS.
 * - `value` alimente le background-color de la pastille `.mr-color-swatch__preview`.
 * - `size` pilote les dimensions (sm, md, lg).
 * - `shape` pilote le border-radius (square, rounded, circle).
 * - `label` et `showValue` permettent d'afficher le libellé et/ou la valeur textuelle.
 */
export function ColorSwatch({
    value,
    label,
    showValue = false,
    size = 'md',
    shape = 'rounded',
    className,
    style,
    ref,
    ...props
}: ColorSwatchProps) {
    const hasTextContent = Boolean(label || showValue)

    return (
        <span
            ref={ref}
            className={cn('mr-color-swatch', className)}
            data-size={size}
            data-shape={shape}
            role={!hasTextContent && props['aria-label'] ? 'img' : undefined}
            style={style}
            {...props}
        >
            <span
                className="mr-color-swatch__preview"
                style={{ backgroundColor: value }}
                aria-hidden="true"
            />
            {hasTextContent ? (
                <span className="mr-color-swatch__content">
                    {label ? <span className="mr-color-swatch__label">{label}</span> : null}
                    {showValue ? <span className="mr-color-swatch__value">{value}</span> : null}
                </span>
            ) : null}
        </span>
    )
}

export type { ColorSwatchProps, ColorSwatchShape, ColorSwatchSize } from './ColorSwatch.types'
