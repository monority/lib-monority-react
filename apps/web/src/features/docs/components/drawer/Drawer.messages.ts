import type { DocI18n } from '../doc-messages'

export const drawerI18n: DocI18n = {
    fr: {
        description:
            'Panneau latéral coulissant pour la consultation, l’édition et l’inspection au niveau de la page sans changer complètement de contexte.',
        playgroundLabels: {
            control_0: 'Côté d’ouverture (side)',
            control_1: 'Titre du drawer',
        },
        examples: [{ title: 'Différents côtés' }, { title: 'Avec pied de page' }],
        propDescriptions: {
            open: 'Contrôle l’état d’ouverture.',
            title: 'Titre du drawer.',
            children: 'Contenu du drawer.',
            side: 'Direction d’ouverture.',
            onClose: 'Rappel de fermeture.',
        },
        keyboardNavigation: [
            {
                action: 'Navigue cycliquement dans les éléments focalisables du tiroir (focus trap)',
            },
            {
                action: 'Ferme le tiroir et replace le focus sur le bouton d’ouverture',
            },
        ],
        a11y: [
            'Le panneau suit le motif ARIA dialog avec aria-modal="true".',
            'Le focus est piégé pendant l’ouverture du tiroir.',
            'Le titre est exposé avec aria-labelledby.',
            'Escape et le bouton de fermeture rejettent le panneau.',
        ],
    },
}
