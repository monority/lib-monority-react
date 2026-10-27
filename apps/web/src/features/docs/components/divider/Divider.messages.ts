import type { DocI18n } from '../doc-messages'

export const dividerI18n: DocI18n = {
    fr: {
        description:
            'Ligne de séparation avec ou sans libellé textuel pour structurer des blocs de contenu adjacents.',
        playgroundLabels: {
            orientation: 'Orientation',
            label: 'Étiquette centrale',
        },
        examples: [{ title: 'Avec étiquette centrale' }, { title: 'Orientation verticale' }],
        propDescriptions: {
            orientation: 'Axe d’orientation du séparateur (horizontal ou vertical).',
            label: 'Étiquette textuelle centrée facultative.',
        },
        a11y: [
            'Expose nativement role="separator" avec l’attribut aria-orientation synchronisé.',
            'Privilégiez des libellés courts et évitez d’utiliser le séparateur comme unique étiquette de section.',
        ],
    },
}
