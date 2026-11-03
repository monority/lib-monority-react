import type { DocI18n } from '../doc-messages'

export const inlineAlertI18n: DocI18n = {
    fr: {
        description:
            'Surface de statut intégrée pour les messages contextuels dans les formulaires, paramètres et flux de travail.',
        playgroundLabels: {
            title: 'Titre de l’alerte',
            description: 'Description',
            tone: 'Tonalité visuelle',
            actionLabel: 'Bouton d’action (optionnel)',
        },
        examples: [{ title: 'Tonalités' }, { title: 'Avec action' }],
        propDescriptions: {
            tone: 'Tonalité visuelle.',
            title: 'Titre de l’alerte.',
            description: 'Description détaillée.',
            actionLabel: 'Libellé du bouton d’action.',
            onAction: 'Rappel déclenché lors du clic sur l’action.',
        },
        a11y: [
            'La tonalité danger applique role="alert" pour une notification immédiate.',
            'Les autres tonalités utilisent role="status".',
            'Veillez à fournir un texte explicite afin que la couleur ne soit pas le seul élément distinctif.',
        ],
    },
}
