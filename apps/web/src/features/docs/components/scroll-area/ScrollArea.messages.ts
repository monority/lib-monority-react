import type { DocI18n } from '../doc-messages'

export const scrollAreaI18n: DocI18n = {
    fr: {
        description:
            'Conteneur défilable stylisé avec barres de défilement sur-mesure et contrôle multidirectionnel.',
        playgroundLabels: {
            orientation: 'Direction de défilement',
            hideScrollbar: 'Masquer la barre visuelle',
        },
        examples: [
            { title: 'Défilement horizontal' },
            { title: 'Défilement bidirectionnel' },
            { title: 'Barre de défilement masquée' },
        ],
        propDescriptions: {
            orientation: 'Axe de défilement autorisé (vertical, horizontal ou les deux).',
            hideScrollbar:
                'Masque visuellement la barre de défilement tout en préservant la navigabilité tactile et à la molette.',
        },
        a11y: [
            'Repose sur le comportement de défilement natif du navigateur via overflow.',
            'La barre de défilement personnalisée reste entièrement opérable au pointeur.',
            'L’option hideScrollbar retire l’indicateur visuel : assurez-vous que le contexte suggère clairement la présence de contenu masqué.',
        ],
    },
}
