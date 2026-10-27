import type { DocI18n } from '../doc-messages'

export const asyncStateNoticeI18n: DocI18n = {
    fr: {
        description:
            'Affiche des avis d’état de chargement ou d’erreur pour les opérations asynchrones.',
        playgroundLabels: {
            stateMode: 'État asynchrone',
            loadingMessage: 'Message de chargement',
            errorMessage: 'Message d’erreur',
        },
        examples: [
            { title: 'État d’erreur' },
            { title: 'Message personnalisé' },
            { title: 'Interactif' },
        ],
        propDescriptions: {
            isLoading: 'Affiche l’état de chargement.',
            isError: 'Affiche l’état d’erreur.',
            loadingMessage: 'Texte du message de chargement.',
            errorMessage: 'Texte du message d’erreur.',
            loadingContent: 'Contenu de chargement personnalisé.',
        },
        a11y: [
            'aria-live="polite" pour les annonces d’état.',
            'L’indicateur de chargement est masqué aux lecteurs d’écran via aria-hidden.',
            'L’état d’erreur utilise role="alert".',
        ],
    },
}
