import type { DocI18n } from '../doc-messages'

export const calendarI18n: DocI18n = {
    fr: {
        description:
            'Grille de sélection de date autonome avec navigation par mois, sélecteurs d’année et de mois, et sélection du jour.',
        playgroundLabels: {
            showPickers: 'Sélecteurs mois/année (showPickers)',
            showOutsideDays: 'Jours hors mois (showOutsideDays)',
            fixedWeeks: '6 semaines fixes (fixedWeeks)',
            numberOfMonths: 'Nombre de mois',
        },
        examples: [
            { title: 'De base' },
            { title: 'Sélecteurs mois et année' },
            { title: 'Dates min et max' },
            { title: 'Dates désactivées' },
            { title: 'Plusieurs mois' },
            { title: 'Contrôlé' },
        ],
        propDescriptions: {
            value: 'Date sélectionnée en mode contrôlé.',
            defaultValue: 'Date sélectionnée initiale (non contrôlée).',
            onChange: 'Rappel déclenché lors de la sélection d’un jour.',
            showPickers:
                'Affiche en permanence les sélecteurs de mois et d’année au sommet. Si faux, cliquer sur l’étiquette du mois bascule leur affichage.',
            minDate: 'Date minimale sélectionnable.',
            maxDate: 'Date maximale sélectionnable.',
            disabledDates:
                'Dates spécifiques à désactiver ou fonction renvoyant vrai pour les dates désactivées.',
            locale: 'Paramètre régional pour le formatage des dates (Intl.DateTimeFormat).',
            showOutsideDays: 'Affiche les jours du mois précédent ou suivant dans la grille.',
            fixedWeeks: 'Affiche toujours 6 semaines (42 jours) quel que soit le mois.',
            numberOfMonths: 'Nombre de mois à afficher côte à côte.',
        },
        keyboardNavigation: [
            {
                action: 'Déplace le focus vers le jour précédent ou suivant.',
                context: 'Grille des jours',
            },
            {
                action: 'Déplace le focus vers le même jour de la semaine précédente ou suivante.',
                context: 'Grille des jours',
            },
            {
                action: 'Recule ou avance d’un mois.',
                context: 'Grille des jours',
            },
            {
                action: 'Recule ou avance d’une année complète.',
                context: 'Grille des jours',
            },
            {
                action: 'Déplace le focus vers le premier ou dernier jour du mois en cours.',
                context: 'Grille des jours',
            },
            {
                action: 'Sélectionne la date ciblée.',
                context: 'Grille des jours',
            },
        ],
        a11y: [
            'role="application" sur la racine avec aria-label="Calendar".',
            'role="grid" sur la grille des jours avec aria-label pour le mois.',
            'role="row" sur l’en-tête des jours et chaque ligne de semaine.',
            'role="columnheader" sur les cellules de nom de jour avec aria-label.',
            'role="gridcell" sur chaque bouton de jour.',
            'aria-selected sur le jour sélectionné.',
            'aria-disabled sur les jours désactivés.',
            'aria-label sur chaque jour avec la date complète (jour de la semaine, mois, jour, année).',
            'Les boutons de navigation ont aria-label="Mois précédent" / "Mois suivant".',
        ],
    },
}
