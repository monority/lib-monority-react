import type { DocI18n } from '../doc-messages'

export const datePickerI18n: DocI18n = {
    fr: {
        description:
            'Champ de saisie de date avec calendrier popover intégré, validation du format et navigation clavier accessible.',
        playgroundLabels: {
            size: 'Taille (size)',
            tone: 'Nuance (tone)',
            label: 'Libellé',
            disabled: 'Désactivé (disabled)',
            showPickers: 'Sélecteurs mois/année',
        },
        examples: [
            { title: 'Avec erreur' },
            { title: 'Avec texte d’aide' },
            { title: 'Dates min et max' },
            { title: 'Désactivé' },
            { title: 'Contrôlé' },
            { title: 'Tailles' },
            { title: 'Dates désactivées' },
        ],
        propDescriptions: {
            type: 'Type d’entrée natif.',
            label: 'Libellé du champ.',
            hint: 'Description d’aide sous le champ.',
            error: 'Message d’erreur affiché en cas d’état invalide.',
            required: 'Indique si le champ est obligatoire.',
        },
        keyboardNavigation: [
            {
                action: 'Atteint le champ de date ou navigue entre les boutons du calendrier.',
                context: 'Formulaire / Calendrier',
            },
            {
                action: 'Ouvre le popover du calendrier ou valide la date sélectionnée.',
                context: 'Champ de saisie / Boutons',
            },
            {
                action: 'Navigue entre les jours de la grille lorsque le calendrier est ouvert.',
                context: 'Calendrier popover',
            },
            {
                action: 'Recule ou avance d’un mois.',
                context: 'Calendrier popover',
            },
            {
                action: 'Ferme le popover du calendrier et restitue le focus au champ d’entrée.',
                context: 'Calendrier popover',
            },
        ],
        a11y: [
            'Sémantique native des éléments de formulaire.',
            'Supporte disabled / required / aria-invalid.',
            'Anneau de focus visible conforme au thème.',
            'Libellé associé accessible aux lecteurs d’écran.',
        ],
    },
}
