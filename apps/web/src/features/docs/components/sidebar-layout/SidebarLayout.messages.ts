import type { DocI18n } from '../doc-messages'

export const sidebarLayoutI18n: DocI18n = {
    fr: {
        description:
            'Gabarit d’application à deux colonnes avec rail latéral encadré, en-tête optionnel et panneau de contenu lisible.',
        playgroundLabels: {
            sidebarWidth: 'Largeur barre latérale',
            showHeader: 'Afficher en-tête',
        },
        examples: [{ title: 'Avec contenu' }, { title: 'Largeurs de barre latérale' }],
        propDescriptions: {
            sidebar: 'Contenu du rail latéral.',
            header: 'Contenu d’en-tête optionnel.',
            children: 'Contenu principal de la vue.',
            sidebarWidth: 'Préréglage de largeur de la barre latérale.',
            collapsible: 'Active le bouton rétractable de la barre latérale avec animation fluide.',
        },
        a11y: [
            'Repère de navigation avec aria-label sur le menu latéral.',
            'Bouton de bascule accessible avec aria-expanded et aria-label.',
            'Préservation du focus clavier pendant les animations de bascule.',
            'Prise en charge native du repli adaptatif (responsive).',
        ],
    },
}
