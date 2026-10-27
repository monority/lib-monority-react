import type { DocI18n } from '../doc-messages'

export const checkboxI18n: DocI18n = {
    fr: {
        description:
            'Contrôle de sélection pour des choix indépendants, les actions groupées et les réglages optionnels.',
        playgroundLabels: {
            label: 'Libellé (label)',
            hint: 'Indication (hint)',
            size: 'Dimension (size)',
            tone: 'Tonalité visuelle',
            indeterminate: 'État indéterminé (dash)',
            disabled: 'Désactivé (disabled)',
        },
        examples: [
            { title: 'Désactivé' },
            { title: 'État d’erreur' },
            { title: 'Avec description' },
            { title: 'Indéterminé' },
        ],
        propDescriptions: {
            label: 'Libellé de la case, affiché à côté du contrôle.',
            hint: 'Description d’aide sous le contrôle.',
            error: 'Message d’erreur ; active aussi l’état invalide.',
            checked: 'État coché contrôlé (non contrôlé si omis).',
            defaultChecked: 'État coché initial en mode non contrôlé.',
            onChange: 'Rappel de changement.',
            indeterminate: 'État mixte (tiret).',
            invalid: 'Marque le champ aria-invalid.',
            disabled: 'Désactive la case à cocher.',
            required: 'Indicateur de champ obligatoire.',
            tone: 'Tonalité visuelle.',
            size: 'Taille du contrôle.',
        },
        keyboardNavigation: [
            {
                action: 'Bascule l’état coché / décoché de la case.',
                context: 'Case à cocher focalisée',
            },
            {
                action: 'Passe le focus au champ de formulaire suivant.',
                context: 'Case à cocher focalisée',
            },
        ],
        a11y: [
            'Case native avec label implicite.',
            'Prend en charge l’état mixte (indeterminate).',
            'L’indication et l’erreur sont reliées via aria-describedby.',
            'invalid/error définit aria-invalid.',
            'Anneau de focus visible sur le contrôle via focus-visible.',
        ],
    },
}
