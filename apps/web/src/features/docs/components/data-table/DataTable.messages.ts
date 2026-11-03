import type { DocI18n } from '../doc-messages'

export const dataTableI18n: DocI18n = {
    fr: {
        description:
            'Tableau opérationnel interactif avec tri, sélection, support de légende et états de ligne renforcés.',
        playgroundLabels: {
            selectable: 'Sélectionnable (selectable)',
            rowCount: 'Nombre de lignes',
            caption: 'Légende (caption)',
        },
        examples: [{ title: 'Sélectionnable' }, { title: 'État vide' }, { title: 'Avec légende' }],
        propDescriptions: {
            columns: 'Définitions des colonnes avec tri facultatif par colonne.',
            rows: 'Données tabulaires.',
            selectable: 'Active la sélection des lignes.',
            caption: 'Légende du tableau pour l’accessibilité.',
            emptyState: 'Contenu personnalisé pour l’état vide.',
        },
        a11y: [
            'Sémantique <table> native.',
            'Les en-têtes de colonne utilisent des attributs scope.',
            'Légende pour expliciter le contexte si nécessaire.',
            'Les colonnes triables annoncent la direction du tri.',
        ],
    },
}
