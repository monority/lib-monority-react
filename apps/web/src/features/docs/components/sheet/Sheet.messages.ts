import type { DocI18n } from '../doc-messages'

export const sheetI18n: DocI18n = {
    fr: {
        description:
            'Volet coulissant ancrable sur les 4 côtés de l’écran pour les flux secondaires denses, formulaires d’édition ou panneaux d’inspection.',
        playgroundLabels: {
            control_0: 'Côté d’ouverture (side)',
            control_1: 'Titre du volet',
        },
        examples: [
            { title: 'Ancrage sur les 4 côtés (Sides)' },
            { title: 'Composition avec sous-composants' },
        ],
        propDescriptions: {
            open: 'État d’ouverture du volet.',
            title: 'Titre accessible du volet.',
            description: 'Sous-titre explicatif.',
            side: 'Bord de l’écran depuis lequel le volet glisse.',
            footer: 'Actions de pied de page.',
            onClose: 'Fonction de rappel à la fermeture.',
        },
        keyboardNavigation: [
            { action: 'Navigue cycliquement dans les éléments du volet (focus trap)' },
            { action: 'Ferme le volet et replace le focus sur le bouton d’ouverture' },
        ],
        a11y: [
            'Conforme au motif WAI-ARIA Dialog avec role="dialog" et aria-modal="true".',
            'Piège de focus actif pendant toute la durée d’ouverture.',
            'La touche Escape et le clic sur l’arrière-plan déclenchent la fermeture animée.',
            'Titre lié automatiquement par aria-labelledby et description par aria-describedby.',
        ],
    },
}
