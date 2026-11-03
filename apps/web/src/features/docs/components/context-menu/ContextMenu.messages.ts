import type { DocI18n } from '../doc-messages'

export const contextMenuI18n: DocI18n = {
    fr: {
        description:
            'Menu d’actions positionné au curseur pour les commandes contextuelles, les éditions rapides et les actions destructrices.',
        playgroundLabels: {
            control_0: 'Action destructrice (danger)',
            control_1: 'Action désactivée (disabled)',
        },
        examples: [
            { title: 'Avec élément destructeur' },
            { title: 'Avec élément désactivé' },
            { title: 'Avec séparateur' },
        ],
        propDescriptions: {
            trigger: 'Élément qui ouvre le menu au clic droit.',
            items: 'Éléments de menu.',
            open: 'État d’ouverture contrôlé.',
            defaultOpen: 'État d’ouverture par défaut.',
            onOpenChange: 'Rappel de changement d’état d’ouverture.',
            contentClassName: 'Classe supplémentaire pour le panneau de contenu.',
        },
        keyboardNavigation: [
            { action: 'Ouvre le menu contextuel sur le déclencheur' },
            { action: 'Navigue entre les actions du menu' },
            { action: 'Exécute l’action sélectionnée' },
            { action: 'Ferme le menu contextuel et replace le focus sur la zone' },
        ],
        a11y: [
            'Le déclencheur définit role="button", tabindex="0", aria-expanded et aria-haspopup="menu".',
            'Le contenu du menu utilise role="menu" avec aria-orientation="vertical".',
            'Les éléments utilisent role="menuitem", les séparateurs role="separator".',
            'ArrowDown/ArrowUp navigue entre les éléments du menu.',
            'Home place le focus sur le premier élément, End sur le dernier.',
            'Escape ferme le menu et rend le focus au déclencheur.',
            'Un clic à l’extérieur ferme le menu.',
            'Le menu est positionné aux coordonnées du curseur au clic droit.',
        ],
    },
}
