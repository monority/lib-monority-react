import type { Ref, SVGAttributes } from 'react'

export type LogoMarkVariant = 'current' | 'dark' | 'light' | 'amber'

export interface LogoMarkProps extends Omit<SVGAttributes<SVGSVGElement>, 'children'> {
    ref?: Ref<SVGSVGElement>
    /**
     * `current` suit la couleur du texte ; `dark` et `amber` sont faits pour un
     * fond sombre ; `light` pour un fond clair. La marque n'est jamais livrée
     * « en couleurs sur clair » par défaut.
     */
    variant?: LogoMarkVariant
    /** Nom accessible. Sans lui, la marque est décorative. */
    label?: string
    /** Taille en pixels, appliquée à la largeur et à la hauteur. */
    size?: number
}
