import type { DocI18n } from '../doc-messages'

export const textareaI18n: DocI18n = {
    fr: {
        description:
            'Champ de texte multi-lignes avec wrapper Field pour libellé, indication et erreur.',
        playgroundLabels: {
            label: 'Libellé (label)',
            placeholder: 'Placeholder',
            hint: 'Indication (hint)',
            size: 'Dimension (size)',
            tone: 'Tonalité visuelle',
            rows: 'Lignes initiales (rows)',
            maxLength: 'Limite de caractères (maxLength)',
            disabled: 'Désactivé (disabled)',
            invalid: 'Invalide (invalid)',
        },
        examples: [
            { title: 'Avec libellé' },
            { title: 'État d’erreur' },
            { title: 'Désactivé' },
            { title: 'Compteur de caractères' },
            { title: 'Redimensionnable' },
        ],
        propDescriptions: {
            tone: 'Tonalité visuelle de la bordure.',
            size: 'Densité du contrôle.',
            label: 'Libellé du champ affiché au-dessus de la zone de texte.',
            hint: 'Texte d’aide affiché sous la zone de texte.',
            error: 'Message d’erreur. Définit aria-invalid et remplace le style de l’indication.',
            invalid: 'État invalide explicite. Automatiquement vrai quand error est fourni.',
            rows: 'Hauteur initiale visible en lignes.',
            disabled: 'Désactive la saisie et atténue le contrôle.',
            required: 'Ajoute le marqueur obligatoire.',
            maxLength: 'Longueur maximale en caractères. Affiche un compteur live quand défini.',
            value: 'Valeur contrôlée. Si omise, la zone de texte est non contrôlée et `defaultValue` définit la valeur initiale.',
            defaultValue:
                'Valeur initiale non contrôlée. Utiliser à la place de `value` pour un champ de formulaire non contrôlé.',
            placeholder: 'Texte natif placeholder.',
        },
        keyboardNavigation: [
            {
                action: 'Navigue vers ou hors de la zone de texte multi-lignes.',
                context: 'Zone de texte',
            },
            {
                action: 'Insère un retour chariot au sein du texte.',
                context: 'Zone de texte',
            },
        ],
        a11y: [
            'Élément <textarea> natif avec sémantique de formulaire implicite.',
            'Label associé via htmlFor (généré à partir de l’id).',
            'aria-invalid="true" défini quand error est fourni ou invalid=true.',
            'aria-describedby relie les messages d’indication et d’erreur à la zone de texte.',
            'Le compteur de caractères utilise aria-live="polite" pour les lecteurs d’écran.',
            'Anneau de focus visible pour la navigation clavier.',
            'État désactivé : attribut natif disabled utilisé.',
            'La couleur n’est pas le seul indicateur — l’état invalide utilise aussi aria-invalid.',
        ],
    },
}
