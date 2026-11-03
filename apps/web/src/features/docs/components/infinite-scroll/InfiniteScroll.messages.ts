import type { DocI18n } from '../doc-messages'

export const infiniteScrollI18n: DocI18n = {
    fr: {
        description:
            'Conteneur de défilement infini basé sur IntersectionObserver avec indicateur de chargement, message de fin et gestion des erreurs.',
        playgroundLabels: {
            state: 'État du chargement',
        },
        examples: [{ title: 'État d’erreur' }, { title: 'Message de fin' }],
        propDescriptions: {
            onLoadMore:
                'Rappel déclenché lorsque la sentinelle entre dans la zone de visualisation.',
            hasMore: 'Indique si d’autres éléments peuvent être chargés.',
            loader: 'Contenu affiché pendant le chargement.',
            endMessage: 'Contenu affiché lorsque tous les éléments ont été chargés.',
            error: 'Contenu d’erreur affiché lors d’un échec de chargement.',
            onRetry: 'Rappel de nouvelle tentative pour l’état d’erreur.',
            children: 'Éléments de la liste à afficher.',
        },
        a11y: [
            'Chargement basé sur IntersectionObserver.',
            'La sentinelle est masquée aux technologies d’assistance via aria-hidden.',
            'Les états de chargement et d’erreur sont annoncés via aria-live.',
        ],
    },
}
