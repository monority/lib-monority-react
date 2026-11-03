import type { DocI18n } from '../doc-messages'

export const calloutI18n: DocI18n = {
    fr: {
        description:
            'Encart stylisé pour les notes, astuces et informations contextuelles mises en valeur. À utiliser pour les explications insérées directement dans le contenu environnant.',
        playgroundLabels: {
            title: 'Titre de l’encart',
            description: 'Description',
            tone: 'Tonalité visuelle',
        },
        examples: [{ title: 'Tonalités' }, { title: 'Avec contenu enfant' }],
        propDescriptions: {
            title: 'Titre de l’encart.',
            description: 'Description de l’encart.',
            tone: 'Tonalité visuelle.',
            children: 'Contenu personnalisé rendu sous le titre et la description.',
            role: 'Rôle ARIA. Utilisez "alert" pour les messages urgents.',
        },
        a11y: [
            'Rôle par défaut "note".',
            'Pour les erreurs critiques, utilisez role="alert" ou role="status".',
            'La structure des titres sémantiques est préservée.',
        ],
    },
}
