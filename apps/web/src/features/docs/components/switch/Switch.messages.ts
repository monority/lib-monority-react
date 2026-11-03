import type { DocI18n } from '../doc-messages'

export const switchI18n: DocI18n = {
    fr: {
        description:
            'Contrôle marche/arrêt immédiat pour réglages persistants et indicateurs de fonctionnalités.',
        playgroundLabels: {
            label: 'Libellé (label)',
            hint: 'Indication (hint)',
            size: 'Dimension (size)',
            tone: 'Tonalité visuelle',
            disabled: 'Désactivé (disabled)',
        },
        examples: [{ title: 'Tailles' }, { title: 'Tons' }, { title: 'État d’erreur' }],
        propDescriptions: {
            checked:
                'État coché contrôlé. Omettre pour utiliser le mode non contrôlé avec `defaultChecked`.',
            defaultChecked: 'État coché initial en mode non contrôlé.',
            onChange:
                'Callback natif de l’événement de changement (event.target.checked donne le nouvel état).',
            label: 'Libellé visible de l’interrupteur.',
            tone: 'Tonalité visuelle.',
            size: 'Taille de l’interrupteur.',
            disabled: 'État désactivé.',
            required: 'Indicateur de champ requis.',
            invalid: 'État invalide.',
            hint: 'Description d’aide.',
            error: 'Message d’erreur.',
            className: 'Nom de classe supplémentaire.',
        },
        keyboardNavigation: [
            {
                action: 'Bascule l’interrupteur entre l’état activé et désactivé.',
                context: 'Switch focalisé',
            },
            {
                action: 'Bascule l’interrupteur (si pris en charge par le navigateur ou le formulaire).',
                context: 'Switch focalisé',
            },
            {
                action: 'Transfère le focus au composant interactif suivant.',
                context: 'Switch focalisé',
            },
        ],
        a11y: [
            'Sémantique native d’interrupteur avec role="switch".',
            'Prend en charge disabled/required/aria-invalid.',
            'Anneau de focus visible.',
            'Utilisez un interrupteur uniquement quand le changement s’applique immédiatement.',
        ],
    },
}
