import type { DocI18n } from '../doc-messages'

export const radioGroupI18n: DocI18n = {
    fr: {
        description:
            'Groupe de boutons radio avec libellé, indication, erreur, descriptions et navigation clavier accessible.',
        playgroundLabels: {
            label: 'Libellé du groupe',
            hint: 'Indication (hint)',
            size: 'Dimension (size)',
            tone: 'Tonalité visuelle',
            disabled: 'Désactivé (disabled)',
            invalid: 'Invalide (invalid)',
        },
        examples: [
            { title: 'Invalide' },
            { title: 'Avec descriptions' },
            { title: 'Style carte de choix' },
            { title: 'Avec wrapper Field' },
        ],
        propDescriptions: {
            label: 'Libellé du groupe.',
            hint: 'Description d’aide reliée via aria-describedby.',
            error: 'Message d’erreur.',
            items: 'Options radio. Chaque élément : { value, label, description?, disabled? }.',
            value: 'Valeur contrôlée.',
            defaultValue: 'Valeur par défaut (non contrôlé).',
            onChange: 'Rappel de changement recevant la valeur sélectionnée.',
            required: 'Indicateur de champ obligatoire.',
            disabled: 'Désactive tout le groupe.',
            invalid: 'Marque manuellement comme invalide.',
            name: 'Attribut HTML name des champs radio.',
            size: 'Densité de l’indicateur radio et du libellé.',
            tone: 'Tonalité visuelle. Utiliser ’danger’ avec une erreur.',
        },
        keyboardNavigation: [
            {
                action: 'Sélectionne et focalise l’option radio suivante.',
                context: 'Groupe radio (radiogroup)',
            },
            {
                action: 'Sélectionne et focalise l’option radio précédente.',
                context: 'Groupe radio (radiogroup)',
            },
            {
                action: 'Active et coche l’option radio actuellement focalisée.',
                context: 'Option radio ciblée',
            },
            {
                action: 'Transfère le focus vers le composant suivant hors du groupe radio.',
                context: 'Groupe radio (radiogroup)',
            },
        ],
        a11y: [
            'Sémantique native <input type="radio">.',
            'role="radiogroup" sur le conteneur.',
            'Les flèches naviguent entre les options.',
            'Anneau de focus visible via focus-visible.',
            'Label associé pour les lecteurs d’écran.',
            'Descriptions reliées via aria-describedby.',
            'aria-invalid et data-invalid définis sur radiogroup quand la prop invalid est appliquée.',
        ],
    },
}
