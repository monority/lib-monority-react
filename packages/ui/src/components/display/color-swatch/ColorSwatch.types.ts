import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type ColorSwatchSize = 'sm' | 'md' | 'lg'
export type ColorSwatchShape = 'square' | 'rounded' | 'circle'

export interface ColorSwatchProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>
    /** Valeur chromatique appliquée en couleur de fond (hex, rgb, hsl, var(--...)). */
    value: string
    /** Libellé optionnel accompagnant la pastille (nom de token, nuance). */
    label?: ReactNode
    /** Affiche ou non la valeur textuelle sous le libellé. */
    showValue?: boolean
    /** Taille de la pastille (sm: 16px, md: 24px, lg: 32px). */
    size?: ColorSwatchSize
    /** Forme géométrique de la pastille (square, rounded, circle). */
    shape?: ColorSwatchShape
}
