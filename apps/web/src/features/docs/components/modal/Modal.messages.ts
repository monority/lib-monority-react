import type { DocI18n } from '../doc-messages'

export const modalI18n: DocI18n = {
    fr: {
        description:
            'Surface de dialogue focalisée pour les flux de décision courts, la confirmation et les tâches d’édition compactes.',
        playgroundLabels: {
            title: 'Titre du dialogue',
            description: 'Description du dialogue',
            confirmLabel: 'Bouton de confirmation',
        },
        examples: [
            { title: 'Avec formulaire' },
            { title: 'Contenu défilable' },
        ],
        propDescriptions: {
            open: 'Toujours contrôlé : passez un useState, pas de mode non contrôlé.',
            title: 'Libellé du dialogue.',
            onClose: 'Appelé depuis l’arrière-plan, le bouton de fermeture et Escape.',
            children: 'Contenu du corps du dialogue.',
        },
        keyboardNavigation: [
            {
                action: 'Ferme la boîte de dialogue modale et restitue le focus à l’élément appelant.',
                context: 'Modale ouverte',
            },
            {
                action: 'Fait circuler le focus entre les éléments interactifs piégés dans la modale.',
                context: 'Modale ouverte',
            },
            {
                action: 'Fait circuler le focus en sens inverse dans la modale.',
                context: 'Modale ouverte',
            },
        ],
        a11y: [
            'Le panneau utilise role="dialog" et aria-modal="true".',
            'L’identifiant du titre est connecté via aria-labelledby.',
            'Le focus est piégé pendant l’ouverture de la modale et Escape la ferme.',
            'Le bouton de fermeture utilise un libellé français codé en dur ; remplacez le DOM si i18n nécessaire.',
        ],
    },
}
