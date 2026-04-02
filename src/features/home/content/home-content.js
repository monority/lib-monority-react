export const homeHeroContent = {
    eyebrow: 'Base React + Vite 2026',
    title: 'Starter frontend pro, propre et reutilisable.',
    description:
        'Architecture claire, design system minimal et dark mode natif pour accelerer tes prochains produits.',
    supportingCopy:
        "L'ancien hero conserve son role editorial. Le nouveau bloc vient a cote pour presenter la base technique sans casser la lecture ni le rythme de la page.",
    primaryActionLabel: 'Demarrer',
    secondaryActionLabel: 'Voir composant modal',
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
    title: 'Reste a faire et propositions home',
    description:
        "Cette section sert de todo visible directement dans le starter pour piloter les prochaines iterations produit et design system.",
    remainingItems: [
        'Construire InlineAlert pour les messages dans le flux de page',
        'Construire Banner pour les annonces globales et onboarding',
        'Enrichir EmptyState avec icones et actions secondaires',
        'Construire MetricGrid pour les dashboards et pages overview',
        'Construire FormSection pour les pages de formulaire plus serieuses',
        'Construire SidebarLayout pour settings, docs et admin',
        'Ajouter une vraie page de docs UI avec usages et variantes',
        "Renforcer l'accessibilite et les tests sur les composants critiques",
    ],
    homeIdeas: [
        'Ajouter un hero encore plus structure avec CTA principal et secondaire',
        'Creer une section Pourquoi cette base avec les points forts concrets',
        'Ajouter une section Starter pret en production',
        'Afficher une rangee de StatCard sur la home',
        'Montrer des exemples de pages a lancer depuis ce starter',
        'Ajouter une section workflow senior dev',
        'Mieux rythmer les backgrounds entre les sections',
        'Renforcer le footer avec liens utiles et conventions du starter',
    ],
}

export const homeModalContent = {
    title: 'Exemple modal',
    body: "Cette modal sert d'exemple de composant reutilisable avec une API plus solide, un rendu portal et un habillage coherent avec le design system.",
}
