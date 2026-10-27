import type { DocI18n } from '../doc-messages'

export const aspectRatioI18n: DocI18n = {
    fr: {
        description:
            'Maintient un ratio d’aspect fixe pour son contenu enfant grâce à la technique du ratio CSS intrinsèque.',
        playgroundLabels: {
            ratio: 'Format (ratio)',
        },
        examples: [{ title: 'Intégration vidéo (16/9)' }, { title: 'Format carré (1/1)' }],
        propDescriptions: {
            ratio: 'Ratio d’aspect exprimé sous forme de rapport largeur/hauteur.',
        },
        a11y: [
            'Composant structurel de mise en page sans état interactif direct.',
            'Aucune sémantique ARIA complexe requise par défaut.',
            'Assurez-vous que les éléments enfants (images, vidéos) disposent d’un nom accessible approprié (alt, aria-label).',
        ],
    },
}
