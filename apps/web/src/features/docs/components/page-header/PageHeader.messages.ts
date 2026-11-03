import type { DocI18n } from '../doc-messages'

export const pageHeaderI18n: DocI18n = {
    fr: {
        description:
            'En-tête de page sémantique pour regrouper les titres, résumés, métadonnées et actions principales au niveau de la vue.',
        playgroundLabels: {
            kicker: 'Surtitre (kicker)',
            title: 'Titre principal',
            description: 'Description',
            showActions: 'Boutons d’action',
        },
        examples: [{ title: 'Avec titre et métadonnées' }, { title: 'Avec groupe d’actions' }],
        propDescriptions: {
            children:
                'Sous-composants et contenu de l’en-tête (PageHeader.Main, PageHeader.Actions, etc.).',
        },
        a11y: [
            'Rend un élément sémantique <header> natif.',
            'Utilisez un unique titre h1 dans l’en-tête de page pour le titre principal de la vue.',
            'Placez les actions après le bloc textuel dans l’ordre du DOM pour préserver un flux de lecture logique.',
        ],
    },
}
