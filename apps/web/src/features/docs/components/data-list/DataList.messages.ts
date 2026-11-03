import type { DocI18n } from '../doc-messages'

export const dataListI18n: DocI18n = {
    fr: {
        description:
            'Panneau structuré clé-valeur pour les métadonnées, faits système et fiches d’information compactes en lecture seule.',
        playgroundLabels: {
            columns: 'Disposition colonnes',
            itemCount: 'Nombre d’éléments',
        },
        examples: [
            { title: 'Composition composée (Compound)' },
            { title: 'Avec fonction de rendu' },
            { title: 'Disposition scindée (Split)' },
        ],
        propDescriptions: {
            items: 'Paires clé-valeur à afficher.',
            columns: 'Mode de disposition en colonnes.',
            className: 'Classe CSS additionnelle.',
        },
        a11y: [
            'Utilise la sémantique native des listes de définition (<dl>, <dt>, <dd>).',
            'Conservez des libellés concis et des valeurs faciles à balayer.',
        ],
    },
}
