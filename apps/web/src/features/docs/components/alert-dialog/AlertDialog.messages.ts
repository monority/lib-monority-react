import type { DocI18n } from '../doc-messages'

export const alertDialogI18n: DocI18n = {
    fr: {
        description:
            'Boîte d’alerte de confirmation pour les actions destructrices ou à fortes conséquences qui exigent une friction supplémentaire.',
        playgroundLabels: {
            tone: 'Tonalité',
            title: 'Titre de l’alerte',
            description: 'Description des conséquences',
            confirmLabel: 'Libellé de confirmation',
            cancelLabel: 'Libellé d’annulation',
        },
        examples: [
            { title: 'Syntaxe composée' },
            { title: 'Tonalité par défaut' },
            { title: 'Libellés personnalisés' },
        ],
        propDescriptions: {
            open: 'Contrôle l’état d’ouverture.',
            title: 'Titre de la boîte d’alerte.',
            description: 'Description de la boîte d’alerte.',
            confirmLabel: 'Libellé du bouton de confirmation.',
            cancelLabel: 'Libellé du bouton d’annulation.',
            tone: 'Tonalité visuelle.',
            onConfirm: 'Rappel de confirmation.',
            onCancel: 'Rappel d’annulation.',
        },
        keyboardNavigation: [
            {
                action: 'Annule l’action et referme la boîte d’alerte sans appliquer de changement.',
                context: 'Boîte d’alerte ouverte',
            },
            {
                action: 'Bascule le focus entre le bouton d’annulation et le bouton de confirmation.',
                context: 'Boîte d’alerte ouverte',
            },
            {
                action: 'Active le bouton d’action actuellement sous le focus (Annuler ou Confirmer).',
                context: 'Bouton d’action actif',
            },
        ],
        a11y: [
            'Le panneau utilise role="alertdialog" avec aria-modal="true".',
            'Le message est exposé via aria-describedby lorsqu’il est présent.',
            'Le focus se déplace dans la boîte d’alerte et Escape la rejette.',
            'Les actions destructrices restent clairement libellées et visuellement distinctes.',
            'Les libellés par défaut des boutons sont en français ; remplacez confirmLabel/cancelLabel pour les autres langues.',
        ],
    },
}
