import type { DocI18n } from '../doc-messages'

export const spinnerI18n: DocI18n = {
    fr: {
        description:
            'Indicateur de chargement compact pour les attentes brèves, les actions en arrière-plan et les retours d’état en ligne.',
        playgroundLabels: {
            size: 'Dimension (size)',
            tone: 'Tonalité visuelle',
        },
        examples: [{ title: 'Tailles' }, { title: 'Tonalités' }, { title: 'Avec texte' }],
        propDescriptions: {
            size: 'Taille du spinner.',
            tone: 'Tonalité de couleur du spinner.',
        },
        a11y: [
            'Le composant expose role="status" avec un libellé accessible de chargement.',
            'Ajoutez un texte visible à proximité lorsque l’opération nécessite un contexte supplémentaire.',
        ],
    },
}
