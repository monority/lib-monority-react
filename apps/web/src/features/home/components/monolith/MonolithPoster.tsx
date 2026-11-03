import { MARK_PATH } from '@monority/ui'

interface MonolithPosterProps {
    hidden: boolean
}

/**
 * Silhouette vectorielle instantanée aux proportions exactes du logo Monority 3D (MARK_PATH).
 * Affichée sans latence pendant l'initialisation asynchrone WebGL (0 CLS)
 * et conservée en repli permanent si WebGL est indisponible ou sous forced-colors.
 */
export function MonolithPoster({ hidden }: MonolithPosterProps) {
    return (
        <svg
            className={
                hidden ? 'mr-monolith__poster mr-monolith__poster--hidden' : 'mr-monolith__poster'
            }
            viewBox="0 0 360 360"
            fill="none"
            aria-hidden="true"
        >
            {/* Ombre douce de lévitation */}
            <ellipse
                cx="180"
                cy="318"
                rx="68"
                ry="10"
                fill="color-mix(in oklch, var(--mr-text-primary) 10%, transparent)"
            />

            {/* Extrusion arrière discrète évoquant l'épaisseur usinée */}
            <g transform="translate(187 180) scale(0.168) translate(-724 -667)">
                <path
                    d={MARK_PATH}
                    fill="color-mix(in oklch, var(--mr-bg-raised) 68%, var(--mr-accent-solid) 32%)"
                    fillRule="evenodd"
                />
            </g>

            {/* Face avant exacte de la marque Monority (monority-mark--on-dark.svg) */}
            <g transform="translate(179 178) scale(0.168) translate(-724 -667)">
                <path
                    d={MARK_PATH}
                    fill="color-mix(in oklch, var(--mr-text-primary) 74%, var(--mr-bg-surface))"
                    stroke="color-mix(in oklch, var(--mr-text-primary) 45%, var(--mr-accent-solid))"
                    strokeWidth="6"
                    strokeLinejoin="round"
                    fillRule="evenodd"
                />
            </g>
        </svg>
    )
}
