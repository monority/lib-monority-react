import type { DocI18n } from '../doc-messages'

export const emptyStateI18n: DocI18n = {
    fr: {
        description:
            'Surface de repli centrée pour les collections vides, files d’attente inactives et premiers lancements.',
        playgroundLabels: {
            title: 'Titre principal',
            description: 'Description explicative',
            actionLabel: 'Libellé du bouton d’action',
        },
        examples: [
            { title: 'Avec action' },
            { title: 'Avec icône' },
            { title: 'Avec action secondaire' },
        ],
        propDescriptions: {
            title: 'Titre principal de l’état vide.',
            description: 'Description explicative secondaire.',
            icon: 'Élément visuel ou icône facultative en tête.',
            action: 'Bouton d’action principal.',
            secondaryAction: 'Bouton d’action secondaire.',
        },
        a11y: [
            'Utilise une sémantique de titre pour le libellé principal.',
            'L’icône est décorative ; aria-hidden doit être appliqué lorsqu’elle est présente.',
            'Les boutons d’action préservent l’ordre normal de tabulation et d’activation.',
        ],
    },
}
