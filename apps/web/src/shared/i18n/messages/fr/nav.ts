import type { nav as enNav } from '../en/nav'

export const nav = {
    brand: 'Accueil Monority UI',
    primaryNavigation: 'Navigation principale',
    links: {
        docs: 'Docs',
        moodboard: 'Moodboard',
    },
    search: {
        open: 'Rechercher des composants ou des actions (Ctrl+K)',
        placeholder: 'Rechercher des composants…',
        dialogPlaceholder: 'Rechercher un composant, un guide, un thème…',
        empty: 'Aucun composant ou action ne correspond à votre recherche.',
    },
    banner: {
        eyebrow: 'Vague 7',
        description: (componentCount: number) =>
            `Système de mouvement, anneaux de focus calibrés, documentation interactive sur ${componentCount} composants et conformité WCAG 2.1 AA.`,
        cta: 'Voir le journal',
    },
    changelog: {
        trigger: 'Derniers changements',
        title: 'Journal des modifications',
        tag: 'V7',
        badge: 'Vague 7',
        waves: [
            {
                title: 'Vague 7 — Mouvement, focus et documentation',
                items: [
                    'Playgrounds interactifs dynamiques',
                    'Système de mouvement tokenisé et anneaux de focus calibrés',
                    'Certification accessibilité WCAG 2.1 AA (0 violation Axe)',
                ],
            },
            {
                title: 'Vague 6 — Composants avancés et qualité',
                items: [
                    'CommandPalette, FileUpload, SidebarLayout, Combobox compound',
                    'Composition déclarative et rétro-compatibilité totale',
                    'Purge intégrale des emojis Unicode dans tout le dépôt',
                    'AppHeader : intégration Banner compound',
                ],
            },
            {
                title: 'Vague 5 — Fenêtres modales et tiroirs',
                items: ['Modal, Dialog, Sheet, Drawer : architecture compound'],
            },
            {
                title: 'Vague 4 — Données et collections',
                items: ['Table, Tabs, Pagination : architecture compound'],
            },
            {
                title: 'Vague 3 — Overlays et interface dynamique',
                items: [
                    'Calendar, Popover, HoverCard, Tooltip, Collapsible, Avatar, Carousel compound',
                ],
            },
            {
                title: 'Vague 2 — Menus et navigation',
                items: ['NavigationMenu, Menubar et Stepper compound'],
            },
            {
                title: 'Vague 1 — Formulaires et données',
                items: ['Select, DropdownMenu, ContextMenu, Accordion compound'],
            },
        ],
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
        moodboard: {
            label: 'Moodboard (Studio)',
            description: 'Tableau de bord interactif et bac à sable de personnalisation',
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
