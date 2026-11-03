import type { DocI18n } from '../doc-messages'

export const selectI18n: DocI18n = {
    fr: {
        description:
            'Contrôle select natif avec un état fermé entièrement stylé. Le menu d’options ouvert utilise la présentation du navigateur et du système d’exploitation.',
        playgroundLabels: {
            label: 'Libellé (label)',
            hint: 'Indication (hint)',
            size: 'Dimension (size)',
            tone: 'Tonalité visuelle',
            disabled: 'Désactivé (disabled)',
            loading: 'Chargement (loading)',
            invalid: 'Invalide (invalid)',
        },
        examples: [
            { title: 'Avec indication' },
            { title: 'État de chargement' },
            { title: 'État invalide' },
            { title: 'Désactivé' },
            { title: 'Obligatoire' },
            { title: 'Tailles' },
        ],
        propDescriptions: {
            label: 'Libellé du champ',
            hint: 'Description d’aide',
            error: 'Message d’erreur',
            size: 'Taille du champ',
            tone: 'Tonalité visuelle',
            value: 'Valeur sélectionnée contrôlée. Utiliser `defaultValue` pour un mode non contrôlé.',
            defaultValue: 'Valeur initiale non contrôlée.',
            onChange:
                'Rappel natif de changement. La valeur est disponible via `event.target.value`.',
            required: 'Indicateur de champ obligatoire',
            disabled: 'État désactivé',
            loading:
                'Indicateur de chargement asynchrone qui remplace le chevron par un spinner et active aria-busy.',
            invalid: 'État invalide',
            children: 'Éléments option et optgroup.',
            className: 'Nom de classe supplémentaire',
        },
        keyboardNavigation: [
            {
                action: 'Ouvre le menu contextuel natif de sélection des options.',
                context: 'Select focalisé',
            },
            {
                action: 'Fait défiler les options disponibles et modifie la valeur sélectionnée.',
                context: 'Select focalisé ou menu déroulant',
            },
            {
                action: 'Valide l’option active et déplace le focus au champ suivant du formulaire.',
                context: 'Select focalisé',
            },
            {
                action: 'Referme la liste d’options native sans modifier la sélection.',
                context: 'Menu d’options ouvert',
            },
        ],
        a11y: [
            'Sémantique native d’élément de formulaire.',
            'Prend en charge disabled/required/aria-invalid.',
            'Anneau de focus visible.',
            'Label associé pour les lecteurs d’écran.',
            'La présentation du menu ouvert est contrôlée par le navigateur et le système d’exploitation.',
        ],
    },
}
