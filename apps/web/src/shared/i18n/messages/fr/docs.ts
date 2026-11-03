import type { docs as enDocs } from '../en/docs'

export const docs = {
    sidebar: {
        kicker: 'Monority UI',
        title: 'Docs',
        searchPlaceholder: 'Rechercher des composants',
        searchLabel: 'Rechercher des composants',
        empty: (query: string) => `Aucun composant ne correspond à « ${query} ».`,
        clearSearch: 'Effacer la recherche',
        navigation: 'Documentation',
        openMenu: 'Ouvrir le menu de la documentation',
        closeMenu: 'Fermer le menu de la documentation',
        mobileNavigation: 'Navigation de la documentation',
    },
    toc: {
        label: 'Table des matières',
        title: 'Sur cette page',
    },
    pager: {
        ariaLabel: 'Pagination de la documentation',
        previous: 'Précédent',
        next: 'Suivant',
    },
    hero: {
        kicker: 'Composant',
        loading: 'Chargement…',
        notFoundTitle: 'Introuvable',
        notFoundDescription: 'Aucune documentation trouvée pour ce composant.',
        backToComponents: 'Revenir à la liste des composants',
    },
    sections: {
        overview: {
            title: 'Aperçu',
            description: "Démonstration interactive et code d'intégration.",
        },
        examples: {
            title: 'Exemples',
            description: "Variantes et modes d'usage fréquents.",
        },
        api: {
            title: 'Propriétés et API',
            description: "Contrat d'interface et typage TypeScript des options acceptées.",
        },
        styling: {
            title: 'Personnalisation et tokens',
            description: 'Classes CSS documentées et variables de conception associées.',
        },
        keyboard: {
            title: 'Navigation au clavier',
            description: 'Raccourcis et comportements au clavier conformes WAI-ARIA.',
        },
        accessibility: {
            title: 'Accessibilité et recommandations',
            description: 'Comportements WAI-ARIA, rôles et gestion des lecteurs d’écran.',
        },
        cssHooks: 'Hooks CSS',
        tokens: 'Tokens',
    },
    table: {
        prop: 'Propriété',
        type: 'Type',
        defaultValue: 'Défaut',
        description: 'Description',
        key: 'Touche / raccourci',
        behavior: 'Comportement',
        context: 'Contexte',
        global: 'Global',
    },
    playground: {
        badge: 'Aperçu',
        properties: 'Propriétés dynamiques',
        reset: 'Réinitialiser',
        resetLabel: 'Réinitialiser les propriétés',
    },
    guides: {
        introduction: 'Introduction',
        installation: 'Installation',
    },
    categories: {
        actions: {
            title: 'Actions',
            description: 'Boutons, déclencheurs icône, boutons de copie et commandes basculables.',
        },
        forms: {
            title: 'Formulaires et saisies',
            description:
                'Contrôles de saisie accessibles, sélecteurs de dates, champs structurés et validation.',
        },
        navigation: {
            title: 'Navigation',
            description:
                'Onglets, contrôles segmentés, fils d’Ariane, pagination, barres supérieures et coques.',
        },
        overlays: {
            title: 'Overlays',
            description:
                'Dialogues, panneaux latéraux, tiroirs, menus, palettes de commandes, popovers et infobulles.',
        },
        display: {
            title: 'Affichage',
            description: 'Cartes, accordéons, blocs repliables, carrousels, avatars et nuanciers.',
        },
        data: {
            title: 'Données',
            description:
                'Tables structurées, listes de données, grilles de métriques, cartes statistiques et chronologies.',
        },
        feedback: {
            title: 'Retour et statuts',
            description:
                'Badges, encadrés, bannières, alertes, squelettes, barres de progression et notifications.',
        },
        layout: {
            title: 'Mise en page',
            description:
                'Grilles, piles, conteneurs, sections, panneaux redimensionnables et zones de défilement.',
        },
        typography: {
            title: 'Typographie',
            description:
                'Titres sémantiques, texte courant, touches clavier et blocs de code formatés.',
        },
        brand: {
            title: 'Marque',
            description: 'Primitive vectorielle officielle du symbole Monority UI.',
        },
        experimental: {
            title: 'Expérimental',
            description: 'Chargement progressif et primitives d’interaction spécialisées.',
        },
    },
} satisfies typeof enDocs
