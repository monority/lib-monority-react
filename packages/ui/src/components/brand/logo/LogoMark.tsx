import { cn } from '@/lib/cn'
import type { LogoMarkProps } from './LogoMark.types'
import { MARK_PATH, MARK_VIEWBOX } from './path'

const FILL: Record<NonNullable<LogoMarkProps['variant']>, string> = {
    current: 'currentColor',
    dark: '#EAE4DB',
    light: '#0B0A09',
    amber: '#F28A36',
}

/**
 * La marque Monority : un nœud à trois rubans, tracé vectoriel unique.
 *
 * Le dessin est figé dans `path.ts`, généré depuis
 * `logo/svg/monority-mark--on-dark.svg`. Aucune géométrie n'est redessinée ici,
 * aucune transformation n'est appliquée : la marque reste identique à chaque
 * rendu, quelle que soit la taille.
 */
export function LogoMark({
    variant = 'current',
    label,
    size,
    className,
    ref,
    ...props
}: LogoMarkProps) {
    return (
        <svg
            ref={ref}
            viewBox={MARK_VIEWBOX}
            width={size}
            height={size}
            fill={FILL[variant]}
            fillRule="evenodd"
            className={cn('mr-logo-mark', className)}
            role={label ? 'img' : undefined}
            aria-label={label}
            aria-hidden={label ? undefined : true}
            focusable="false"
            {...props}
        >
            <path d={MARK_PATH} />
        </svg>
    )
}
