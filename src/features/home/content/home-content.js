export const homeHeroContent = {
    eyebrow: 'Base React + Vite 2026',
    title: 'Starter frontend pro, propre et reutilisable.',
    description:
        'Architecture claire, design system minimal et dark mode natif pour accelerer tes prochains produits.',
    supportingCopy:
        "L'ancien hero conserve son role editorial. Le nouveau bloc vient a cote pour presenter la base technique sans casser la lecture ni le rythme de la page.",
    primaryActionLabel: 'Demarrer',
    secondaryActionLabel: 'Voir composant modal',
    quickLinks: [
        { label: 'Voir le showcase', to: '/showcase' },
        { label: 'Lire la doc UI', to: '/docs' },
    ],
    spotlight: {
        eyebrow: 'Nouveau bloc compatible',
        title: 'Socle feature-first, UI prete et conventions stables.',
        description:
            "Le starter expose un panneau secondaire qui peut evoluer en dashboard, checklist projet ou tease produit selon le projet que tu lances.",
        items: [
            'Routing et navigation centralises',
            'Theme global sans boilerplate par page',
            'Sections compatibles desktop et mobile',
        ],
    },
}

export const homeFeatureItems = [
    {
        title: 'Conventionne',
        description: "Structure previsible et standards clairs pour l'equipe.",
    },
    {
        title: 'Maintenable',
        description: 'Composants UI decouples et styles tokenises.',
    },
    {
        title: 'Dynamique',
        description: 'Dark mode, responsive natif et base accessible.',
    },
]

export const homeWhyContent = {
    badge: 'Why',
    title: 'Pourquoi cette base tient mieux dans le temps',
    description:
        "Le but n est pas seulement de demarrer vite, mais de rester propre quand le projet grossit et que les usages se multiplient.",
    items: [
        {
            title: 'Architecture lisible',
            description: 'Routes, layouts, providers et features sont deja separes avec une source de verite claire.',
        },
        {
            title: 'Design system utile',
            description: 'Les tokens et composants couvrent deja de vrais cas produit, pas seulement des demos de surface.',
        },
        {
            title: 'Base verifiable',
            description: 'Tests, build, lint et audit Lighthouse servent de garde-fous des le starter.',
        },
    ],
}

export const homeDesignSystemContent = {
    badge: 'Etape 5',
    title: 'Design System Core',
    description:
        "Tokens, surfaces, rythme vertical, composants UI et theming centralise. Cette couche devient le socle de l'application modele.",
    tokenItems: [
        'Tokens semantiques, espaces, ombres, rayons',
        'Theme clair, sombre et mode system pilote par variables',
        'Button, Input, Textarea, Select, IconButton',
        'Container, Section, Grid, Stack, Title, Text, Divider, EmptyState',
    ],
    dividerLabel: 'Starter UI primitives',
}

export const homePatternsContent = {
    badge: 'Ready to ship',
    title: 'Patterns deja prets pour des pages serieuses',
    description:
        "Le starter ne se limite plus a des primitives. Il embarque deja des patterns de page reutilisables pour accelerer une vraie base produit.",
    items: [
        {
            title: 'Pages dashboard',
            description: 'Compose `PageHeader`, `MetricGrid`, `StatCard` et `DataList` pour poser une overview propre rapidement.',
            components: ['PageHeader', 'MetricGrid', 'StatCard', 'DataList'],
        },
        {
            title: 'Pages settings',
            description: 'Assemble `SidebarLayout`, `FormSection`, `InlineAlert` et `Button` pour des flows de configuration lisibles.',
            components: ['SidebarLayout', 'FormSection', 'InlineAlert', 'Button'],
        },
        {
            title: 'Shells d application',
            description: 'Utilise `Topbar`, `Toolbar`, `FilterBar` et `CommandPalette` pour structurer les vues plus denses.',
            components: ['Topbar', 'Toolbar', 'FilterBar', 'CommandPalette'],
        },
    ],
}

export const homeExamplesContent = {
    badge: 'Examples',
    title: 'Exemples de pages a lancer depuis ce starter',
    description:
        "Quelques cas d usage concrets pour transformer la librairie et les patterns deja presents en vraies pages produit.",
    items: [
        {
            title: 'Dashboard produit',
            description: 'Overview metier avec KPI, tendances, resume de configuration et actions rapides.',
            composition: ['PageHeader', 'MetricGrid', 'StatCard', 'DataList'],
        },
        {
            title: 'Settings workspace',
            description: 'Page de configuration avec navigation secondaire, formulaires structures et feedback inline.',
            composition: ['SidebarLayout', 'FormSection', 'InlineAlert', 'Button'],
        },
        {
            title: 'Liste admin',
            description: 'Table, filtres actifs, pagination et actions contextuelles pour gerer une collection.',
            composition: ['Toolbar', 'FilterBar', 'Table', 'Pagination', 'DropdownMenu'],
        },
    ],
}

export const homeEntryPointsContent = {
    badge: 'Choisir sa page',
    title: 'Ou aller selon le besoin du moment',
    description:
        "Quand on decouvre le starter, le plus utile est souvent de savoir quelle page ouvre le bon niveau de detail ou de preuve.",
    items: [
        {
            title: 'Verifier la qualite UI',
            description: 'Commence par le showcase pour scanner rapidement les composants et leurs etats.',
            destination: '/showcase',
            actionLabel: 'Explorer le showcase',
        },
        {
            title: 'Comprendre les conventions',
            description: 'Passe par la doc UI pour comprendre les patterns, guidelines et recettes de composition.',
            destination: '/docs',
            actionLabel: 'Lire la documentation',
        },
        {
            title: 'Voir un cas d usage concret',
            description: 'Ouvre le dashboard ou l admin pour voir la base en situation sur des pages plus produit.',
            destination: '/dashboard',
            actionLabel: 'Voir le dashboard',
        },
        {
            title: 'Tester les patterns async',
            description: 'Le playground montre comment brancher les hooks, les etats et la composition de feature.',
            destination: '/playground',
            actionLabel: 'Lancer le playground',
        },
    ],
}

export const homeChecklistContent = {
    badge: 'Checklist',
    title: 'Checklist de lancement rapide',
    description:
        "Une vue simple de ce qui est deja solide dans la base et de ce qu il reste typiquement a brancher pour un vrai projet.",
    items: [
        {
            title: 'Architecture et navigation',
            status: 'Ready',
            description: 'Routes, layouts, providers et navigation principale sont deja poses.',
        },
        {
            title: 'UI, theming et responsive',
            status: 'Ready',
            description: 'Tokens, composants et patterns de page couvrent deja un socle produit credible.',
        },
        {
            title: 'Qualite et accessibilite',
            status: 'Ready',
            description: 'Lint, tests, build et audit Lighthouse servent deja de garde-fous.',
        },
        {
            title: 'Metier et integrations',
            status: 'A brancher',
            description: 'Il reste a connecter tes services, auth, donnees et contraintes produit reelles.',
        },
    ],
}

export const homeMetricsContent = {
    badge: 'Proof',
    title: 'Starter pret pour du vrai travail produit',
    description:
        "Le socle embarque deja des garanties concretes cote UI, qualite et experience de developpement.",
    items: [
        {
            label: 'Composants UI',
            value: '40+',
            trend: 'Large',
            description: 'Primitives, feedback, navigation, layouts et patterns',
        },
        {
            label: 'Tests',
            value: '37',
            trend: 'Green',
            trendTone: 'positive',
            description: 'Couverture de base sur les composants critiques',
        },
        {
            label: 'Lighthouse',
            value: '100',
            trend: 'SEO / A11y',
            trendTone: 'positive',
            description: 'Audit desktop repasse au vert sur les categories majeures',
        },
        {
            label: 'Themes',
            value: '3',
            trend: 'Ready',
            description: 'Light, dark et system avec tokens semantiques',
        },
    ],
}

export const homeReleaseNotesContent = {
    badge: 'Release notes',
    title: 'Ce que le starter sait deja faire aujourd hui',
    description:
        "Une vue courte et concrete des fondations deja livrees pour aider a evaluer si la base est assez mature pour ton prochain projet.",
    items: [
        {
            version: 'v0.1',
            title: 'Shell, theming et navigation',
            summary:
                'Theme clair, sombre et systeme, navigation rangee, header plus lisible et experience mobile via drawer.',
        },
        {
            version: 'v0.2',
            title: 'Etats async et feedback',
            summary:
                'Skeletons, erreurs asynchrones centralisees et toasts plus robustes sur les pages principales.',
        },
        {
            version: 'v0.3',
            title: 'SEO et structure de contenu',
            summary:
                'Metadonnees par page, sitemap genere au build, manifest, FAQ home et parcours de lecture mieux structures.',
        },
    ],
}

export const homeQuickLinksContent = {
    badge: 'Explore',
    title: 'Acces rapides vers les zones utiles du starter',
    description:
        "La home devient un vrai point d entree pour explorer la base, verifier les composants et consulter les conventions d usage.",
    items: [
        {
            title: 'Showcase',
            description: 'Parcourir tous les composants individuellement et valider leur rendu.',
            to: '/showcase',
            actionLabel: 'Ouvrir le catalogue',
        },
        {
            title: 'Docs UI',
            description: 'Retrouver les familles, guidelines et recettes d assemblage de la librairie.',
            to: '/docs',
            actionLabel: 'Lire la doc',
        },
        {
            title: 'Playground',
            description: 'Tester les patterns async, les hooks et les comportements de base de l app.',
            to: '/playground',
            actionLabel: 'Lancer le playground',
        },
        {
            title: 'Dashboard',
            description: 'Voir une page de pilotage deja composee avec KPI, alertes et table.',
            to: '/dashboard',
            actionLabel: 'Ouvrir le dashboard',
        },
        {
            title: 'Admin',
            description: 'Parcourir une page admin avec filtres, table et etats de chargement.',
            to: '/admin',
            actionLabel: 'Ouvrir l admin',
        },
    ],
}

export const homeFaqContent = {
    badge: 'FAQ',
    title: 'Questions frequentes avant de repartir de ce starter',
    description:
        "Les points les plus utiles a verifier avant de reutiliser la base pour un vrai produit ou une nouvelle mission frontend.",
    items: [
        {
            value: 'faq-architecture',
            question: 'A qui sert ce starter ?',
            answer:
                'A une equipe ou un freelance qui veut demarrer vite sans sacrifier la structure du projet, la qualite UI et la maintenabilite.',
        },
        {
            value: 'faq-production',
            question: 'Est-ce une simple demo UI ou une vraie base de projet ?',
            answer:
                'La base va plus loin qu une demo visuelle: routing, theming, architecture feature-first, composants reutilisables, tests et etats async sont deja poses.',
        },
        {
            value: 'faq-customization',
            question: 'Que reste-t-il a brancher avant une mise en production ?',
            answer:
                'La partie metier: vraies APIs, authentification reelle, analytics, contenu editorial final, URL de production et contraintes specifiques au produit.',
        },
        {
            value: 'faq-seo',
            question: 'Le SEO est-il deja traite ?',
            answer:
                'Oui, la base gere maintenant les metadonnees par page, le canonical, Open Graph, Twitter, robots et un sitemap genere au build.',
        },
    ],
}

export const homeWorkflowContent = {
    badge: 'Workflow',
    title: 'Workflow senior dev, simple a reprendre',
    description:
        "Le starter est pense pour avancer vite sans perdre la lisibilite du projet quand il commence a grossir.",
    steps: [
        {
            title: '1. Poser la structure',
            description: 'Brancher la route, la feature et la page sans reintroduire de logique globale inutile.',
        },
        {
            title: '2. Composer les patterns',
            description: 'Assembler les primitives et layouts deja presents avant de construire un composant specifique.',
        },
        {
            title: '3. Solidifier',
            description: 'Ajouter les tests utiles, verifier l accessibilite et garder le design system coherent.',
        },
    ],
}

export const homeFooterContent = {
    badge: 'Starter guide',
    title: 'Continuer depuis une base claire',
    description:
        "Utilise la home comme hub pour naviguer entre composants, documentation, playground et conventions de travail.",
    columns: [
        {
            title: 'Explorer',
            links: [
                { label: 'Catalogue composants', to: '/showcase' },
                { label: 'Documentation UI', to: '/docs' },
                { label: 'Playground', to: '/playground' },
            ],
        },
        {
            title: 'Sections home',
            links: [
                { label: 'Tokens', href: '#tokens' },
                { label: 'Proof', href: '#proof' },
                { label: 'Patterns', href: '#patterns' },
            ],
        },
        {
            title: 'Conventions',
            items: [
                'Feature-first',
                'Tokens semantiques',
                'Tests verts',
                'A11y par defaut',
            ],
        },
    ],
}

export const homeCtaContent = {
    title: 'Base prete pour tes prochains projets',
    description:
        "Etape suivante: renforcer l'architecture projet, clarifier les responsabilites des composants et preparer un vrai socle feature-first.",
    inputLabel: 'Ton email',
    inputPlaceholder: 'you@studio.dev',
    inputHint: 'Utilise cette section comme base pour tes formulaires produit.',
    actionLabel: 'Continuer',
}

export const homeRoadmapContent = {
    badge: 'Roadmap',
    title: 'Prochains paliers du starter',
    description:
        "La base couvre deja un socle UI solide. Cette section sert maintenant a afficher les prochaines iterations les plus rentables.",
    remainingItems: [
        'Brancher un vrai socle metier: auth, api client, gestion des erreurs et etats reseau',
        'Ajouter des tests cibles sur les flows produit critiques et pas seulement les primitives',
        'Introduire quelques patterns data plus riches: table headless evoluee, empty/error/loading states avances',
        'Poser une strategie de formulaires plus complete avec validation et schemas',
        'Ajouter une page exemple type admin ou dashboard complet pour montrer le starter en situation',
        'Finaliser les conventions de docs et de contribution pour en faire une vraie base d equipe',
    ],
    homeIdeas: [
        'Ajouter une vraie page demo "Admin" ou "Dashboard" dans le routeur',
        'Documenter une stack recommandee pour auth, data fetching et validation',
        'Ajouter un mode docs plus detaille avec snippets d usage par composant',
        'Introduire une page de changelog ou releases du starter',
        'Ajouter une passe motion / reduced-motion plus visible sur les transitions clefs',
        'Creuser les cas de personnalisation du theme pour plusieurs univers produit',
    ],
}

export const homeModalContent = {
    title: 'Exemple modal',
    body: "Cette modal sert d'exemple de composant reutilisable avec une API plus solide, un rendu portal et un habillage coherent avec le design system.",
}
