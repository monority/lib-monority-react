import type { DocI18n } from '../doc-messages'

export const fieldI18n: DocI18n = {
    fr: {
        description:
            'Brique de construction pour les contrôles de formulaire : associe les champs aux labels, indications et messages d’erreur.',
        playgroundLabels: {
            label: 'Libellé (label)',
            required: 'Champ obligatoire (required)',
            hint: 'Indication d’aide (hint)',
            state: 'État de validation',
        },
        examples: [
            { title: 'Avec Select' },
            { title: 'Avec Textarea' },
            { title: 'Avec NumberInput' },
            { title: 'Avec Slider' },
            { title: 'Avec Switch' },
            { title: 'Formulaire complet multi-composants' },
            { title: 'Avec indication' },
            { title: 'Avec erreur' },
            { title: 'Obligatoire' },
            { title: 'Autonome' },
            { title: 'Composition' },
            { title: 'Groupe' },
            { title: 'Fieldset' },
        ],
        propDescriptions: {
            label: 'Label du champ.',
            hint: 'Description d’aide reliée via aria-describedby.',
            error: 'Message d’erreur avec aria-invalid.',
            required: 'Indicateur d’obligation.',
            htmlFor: 'ID du champ contrôlé.',
            labelId: 'ID personnalisé de l’élément label.',
            hintId: 'ID personnalisé de l’élément indication (généré automatiquement si omis).',
            errorId: 'ID personnalisé de l’élément erreur (généré automatiquement si omis).',
            children: 'Élément d’entrée.',
        },
        a11y: [
            'Le label transmet htmlFor pour rendre l’association au contrôle explicite.',
            'Les identifiants d’indication et d’erreur alimentent aria-describedby.',
            'Les erreurs définissent aria-invalid sur le champ contrôlé.',
        ],
    },
}
