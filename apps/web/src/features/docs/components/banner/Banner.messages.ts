import type { DocI18n } from '../doc-messages'

export const bannerI18n: DocI18n = {
    fr: {
        description:
            'Notification en haut de page avec sur-titre, titre, description et actions facultatives. À utiliser pour les informations persistantes au niveau de la page ou de la section.',
        playgroundLabels: {
            title: 'Titre du bandeau',
            description: 'Description',
            eyebrow: 'Sur-titre (eyebrow)',
            tone: 'Tonalité visuelle',
        },
        examples: [{ title: 'Tonalités' }, { title: 'Avec actions' }, { title: 'Avec sur-titre' }],
        propDescriptions: {
            tone: 'Tonalité visuelle.',
            eyebrow: 'Texte d’introduction au-dessus du titre.',
            title: 'Titre du bandeau.',
            description: 'Description détaillée du bandeau.',
            actions: 'Boutons d’action.',
            children: 'Message de repli lorsque le titre et la description sont omis.',
        },
        a11y: [
            'Rend une section statique : ajoutez vous-même role="alert" pour les messages urgents.',
            'Utilisez des titres sémantiques dans le contenu du bandeau.',
        ],
    },
}
