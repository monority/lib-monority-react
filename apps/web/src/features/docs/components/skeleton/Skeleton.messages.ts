import type { DocI18n } from '../doc-messages'

export const skeletonI18n: DocI18n = {
    fr: {
        description:
            'Espace réservé animé pour le contenu en cours de chargement, utile pour les cartes, listes et profils.',
        playgroundLabels: {
            size: 'Dimension (size)',
            lines: 'Nombre de lignes (lines)',
            rounded: 'Bords arrondis (rounded)',
            circle: 'Forme circulaire (circle)',
        },
        examples: [
            { title: 'Disposition en carte' },
            { title: 'Éléments de liste' },
            { title: 'Avatar circulaire' },
        ],
        propDescriptions: {
            size: 'Densité de taille des lignes.',
            lines: 'Nombre de lignes de substitution générées en groupe.',
            circle: 'Affiche un espace réservé circulaire pour avatar.',
            rounded: 'Applique un arrondi complet en pilule.',
        },
        a11y: [
            'Les blocs de substitution sont aria-hidden car ce sont des marqueurs purement décoratifs.',
            'Appliquez aria-busy sur la zone parente pendant le chargement effectif du contenu.',
        ],
    },
}
