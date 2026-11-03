import type { DocI18n } from '../doc-messages'

export const toastI18n: DocI18n = {
    fr: {
        description:
            'Surface de notification éphémère pour les statuts d’arrière-plan, confirmations de succès et retours d’échec. À utiliser pour un retour temporaire lié à une action.',
        playgroundLabels: {
            title: 'Titre de la notification',
            description: 'Description',
            tone: 'Tonalité visuelle',
        },
        examples: [{ title: 'Tonalités' }, { title: 'File d’attente Provider' }],
        propDescriptions: {
            title: 'Titre du toast.',
            description: 'Texte secondaire optionnel.',
            tone: 'Tonalité visuelle du toast.',
            onClose:
                'Rappel du bouton de fermeture. Les toasts mis en file d’attente acceptent également duration via pushToast (par défaut 3600ms, Infinity reste affiché).',
        },
        a11y: [
            'Les toasts neutres et de succès utilisent role="status" avec annonces polies.',
            'Les toasts danger utilisent role="alert" avec annonces assertives.',
            'Les boutons de fermeture exposent un aria-label explicite.',
            'Les toasts en file se ferment automatiquement après expiration (3600ms par défaut) ; la valeur Infinity persiste jusqu’au clic de fermeture.',
        ],
    },
}
