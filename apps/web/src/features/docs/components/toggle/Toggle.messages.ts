import type { DocI18n } from '../doc-messages'

export const toggleI18n: DocI18n = {
    fr: {
        description:
            'Bouton à état enclenché pour les options de vue, les filtres et les contrôles compacts de barre d’outils.',
        playgroundLabels: {
            label: 'Libellé du bouton',
            size: 'Dimension (size)',
            variant: 'Variante de style',
            disabled: 'Désactivé (disabled)',
        },
        examples: [
            { title: 'De base' },
            { title: 'Variantes' },
            { title: 'Tailles' },
            { title: 'Contrôlé' },
            { title: 'Désactivé' },
        ],
        propDescriptions: {
            pressed: 'État enclenché contrôlé.',
            defaultPressed: 'État enclenché initial (non contrôlé).',
            onPressedChange: 'Rappel déclenché lors du changement d’état enclenché.',
            variant: 'Style visuel.',
            size: 'Densité du contrôle.',
            disabled: 'Désactive le composant.',
        },
        keyboardNavigation: [
            {
                action: 'Bascule l’état activé/inactif (aria-pressed).',
                context: 'Bouton Toggle focalisé',
            },
            {
                action: 'Déplace le focus vers le composant suivant.',
                context: 'Bouton Toggle focalisé',
            },
        ],
        a11y: [
            'Sémantique native <button> avec aria-pressed.',
            'Attribut data-state (on/off) pour le style et les tests.',
            'Anneau de focus visible via :focus-visible.',
            'Utilisez des libellés clairs décrivant l’option activée.',
        ],
    },
}
