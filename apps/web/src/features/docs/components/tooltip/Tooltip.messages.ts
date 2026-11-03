import type { DocI18n } from '../doc-messages'

export const tooltipI18n: DocI18n = {
    fr: {
        description:
            'Indication légère au survol et au focus pour des libellés contextuels concis.',
        playgroundLabels: {
            control_0: 'Position (side)',
            control_1: 'Flèche indicatrice (arrow)',
            control_2: 'Texte d’infobulle',
        },
        examples: [{ title: 'Contenu riche' }, { title: 'Sur bouton icône' }],
        propDescriptions: {
            content: 'Contenu de l’infobulle (mode abrégé).',
            children: 'Élément déclencheur ou sous-composants composés.',
            side: 'Côté préféré.',
            arrow: 'Affiche une flèche indicatrice.',
            delayMs: 'Délai de transition d’apparition en ms.',
        },
        keyboardNavigation: [
            {
                action: 'Déplace le focus sur le déclencheur et affiche l’infobulle',
            },
            { action: 'Masque immédiatement l’infobulle sans déplacer le focus' },
        ],
        a11y: [
            'Motif ARIA tooltip (role="tooltip").',
            'aria-describedby sur le déclencheur.',
            'Apparaît au focus ou au survol.',
            'Escape masque l’infobulle jusqu’à ce que le pointeur quitte ou que le focus se déplace.',
            'Positionnée au-dessus du déclencheur via CSS ; pas de moteur de collision de viewport.',
            'L’infobulle elle-même est passive et non interactive.',
        ],
    },
}
