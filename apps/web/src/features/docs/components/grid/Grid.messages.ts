import type { DocI18n } from '../doc-messages'

export const gridI18n: DocI18n = {
    fr: {
        description:
            'Conteneur de disposition en grille CSS avec nombre de colonnes et espacements configurables.',
        playgroundLabels: {
            columns: 'Nombre de colonnes',
            itemCount: 'Nombre de blocs',
        },
        examples: [{ title: 'Configuration du nombre de colonnes' }],
        propDescriptions: {
            columns: 'Nombre de colonnes de la grille (1 à 4 ou auto-fit / auto-fill).',
        },
        a11y: [
            'Composant structurel de mise en page sans état interactif direct.',
            'Conservez un ordre logique d’éléments correspondant à l’ordre de lecture naturel.',
        ],
    },
}
