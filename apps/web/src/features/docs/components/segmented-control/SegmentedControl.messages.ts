import type { DocI18n } from '../doc-messages'

export const segmentedControlI18n: DocI18n = {
    fr: {
        description:
            'Contrôle compact à segments multiples permettant de basculer instantanément entre des vues ou modes exclusifs.',
        playgroundLabels: {
            size: 'Dimension (size)',
            fullWidth: 'Pleine largeur (fullWidth)',
            disabled: 'Désactivé (disabled)',
        },
        examples: [
            { title: 'Tailles standardisées (sm, md, lg)' },
            { title: 'Composition déclarative (SegmentedControl.Item)' },
        ],
        propDescriptions: {
            options: 'Liste des options avec value, label, disabled.',
            value: 'Valeur contrôlée de l’option active.',
            defaultValue: 'Valeur initiale par défaut en mode non contrôlé.',
            onChange: 'Rappel déclenché lors de la sélection d’une option.',
            size: 'Hauteur et échelle de densité du contrôle.',
            fullWidth: 'Occupe toute la largeur disponible du conteneur.',
            disabled: 'Désactive l’ensemble du contrôle.',
        },
        keyboardNavigation: [
            {
                action: 'Déplace la sélection et le focus vers le segment suivant dans le groupe.',
                context: 'Groupe radio (radiogroup)',
            },
            {
                action: 'Déplace la sélection et le focus vers le segment précédent dans le groupe.',
                context: 'Groupe radio (radiogroup)',
            },
            {
                action: 'Sélectionne et active le premier segment non désactivé.',
                context: 'Groupe radio (radiogroup)',
            },
            {
                action: 'Sélectionne et active le dernier segment non désactivé.',
                context: 'Groupe radio (radiogroup)',
            },
            {
                action: 'Active le segment focalisé.',
                context: 'Segment cible',
            },
            {
                action: 'Transfère le focus au prochain élément interactif hors du groupe radio.',
                context: 'Segment actif',
            },
        ],
        a11y: [
            'Conforme au motif WAI-ARIA Radio Group avec role="radiogroup".',
            'Chaque segment possède role="radio" et aria-checked="true|false".',
            'Support complet de la navigation par flèches du clavier (Left/Right/Up/Down) avec roving tabindex.',
        ],
    },
}
