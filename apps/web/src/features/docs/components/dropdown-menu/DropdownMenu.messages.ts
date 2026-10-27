import type { DocI18n } from '../doc-messages'

export const dropdownMenuI18n: DocI18n = {
    fr: {
        description:
            'Menu d’actions compact pour les commandes contextuelles, les éléments groupés et les actions destructrices.',
        playgroundLabels: {
            align: 'Alignement',
            side: 'Position (côté)',
            triggerLabel: 'Texte du déclencheur',
            includeDanger: 'Inclure une action critique',
        },
        examples: [
            { title: 'Avec éléments désactivés' },
            { title: 'Avec rappels' },
        ],
        propDescriptions: {
            trigger: 'Élément qui ouvre le menu.',
            items: 'Éléments de menu.',
            open: 'État d’ouverture contrôlé.',
            defaultOpen: 'État d’ouverture par défaut.',
            onOpenChange: 'Rappel de changement d’état d’ouverture.',
            align: 'Alignement par rapport au déclencheur.',
            side: 'Côté d’affichage du menu.',
        },
        keyboardNavigation: [
            {
                action: 'Ouvre le menu si le focus est sur le déclencheur, ou active l’élément de menu ciblé.',
                context: 'Déclencheur ou élément du menu',
            },
            {
                action: 'Déplace le focus sur le menuitem suivant. Ouvre le menu depuis le déclencheur.',
                context: 'Déclencheur ou menu ouvert',
            },
            {
                action: 'Déplace le focus sur le menuitem précédent. Ouvre le menu depuis le déclencheur.',
                context: 'Déclencheur ou menu ouvert',
            },
            {
                action: 'Positionne le focus sur le premier menuitem interactif.',
                context: 'Menu ouvert',
            },
            {
                action: 'Positionne le focus sur le dernier menuitem interactif.',
                context: 'Menu ouvert',
            },
            {
                action: 'Ferme le menu contextuel et replace le focus sur le déclencheur.',
                context: 'Menu ouvert',
            },
            {
                action: 'Ferme le menu et déplace le focus sur l’élément suivant dans l’ordre de tabulation.',
                context: 'Menu ouvert',
            },
        ],
        a11y: [
            'Le déclencheur définit aria-expanded, aria-haspopup="menu" et aria-controls.',
            'Le contenu du menu utilise role="menu" avec aria-orientation="vertical".',
            'Les éléments utilisent role="menuitem", les séparateurs role="separator".',
            'ArrowDown/ArrowUp navigue entre les éléments du menu.',
            'Home place le focus sur le premier élément, End sur le dernier.',
            'Escape ferme le menu et rend le focus au déclencheur.',
            'Un clic à l’extérieur ferme le menu.',
        ],
    },
}
