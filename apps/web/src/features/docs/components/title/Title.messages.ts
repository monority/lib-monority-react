import type { DocI18n } from '../doc-messages'

export const titleI18n: DocI18n = {
    fr: {
        description:
            'Composant d’en-tête polymorphique pour structurer la hiérarchie sémantique des pages et des panneaux.',
        playgroundLabels: {
            size: 'Taille visuelle (size)',
            as: 'Balise sémantique (as)',
            content: 'Texte du titre',
        },
        examples: [{ title: 'Échelle de tailles' }, { title: 'Niveaux de titre (h1-h6)' }],
        propDescriptions: {
            as: 'Niveau sémantique du titre rendu (h1 à h6).',
            size: 'Échelle visuelle et taille du titre.',
            children: 'Contenu du titre.',
        },
        a11y: [
            'Choisissez la prop as en fonction de la structure logique du document, indépendamment de la taille visuelle.',
            'Évitez de sauter des niveaux de titre pour préserver la navigabilité des lecteurs d’écran.',
        ],
    },
}
