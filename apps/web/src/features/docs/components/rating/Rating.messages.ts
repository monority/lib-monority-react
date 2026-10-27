import type { DocI18n } from '../doc-messages'

export const ratingI18n: DocI18n = {
    fr: {
        description:
            'Composant de notation par étoiles interactif pour formulaires ou en affichage statique en lecture seule.',
        playgroundLabels: {
            size: 'Dimension (size)',
            max: 'Étoiles max',
            readOnly: 'Lecture seule (readOnly)',
            disabled: 'Désactivé (disabled)',
        },
        examples: [{ title: 'Tailles (sm, md, lg)' }, { title: 'Mode lecture seule (readOnly)' }],
        propDescriptions: {
            value: 'Valeur contrôlée de la note.',
            defaultValue: 'Valeur initiale non contrôlée.',
            max: 'Nombre maximum d’étoiles.',
            size: 'Taille des étoiles.',
            readOnly: 'Passe le composant en lecture seule non-interactive.',
            disabled: 'Désactive le composant.',
            onChange: 'Rappel déclenché lors du changement de note.',
        },
        keyboardNavigation: [
            {
                action: 'Augmente la note d’une étoile.',
                context: 'Contrôle de notation (rating)',
            },
            {
                action: 'Diminue la note d’une étoile.',
                context: 'Contrôle de notation (rating)',
            },
            {
                action: 'Attribue la première note disponible (1 étoile).',
                context: 'Contrôle de notation (rating)',
            },
            {
                action: 'Attribue la note maximale disponible.',
                context: 'Contrôle de notation (rating)',
            },
        ],
        a11y: [
            'Accessible au clavier via le motif radiogroup et éléments radio.',
            'Navigation par flèches directionnelles (droite/gauche et haut/bas).',
            'Libellé accessible clair spécifiant chaque note (ex: "4 étoiles sur 5").',
        ],
    },
}
