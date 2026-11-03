import type { DocI18n } from '../doc-messages'

export const paginationI18n: DocI18n = {
    fr: {
        description:
            'Navigateur de page compact avec actions directionnelles, plages de pages condensées et mise en valeur nette de la page active. Supporte le mode raccourci (page/totalPages) et l’API composée.',
        playgroundLabels: {
            totalPages: 'Nombre total de pages',
        },
        examples: [
            { title: 'Sous-composants composés' },
            { title: 'Interactif (mode raccourci)' },
            { title: 'Peu de pages' },
            { title: 'Grand nombre de pages' },
        ],
        propDescriptions: {
            page: 'Numéro de page courante active.',
            totalPages: 'Nombre total de pages.',
            onPageChange: 'Rappel déclenché lors du changement de page.',
        },
        keyboardNavigation: [
            {
                key: 'Tab',
                action: 'Navigue entre les numéros de page et boutons précédent / suivant',
            },
            { key: 'Enter', action: 'Active la page sélectionnée' },
            { key: 'Space', action: 'Active la page sélectionnée' },
        ],
        a11y: [
            'Utilise la sémantique native <nav> avec un label de pagination explicite.',
            'La page active expose l’attribut aria-current="page".',
            'Les actions précédent et suivant disposent d’intitulés textuels accessibles clairs.',
        ],
    },
}
