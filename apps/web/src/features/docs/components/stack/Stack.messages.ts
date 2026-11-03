import type { DocI18n } from '../doc-messages'

export const stackI18n: DocI18n = {
    fr: {
        description:
            'Primitive de mise en page Flexbox pour le regroupement vertical ou horizontal, l’espacement, l’alignement et les blocs de contenu structurés.',
        playgroundLabels: {
            direction: 'Direction',
            gap: 'Espacement (gap)',
            align: 'Alignement secondaire (align)',
            justify: 'Distribution principale (justify)',
        },
        examples: [{ title: 'Tailles d’espacement' }, { title: 'Disposition horizontale' }],
        propDescriptions: {
            gap: 'Espacement entre éléments enfants.',
            direction: 'Axe de direction principal.',
            align: 'Alignement sur l’axe secondaire.',
            justify: 'Distribution sur l’axe principal.',
        },
        a11y: [
            'Composant de mise en page purement structurel.',
            'Aucune sémantique interactive par défaut.',
        ],
    },
}
