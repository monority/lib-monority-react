import type { DocI18n } from '../doc-messages'

export const cardI18n: DocI18n = {
    fr: {
        description:
            'Primitive de surface pour regrouper du contenu lié avec une densité et une élévation homogènes.',
        playgroundLabels: {
            padding: 'Espacement intérieur (padding)',
            interactive: 'Interactif (survol)',
            title: 'Titre',
            description: 'Description',
            showBadge: 'Badge en-tête',
        },
        examples: [{ title: 'Tailles d’espacement (padding)' }, { title: 'Carte interactive' }],
        propDescriptions: {
            padding: 'Espacement intérieur de la carte.',
            interactive:
                'Ajoute des retours tactiles et visuels au survol pour les cartes sélectionnables.',
        },
        a11y: [
            'Card est un conteneur purement structurel.',
            'Utilisez un véritable élément bouton ou lien pour les actions principales situées dans la carte.',
        ],
    },
}
