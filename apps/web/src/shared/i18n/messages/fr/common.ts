import type { common as enCommon } from '../en/common'

export const common = {
    appName: 'Monority UI',
    skipToContent: 'Aller au contenu principal',
    footer: {
        navigation: 'Navigation de pied de page',
        documentation: 'Documentation',
        designStudio: 'Design Studio',
        license: 'Monority UI — Licence MIT',
    },
    notFound: {
        seoTitle: '404',
        seoDescription: 'Page introuvable.',
        text: 'Page introuvable.',
        home: 'Retour à l’accueil',
        docs: 'Parcourir la documentation',
    },
    error: {
        eyebrow: 'Erreur applicative',
        title: 'Une erreur a interrompu le rendu de l’application.',
        description:
            'L’application reste capable d’afficher un état d’erreur propre plutôt qu’un écran cassé.',
        reload: 'Recharger',
    },
} satisfies typeof enCommon
