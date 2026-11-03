import type { DocI18n } from '../doc-messages'

export const menubarI18n: DocI18n = {
    fr: {
        description:
            'Barre de commandes d’application compacte pour les actions groupées, les raccourcis et les flux de travail avancés.',
        playgroundLabels: {
            density: 'Affichage par défaut',
        },
        examples: [
            { title: 'Avec icônes' },
            { title: 'Variante destructive (Danger)' },
            { title: 'Éléments désactivés' },
        ],
        propDescriptions: {
            children:
                'Sous-composants composés : Menu, Trigger, Content, Item, Separator, Shortcut.',
            items: 'Définitions déclaratives de groupes de menus avec éléments déroulants (mode raccourci).',
            defaultActive: 'Libellé ou valeur du menu ouvert par défaut.',
            value: 'Valeur du menu actif en mode contrôlé.',
            onValueChange: 'Rappel déclenché lors du changement de menu actif.',
        },
        keyboardNavigation: [
            { key: 'Tab', action: 'Navigue entre les déclencheurs de menus' },
            { key: 'Enter', action: 'Ouvre le menu ou exécute l’action sélectionnée' },
            { key: 'Space', action: 'Ouvre le menu' },
            { key: 'Flèches directionnelles', action: 'Navigue entre les items du menu déroulant' },
            { key: 'Escape', action: 'Ferme le menu déroulant actif' },
        ],
        a11y: [
            'L’élément racine utilise role="menubar".',
            'Les boutons déclencheurs utilisent role="menuitem" avec aria-haspopup="true" et aria-expanded.',
            'Les menus déroulants utilisent role="menu" avec aria-label explicite.',
            'Les éléments de menu utilisent role="menuitem".',
            'Les séparateurs utilisent role="separator".',
            'Les éléments désactivés portent l’attribut disabled et sont exclus des interactions.',
            'La touche Échap ferme immédiatement le menu ouvert avec retour de focus.',
            'Le clic extérieur ferme automatiquement le menu ouvert.',
            'Contours focus-visible soignés pour toute navigation au clavier.',
        ],
    },
}
