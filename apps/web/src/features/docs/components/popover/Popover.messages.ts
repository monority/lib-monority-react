import type { DocI18n } from '../doc-messages'

export const popoverI18n: DocI18n = {
    fr: {
        description:
            'Panneau flottant contextuel pour les détails compacts, les éditions rapides et les actions complémentaires.',
        playgroundLabels: {
            control_0: 'Côté (side)',
            control_1: 'Alignement (align)',
        },
        examples: [{ title: 'Avec formulaire' }, { title: 'Alignement' }],
        propDescriptions: {
            trigger: 'Élément qui ouvre le popover (mode abrégé).',
            children: 'Contenu du popover ou sous-composants composés.',
            open: 'État d’ouverture contrôlé.',
            defaultOpen: 'État d’ouverture par défaut.',
            onOpenChange: 'Rappel de changement d’état d’ouverture.',
            align: 'Alignement par rapport au déclencheur.',
            side: 'Côté d’affichage du popover.',
        },
        keyboardNavigation: [
            { action: 'Ouvre le popover' },
            { action: 'Ouvre le popover' },
            {
                action: 'Déplace le focus dans les éléments interactifs du popover',
            },
            { action: 'Ferme le popover et replace le focus sur le déclencheur' },
        ],
        a11y: [
            'Le contenu utilise role="dialog" avec aria-modal="false".',
            'Le déclencheur expose aria-expanded et aria-controls.',
            'Touche Escape pour fermer.',
            'Le focus se déplace dans le panneau à l’ouverture.',
            'Un clic à l’extérieur ferme le popover.',
        ],
    },
}
