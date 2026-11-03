import type { DocI18n } from '../doc-messages'

export const tabsI18n: DocI18n = {
    fr: {
        description:
            'Contrôle de navigation locale compact pour basculer entre des vues, filtres ou groupes de contenus adjacents.',
        playgroundLabels: {
            tone: 'Tonalité visuelle',
            size: 'Dimension (size)',
            fullWidth: 'Pleine largeur (fullWidth)',
            disabled: 'Désactivé (disabled)',
        },
        examples: [
            { title: 'Syntaxe composée' },
            { title: 'Tons' },
            { title: 'Tailles' },
            { title: 'Désactivé' },
            { title: 'Pleine largeur' },
        ],
        propDescriptions: {
            items: 'Définitions des onglets. Mettre disabled par élément pour l’ignorer dans la navigation clavier.',
            value: 'Valeur sélectionnée contrôlée.',
            defaultValue: 'Valeur initiale non contrôlée.',
            onChange: 'Callback de changement d’onglet.',
            tone: 'Tonalité visuelle de l’onglet actif.',
            size: 'Variante de taille des onglets.',
            disabled: 'Désactive tous les onglets.',
            fullWidth: 'Les onglets s’étirent à la largeur du conteneur.',
            'aria-label': 'Libellé accessible pour la tablist.',
        },
        keyboardNavigation: [
            {
                action: 'Déplace le focus horizontalement entre les onglets interactifs.',
                context: 'Liste des onglets (tablist)',
            },
            {
                action: 'Positionne le focus sur le premier onglet disponible.',
                context: 'Liste des onglets (tablist)',
            },
            {
                action: 'Positionne le focus sur le dernier onglet disponible.',
                context: 'Liste des onglets (tablist)',
            },
            {
                action: 'Active et sélectionne l’onglet focalisé.',
                context: 'Onglet cible',
            },
            {
                action: 'Passe le focus au panneau de contenu associé ou à l’élément interactif suivant.',
                context: 'Onglet actif',
            },
        ],
        a11y: [
            'La racine utilise role="tablist" avec aria-label.',
            'Chaque onglet utilise role="tab" avec aria-selected et roving tabIndex.',
            'Le roving tabIndex maintient l’onglet actif dans le flux clavier.',
            'Les touches fléchées, Home et End naviguent entre les onglets.',
        ],
    },
}
