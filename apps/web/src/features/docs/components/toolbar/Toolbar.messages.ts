import type { DocI18n } from '../doc-messages'

export const toolbarI18n: DocI18n = {
    fr: {
        description:
            'Conteneur de barre d’outils pour regrouper les contrôles d’action dans une disposition horizontale.',
        playgroundLabels: {
            density: 'Taille des contrôles',
            showDivider: 'Séparateur vertical',
        },
        examples: [{ title: 'Avec boutons' }, { title: 'Avec séparateur' }],
        propDescriptions: {
            children: 'Contenu de la barre d’outils.',
        },
        a11y: [
            'Motif ARIA Toolbar (role="toolbar").',
            'aria-label pour identifier la barre d’outils.',
            'Gestion de focus cohérente.',
        ],
    },
}
