import type { DocI18n } from '../doc-messages'

export const toggleGroupI18n: DocI18n = {
    fr: {
        description:
            'Ensemble de boutons à état enclenché pour sélections mutuellement exclusives ou choix multiples.',
        playgroundLabels: {
            type: 'Mode de sélection',
            size: 'Dimension (size)',
            variant: 'Variante de style',
            orientation: 'Disposition',
            disabled: 'Désactivé (disabled)',
        },
        examples: [
            { title: 'Sélection unique' },
            { title: 'Sélection multiple' },
            { title: 'Variantes' },
            { title: 'Tailles' },
            { title: 'Désactivé' },
            { title: 'Vertical' },
        ],
        propDescriptions: {
            items: 'Tableau d’éléments { value, label, disabled? }.',
            type: 'Mode de sélection (unique ou multiple).',
            value: 'Valeur contrôlée. Chaîne pour single, tableau de chaînes pour multiple.',
            defaultValue: 'Valeur initiale (non contrôlée).',
            onValueChange: 'Rappel déclenché lors du changement de sélection.',
            disabled: 'Désactive tous les éléments du groupe.',
            orientation: 'Direction de disposition.',
            variant: 'Style visuel transmis à chaque bouton Toggle.',
            size: 'Taille transmise à chaque bouton Toggle.',
        },
        keyboardNavigation: [
            {
                action: 'Fait circuler le focus entre les options actives du groupe.',
                context: 'Groupe de bascules',
            },
            {
                action: 'Active ou désactive l’option focalisée.',
                context: 'Option cible du groupe',
            },
        ],
        a11y: [
            'role="group" pour la sélection unique, role="toolbar" pour les choix multiples.',
            'aria-orientation reflète la direction de disposition.',
            'Chaque élément utilise Toggle avec aria-pressed.',
            'Conservez des libellés courts pour une lecture rapide de l’ensemble.',
        ],
    },
}
