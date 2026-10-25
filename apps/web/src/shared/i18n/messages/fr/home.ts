import type { home as enHome } from '../en/home'

export const home = {
    seo: {
        title: 'Accueil',
        description:
            'Monority UI — un système de composants React 19 bâti autour de tokens sobres, de primitives accessibles et d’une architecture CSS @layer.',
    },
    hero: {
        ariaLabel: 'Introduction de Monority UI',
        kicker: 'Bibliothèque de composants React 19',
        title: 'Monority UI',
        description:
            'Un système de composants de précision pour les produits web modernes. Porté par une architecture CSS @layer, des tokens de conception au runtime, des contrats stricts et des primitives accessibles.',
        docsCta: (componentCount: number) => `Documentation (${componentCount} composants)`,
        studio: 'Design Studio',
        installation: 'Installation',
    },
    features: {
        title: 'Fondation architecturale',
        description:
            'Conçue pour servir d’infrastructure fiable aux design systems modernes et aux applications web de production.',
        items: [
            {
                title: (componentCount: number) => `${componentCount} primitives stables`,
                badge: 'Prêt pour la production',
                badgeVariant: 'success',
                description:
                    'Chaque concept d’interface significatif est componentisé. Des simples boutons aux tableaux de données riches, overlays et contrôles de formulaire, avec une parité totale.',
            },
            {
                title: 'Architecture CSS @layer',
                badge: 'Zéro collision',
                badgeVariant: 'primary',
                description:
                    'Des couches écrites à la main (reset, base, tokens, thèmes, composants, utilitaires). Des surcharges propres côté consommateur, sans astuces de spécificité ni !important.',
            },
            {
                title: 'Tokens de conception au runtime',
                badge: 'Multi-thème',
                badgeVariant: 'default',
                description:
                    'Thèmes dynamiques (clair, sombre, nuit, oled), accents personnalisables, rayons et densités commutables au runtime sans recompilation CSS.',
            },
            {
                title: 'Contrat d’accessibilité',
                badge: 'WCAG 2.2 AA',
                badgeVariant: 'primary',
                description:
                    'Navigation clavier, rôles ARIA corrects, gestion du focus, anneaux de focus visibles et comportement des lecteurs d’écran traités comme des contrats fermes.',
            },
        ] satisfies {
            title: string | ((componentCount: number) => string)
            badge: string
            badgeVariant: 'default' | 'primary' | 'success'
            description: string
        }[],
    },
    liveTokens: {
        title: 'Tokens de conception en direct',
        description:
            'Ajustez les paramètres du système en temps réel. Observez comment chaque contrôle, surface et état de retour hérite des changements de façon cohérente.',
        accentPalette: 'Palette d’accent',
        geometry: 'Géométrie (rayon des angles)',
        accentSwitcher: 'Sélecteur d’accent',
        radiusSwitcher: 'Sélecteur de rayon',
        accents: {
            neutral: 'Neutre',
            violet: 'Violet',
            emerald: 'Émeraude',
            sky: 'Ciel',
            amber: 'Ambre',
        },
        radii: {
            none: 'Net',
            sm: 'Subtil',
            md: 'Équilibré',
            lg: 'Arrondi',
        },
        previewTitle: 'Aperçu des composants en direct',
        activeTheme: 'Thème actif',
        inputLabel: 'Adresse e-mail',
        inputPlaceholder: 'jane@company.com',
        progressLabel: 'Pipeline de déploiement',
        primaryAction: 'Action principale',
        secondaryAction: 'Secondaire',
        subtleAction: 'Discret',
    },
    showcase: {
        title: 'Écosystème de composants',
        description:
            'Des tableaux de bord de télémétrie opérationnelle à haute densité aux formulaires de configuration sobres et accessibles.',
        telemetry: {
            title: 'Télémétrie en direct',
            description: 'Les primitives MetricGrid et StatCard en action',
            uptime: 'DISPONIBILITÉ (30 J)',
            latency: 'LATENCE P99',
        },
        feedback: {
            title: 'Retours et notifications',
            description: 'Callout et retours d’état',
            calloutTitle: 'Tous les systèmes sont opérationnels',
            calloutBody: (componentCount: number) =>
                `${componentCount} composants testés et validés sur la matrice de vérification.`,
            statLabel: 'BUNDLE DE PRODUCTION',
            statValue: 'Tree-shakable',
            statDescription: 'Points d’entrée modulaires et aucun effet de bord inutile.',
        },
    },
} satisfies typeof enHome
