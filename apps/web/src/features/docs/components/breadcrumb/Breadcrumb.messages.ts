import type { DocI18n } from '../doc-messages'

export const breadcrumbI18n: DocI18n = {
    fr: {
        description:
            'Fil d’Ariane sémantique avec balisage nav et liste ordonnée. Affiche l’emplacement de la page courante dans l’arborescence.',
        playgroundLabels: {
            depth: 'Profondeur d’arborescence',
        },
        examples: [{ title: 'Plusieurs niveaux' }, { title: 'Niveau unique' }],
        propDescriptions: {
            items: 'Éléments ordonnés du fil d’Ariane. Le dernier élément correspond à la page active (sans attribut href).',
            className: 'Classes CSS additionnelles.',
        },
        a11y: [
            'Rend un élément sémantique <nav> avec aria-label="Fil d’Ariane".',
            'Le dernier élément porte l’attribut aria-current="page".',
            'Les séparateurs sont masqués des lecteurs d’écran via aria-hidden.',
            'Structure ordonnée <ol> / <li> pour une navigation hiérarchique rigoureuse.',
        ],
    },
}
