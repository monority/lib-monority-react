import type { DocI18n } from '../doc-messages'

export const timelineI18n: DocI18n = {
    fr: {
        description:
            'Fil chronologique structuré pour l’historique d’activités, les pipelines de déploiement et le suivi séquentiel d’étapes avec marqueurs icônes ou points.',
        playgroundLabels: {
            orientation: 'Orientation',
            size: 'Taille',
            lineStyle: 'Style de ligne',
            markerType: 'Marqueur',
            itemCount: 'Nombre d’étapes',
        },
        examples: [
            { title: 'Composition riche avec sous-composants et icônes' },
            { title: 'Fil interactif avec sélection d’étapes' },
            { title: 'Orientation horizontale' },
        ],
        propDescriptions: {
            items: 'Tableau déclaratif d’étapes ou d’événements (id, date, title, description, status, icon, extra, lineStyle).',
            orientation: 'Direction d’affichage de la chronologie.',
            size: 'Échelle dimensionnelle des marqueurs, des typographies et des espacements.',
            lineStyle: 'Style géométrique de la ligne connectrice.',
            children: 'Sous-composants personnalisés en mode composition libre.',
        },
        a11y: [
            'Balisage sémantique utilisant une liste ordonnée (<ol>) et des éléments de liste (<li>).',
            'Dates encapsulées dans la balise native <time> avec chiffres tabulaires.',
            'Marqueurs d’étape décoratifs masqués aux lecteurs d’écran (aria-hidden).',
            'Rôles interactifs et navigation clavier (Entrée / Espace) pour les éléments interactifs avec focus visible.',
        ],
    },
}
