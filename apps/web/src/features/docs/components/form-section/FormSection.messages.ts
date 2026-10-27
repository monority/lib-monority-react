import type { DocI18n } from '../doc-messages'

export const formSectionI18n: DocI18n = {
    fr: {
        description:
            'Panneau de formulaire groupé avec contexte d’en-tête, métadonnées optionnelles et rangée d’actions dédiée.',
        playgroundLabels: {
            title: 'Titre de la section',
            showMeta: 'Afficher le badge méta',
            showActions: 'Afficher les actions',
        },
        examples: [
            { title: 'Composition composée (Compound)' },
            { title: 'Sans actions' },
            { title: 'Avec badge méta' },
        ],
        propDescriptions: {
            title: 'Titre de la section.',
            description: 'Description de la section.',
            meta: 'Métadonnées affichées à côté de l’en-tête.',
            actions: 'Rangée d’actions rendue sous le contenu du formulaire.',
            children: 'Champs de formulaire.',
        },
        keyboardNavigation: [
            {
                action: 'Navigue séquentiellement à travers les champs de saisie et les boutons d’action.',
                context: 'Section de formulaire',
            },
            {
                action: 'Valide l’action principale lorsque le focus est sur un contrôle ou un bouton.',
                context: 'Section de formulaire',
            },
        ],
        a11y: [
            'Le titre est rendu sous forme de balise <h3> pour une hiérarchie sémantique appropriée.',
            'Les actions groupées sont situées dans une région de pied de page cohérente.',
            'Le comportement au clavier s’appuie sur les contrôles de formulaire natifs intégrés dans la section.',
        ],
    },
}
