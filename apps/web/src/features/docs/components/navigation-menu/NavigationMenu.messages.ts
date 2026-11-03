import type { DocI18n } from '../doc-messages'

export const navigationMenuI18n: DocI18n = {
    fr: {
        description:
            'Menu de navigation applicatif avec sous-menus déroulants, indicateurs interactifs et support clavier complet.',
        playgroundLabels: {
            activeSection: 'Sous-menu ouvert',
        },
        examples: [
            { title: 'Avec icônes' },
            { title: 'Avec sous-éléments descriptifs' },
            { title: 'Éléments désactivés' },
        ],
        propDescriptions: {
            children: 'Sous-composants composés : List, Item, Trigger, Content, Link.',
            items: 'Configuration déclarative des éléments de navigation (mode raccourci).',
            value: 'Valeur de l’élément actif en mode contrôlé.',
            defaultValue: 'Élément actif par défaut en mode non contrôlé.',
            onValueChange: 'Rappel déclenché lors du changement d’élément actif.',
        },
        keyboardNavigation: [
            { key: 'Tab', action: 'Navigue entre les liens et déclencheurs de menu' },
            { key: 'Enter', action: 'Ouvre le sous-menu ou active le lien sélectionné' },
            { key: 'Space', action: 'Ouvre le sous-menu' },
            {
                key: 'Escape',
                action: 'Ferme le sous-menu ouvert et replace le focus sur le déclencheur',
            },
        ],
        a11y: [
            'L’élément racine utilise role="navigation" avec aria-label="Navigation principale".',
            'Les boutons déclencheurs utilisent role="menuitem" avec aria-haspopup et aria-expanded.',
            'Le contenu déroulant utilise role="menu".',
            'Les sous-éléments utilisent role="menuitem".',
            'Les éléments désactivés portent aria-disabled="true" et sont exclus du focus.',
            'Contours focus-visible soignés pour toute navigation au clavier.',
        ],
    },
}
