import type { nav as enNav } from '../en/nav'

export const nav = {
    brand: 'Accueil Monority UI',
    primaryNavigation: 'Navigation principale',
    links: {
        docs: 'Docs',
    },
    search: {
        open: 'Rechercher des composants ou des actions (Ctrl+K)',
        placeholder: 'Rechercher des composants…',
        dialogPlaceholder: 'Rechercher un composant, un guide, un thème…',
        empty: 'Aucun composant ou action ne correspond à votre recherche.',
    },
    commandGroups: {
        pages: 'Guides et vues',
        themes: 'Thèmes et atmosphères',
        components: (category: string) => `Composants (${category})`,
    },
    commands: {
        introduction: {
            label: 'Introduction',
            description: 'Principes fondateurs, architecture CSS et installation',
        },
        installation: {
            label: 'Installation',
            description: 'Configuration du paquet npm et des couches CSS',
        },
        home: {
            label: 'Accueil Monority UI',
            description: "Page d'accueil et manifeste de la bibliothèque",
        },
        component: (category: string) => `Composant ${category}`,
    },
    theme: {
        current: (label: string) => `Thème : ${label}`,
        active: 'Actif',
        fallback: 'Thème',
        names: {
            light: 'Clair',
            dark: 'Sombre',
            slate: 'Ardoise',
            ocean: 'Océan',
            night: 'Nuit (Tokyo)',
            oled: 'OLED (Noir pur)',
            highContrast: 'Contraste élevé',
            system: 'Système',
        },
        commands: {
            light: { label: 'Thème clair', description: 'Basculer vers le thème clair pur' },
            dark: { label: 'Thème sombre', description: 'Basculer vers le thème sombre neutre' },
            slate: {
                label: 'Thème ardoise',
                description: 'Basculer vers le thème bleu-gris technique',
            },
            oled: { label: 'Thème OLED', description: 'Basculer vers le contraste infini 0 nit' },
            ocean: { label: 'Thème océan', description: 'Basculer vers le thème aquatique' },
            night: {
                label: 'Thème nuit',
                description: 'Basculer vers le thème nocturne chaleureux',
            },
        },
    },
    motion: {
        on: 'Mouvement : activé',
        off: 'Mouvement : réduit',
        enable: 'Le mouvement est réduit. Cliquer pour activer les animations.',
        disable: 'Les animations sont actives. Cliquer pour réduire le mouvement.',
    },
    language: {
        label: 'Langue',
        switchTo: (language: string) => `Passer en ${language}`,
        current: (language: string) => `Langue actuelle : ${language}`,
    },
    github: 'Dépôt GitHub',
} satisfies typeof enNav
