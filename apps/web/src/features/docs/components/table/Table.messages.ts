import type { DocI18n } from '../doc-messages'

export const tableI18n: DocI18n = {
    fr: {
        description:
            'Tableau simple en lecture seule pour le contenu structuré, les comparatifs tarifaires et les récapitulatifs statiques.',
        playgroundLabels: {
            rowCount: 'Nombre de lignes',
        },
        examples: [{ title: 'Avec données' }, { title: 'État vide' }],
        propDescriptions: {
            columns: 'Définitions des colonnes.',
            rows: 'Données tabulaires.',
            emptyState: 'Contenu personnalisé pour l’état vide.',
        },
        a11y: [
            'Sémantique native <table>.',
            'Les en-têtes de colonne utilisent des attributs scope.',
            'Utilisez DataTable lorsque le tri ou la sélection de lignes est requis.',
        ],
    },
}
