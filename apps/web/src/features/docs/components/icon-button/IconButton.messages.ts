import type { DocI18n } from '../doc-messages'

export const iconButtonI18n: DocI18n = {
    fr: {
        description:
            'Bouton carré compact conçu exclusivement pour les déclencheurs avec icône et étiquetage accessible obligatoire.',
        playgroundLabels: {
            tone: 'Nuance (tone)',
            size: 'Taille (size)',
            iconType: 'Icône',
            disabled: 'Désactivé (disabled)',
            loading: 'Chargement (loading)',
        },
        examples: [{ title: 'Nuances sémantiques' }, { title: 'Tailles' }, { title: 'États' }],
        propDescriptions: {
            label: 'Libellé accessible obligatoire transmis directement à aria-label.',
            children: 'Élément d’icône à afficher dans le bouton.',
            tone: 'Nuance sémantique visuelle du bouton.',
            size: 'Dimensions et densité de padding.',
            disabled: 'Désactive les interactions utilisateur.',
            loading: 'Affiche un indicateur de chargement et marque le bouton comme occupé.',
        },
        keyboardNavigation: [
            { key: 'Enter', action: 'Active le bouton' },
            { key: 'Space', action: 'Active le bouton' },
            { key: 'Tab', action: 'Déplace le focus vers le bouton' },
        ],
        a11y: [
            'Exige une prop label descriptive associée à l’attribut aria-label.',
            'L’icône interne doit comporter aria-hidden="true" pour éviter toute redondance sonore.',
            'Indicateur de focus visible conforme aux critères WCAG 2.4.7.',
        ],
    },
}
