import type { DocI18n } from '../doc-messages'

export const dateRangePickerI18n: DocI18n = {
    fr: {
        description:
            'Deux composants DatePicker avec popovers de calendrier. La date de fin doit être strictement postérieure à celle de début.',
        playgroundLabels: {
            fromLabel: 'Libellé départ',
            toLabel: 'Libellé retour',
            disabled: 'Désactivé (disabled)',
        },
        examples: [
            { title: 'Avec erreur' },
            { title: 'Avec texte d’aide' },
            { title: 'Désactivé' },
        ],
        propDescriptions: {
            fromLabel: 'Libellé pour le DatePicker de départ.',
            toLabel: 'Libellé pour le DatePicker d’arrivée.',
            fromProps: 'Propriétés transmises au DatePicker de départ (à l’exception de label).',
            toProps: 'Propriétés transmises au DatePicker d’arrivée (à l’exception de label).',
            error: 'Message d’erreur affiché sur les deux sélecteurs de date.',
            hint: 'Texte d’aide affiché sur les deux sélecteurs de date.',
            disabled: 'Désactive les deux sélecteurs de date.',
        },
        keyboardNavigation: [
            {
                action: 'Navigue entre les champs de date début et fin et leurs déclencheurs.',
                context: 'Formulaire de plage',
            },
            {
                action: 'Ouvre le popover du calendrier pour le champ ciblé.',
                context: 'Champs de saisie',
            },
            {
                action: 'Navigue entre les jours de la grille du calendrier.',
                context: 'Calendrier popover',
            },
            {
                action: 'Ferme le calendrier et retourne le focus sur le champ actif.',
                context: 'Calendrier popover',
            },
        ],
        a11y: [
            'Sémantique native des formulaires.',
            'Supporte disabled / required / aria-invalid.',
            'Anneau de focus visible.',
            'Libellés associés pour les lecteurs d’écran.',
        ],
    },
}
