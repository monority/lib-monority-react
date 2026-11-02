interface MonolithPosterProps {
    hidden: boolean
}

/**
 * Silhouette vectorielle instantanée aux proportions exactes du Monolithe 3D.
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
                cx="182"
                cy="312"
                rx="72"
                ry="12"
                fill="color-mix(in oklch, var(--mr-text-primary) 10%, transparent)"
            />

            {/* Demi-coque inférieure trois-quarts */}
            <g transform="translate(180 176) rotate(7)">
                {/* Chant latéral droit inférieur */}
                <path
                    d="M 52 8 L 78 -6 L 78 88 L 52 104 Z"
                    fill="color-mix(in oklch, var(--mr-bg-raised) 78%, var(--mr-bg-canvas))"
                    stroke="var(--mr-border-default)"
                    strokeWidth="1"
                    strokeLinejoin="round"
                />
                {/* Face principale inférieure */}
                <path
                    d="M -68 -14 L 52 8 L 52 104 L -68 82 Z"
                    fill="var(--mr-bg-surface)"
                    stroke="var(--mr-border-default)"
                    strokeWidth="1"
                    strokeLinejoin="round"
                />

                {/* Rainure équatoriale lumineuse (--mr-accent-solid) */}
                <path
                    d="M -66 -19 L 51 3 L 76 -11"
                    stroke="var(--mr-accent-solid)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Demi-coque supérieure : face supérieure biseautée */}
                <path
                    d="M -68 -118 L -42 -132 L 78 -110 L 52 -96 Z"
                    fill="var(--mr-bg-raised)"
                    stroke="var(--mr-border-default)"
                    strokeWidth="1"
                    strokeLinejoin="round"
                />
                {/* Chant latéral droit supérieur */}
                <path
                    d="M 52 -96 L 78 -110 L 78 -16 L 52 -2 Z"
                    fill="color-mix(in oklch, var(--mr-bg-raised) 82%, var(--mr-bg-canvas))"
                    stroke="var(--mr-border-default)"
                    strokeWidth="1"
                    strokeLinejoin="round"
                />
                {/* Face principale supérieure */}
                <path
                    d="M -68 -118 L 52 -96 L 52 -2 L -68 -24 Z"
                    fill="var(--mr-bg-surface)"
                    stroke="var(--mr-border-default)"
                    strokeWidth="1"
                    strokeLinejoin="round"
                />

                {/* Bas-relief discret des 3 plans Monority sur la coque supérieure */}
                <path
                    d="M -8 -84 L -32 -71 L -8 -58 L 16 -71 Z"
                    stroke="var(--mr-border-control)"
                    strokeWidth="1.25"
                    strokeLinejoin="round"
                />
                <path
                    d="M -32 -62 L -8 -49 L 16 -62"
                    stroke="var(--mr-border-control)"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M -32 -53 L -8 -40 L 16 -53"
                    stroke="var(--mr-border-control)"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    )
}
