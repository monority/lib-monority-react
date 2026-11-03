import type { home as enHome } from '../en/home'

export const home = {
    seo: {
        title: 'Accueil',
        description:
            'Monority UI — La bibliothèque de composants React 19 accessible conçue pour la production à haute densité. Portée par CSS @layer, la thématisation OKLCH au runtime et zéro overhead CSS.',
    },
    hero: {
        ariaLabel: 'Hero Monority UI',
        kicker: 'v1.0 • Design System React 19',
        title: 'La bibliothèque de composants conçue pour la production à haute densité.',
        description:
            '83 primitives accessibles, isolation native par couches CSS @layer et thématisation OKLCH au runtime. Conçue pour les tableaux de bord complexes et les logiciels exigeants.',
        docsCta: 'Explorer les composants',
        githubCta: 'GitHub',
        installCommand: 'npm i @monority/ui',
        copied: 'Copié dans le presse-papier !',
        monolithAriaLabel:
            'Logo Monority 3D interactif réagissant en direct aux tokens OKLCH du thème et au pointeur',
        matrixAriaLabel:
            'Vitrine interactive de composants Monority UI illustrant la thématisation locale ThemeScope, les paliers de densité et les primitives React 19 accessibles',
    },
    matrix: {
        scopeLabel: 'ThemeScope',
        themeGroupAria: 'Prévisualiser le thème local',
        densityGroupAria: 'Prévisualiser la densité',
        themes: {
            dark: 'Sombre',
            slate: 'Ardoise',
            ocean: 'Océan',
            night: 'Nuit',
            light: 'Clair',
        },
        densities: {
            compact: 'Compact',
            comfortable: 'Défaut',
            spacious: 'Aéré',
        },
        telemetry: {
            title: 'Performance du cluster',
            subtitle: 'Routage edge sur 3 régions actives',
            status: 'Opérationnel · 99,99 %',
            throughputLabel: 'Débit',
            latencyLabel: 'Latence P99',
            filterPlaceholder: 'Filtrer les régions (fra, iad, hnd)...',
            filterAria: 'Filtrer les régions edge',
            clearFilter: 'Effacer le filtre de région',
            loadAria: (regionCode: string) => `Charge de capacité ${regionCode}`,
            emptyRegions: 'Aucune région edge correspondante.',
            regions: [
                {
                    id: 'fra-01',
                    code: 'fra-01',
                    city: 'Francfort',
                    zone: 'eu-central',
                    baseLoad: 64,
                    baseLatency: 11.4,
                    baseRps: 48.2,
                },
                {
                    id: 'iad-02',
                    code: 'iad-02',
                    city: 'Virginie',
                    zone: 'us-east',
                    baseLoad: 52,
                    baseLatency: 14.8,
                    baseRps: 61.5,
                },
                {
                    id: 'hnd-01',
                    code: 'hnd-01',
                    city: 'Tokyo',
                    zone: 'ap-northeast',
                    baseLoad: 38,
                    baseLatency: 19.2,
                    baseRps: 34.6,
                },
            ],
        },
        policy: {
            title: 'Politique de routage',
            subtitle: 'Primitives réelles sous @layer mr.components',
            badge: 'v2.4',
            strategyLabel: 'Stratégie de trafic',
            strategies: {
                balanced: 'Équilibré',
                latency: 'Latence min',
                failover: 'Secours',
            },
            concurrencyLabel: 'Limite de concurrence',
            cacheLabel: 'Cache edge intelligent',
            cacheHint: 'Réponses stale-while-revalidate servies au point de présence.',
            isolationLabel: 'Isolation @layer stricte',
            isolationHint: 'Surcharges hôtes déterministes sans aucun !important.',
            statusReady: 'Prêt · 0 !important',
            statusSynced: 'Politique synchronisée · 0ms',
            reset: 'Réinitialiser',
            apply: 'Appliquer',
            applied: 'Appliqué',
        },
        figcaption:
            'Surface interactive Monority UI composée des vraies primitives Card, StatCard, SegmentedControl, Slider, Switch, Input, Progress, Badge et Button au sein d’un ThemeScope isolé.',
    },
    frameworks: {
        label: 'Écosystème et Stack supportée',
        items: [
            { name: 'React 19', note: 'Prop ref native' },
            { name: 'TypeScript 5', note: 'Typage strict' },
            { name: 'Vite 6', note: 'HMR instantané' },
            { name: 'Next.js 15', note: 'App Router' },
            { name: 'CSS @layer', note: 'Zéro conflit de spécificité' },
            { name: 'Thématisation OKLCH', note: 'Uniformité perceptuelle' },
        ],
    },
    pillars: {
        title: 'Fondations Architecturales',
        description:
            'Conçu dès le départ pour les logiciels d’entreprise à haute densité. Zéro surcoût CSS au runtime, absence totale de friction de spécificité et conformité d’accessibilité intégrale.',
        layerCard: {
            title: 'Isolation CSS @layer Native',
            badge: 'Zéro Conflit de Spécificité',
            description:
                'Les 84 primitives sont isolées au sein des cascades standard @layer mr.*. Les feuilles de styles de votre application hôte priment naturellement sans !important ni contournements.',
            layers: [
                'Styles Applicatifs Consommateur',
                'mr.utilities',
                'mr.components',
                'mr.themes',
                'mr.tokens',
                'mr.base',
                'mr.reset',
            ],
        },
        themingCard: {
            title: 'Moteur de Thématisation OKLCH',
            badge: '0ms Recalcul du DOM',
            description:
                'Basculez instantanément entre 7 thèmes ou personnalisez les teintes d’accentuation. Pilotage 100% via variables CSS dans l’espace OKLCH sans re-rendu du DOM virtuel React.',
            accentLabel: 'Nuancier d’accentuation en direct :',
        },
        primitivesCard: {
            title: '84 Primitives Accessibles',
            badge: 'Production Ready',
            description:
                'Calibré pour les logiciels critiques, les consoles de télémétrie et les flux denses. 100% typé sous TypeScript, support de ref natif React 19 et conformité WCAG 2.1 AA.',
            primitives: [
                'Button',
                'Select',
                'Switch',
                'Dialog',
                'CommandPalette',
                'DataTable',
                'Tabs',
                'DropdownMenu',
                'Tooltip',
                'Badge',
            ],
        },
    },
    features: {
        title: 'Excellence architecturale',
        description:
            'Conçue comme une infrastructure fiable pour les logiciels professionnels les plus exigeants. Aucun compromis entre expérience développeur, fidélité visuelle et performance.',
        items: [
            {
                title: 'Architecture CSS @layer',
                badge: 'Zéro conflit de spécificité',
                badgeVariant: 'primary',
                description:
                    'Tous les styles sont ordonnés dans les couches @layer mr.* standard. Les styles applicatifs hôtes gagnent naturellement sans !important ni sur-spécificité.',
            },
            {
                title: 'Espace couleur OKLCH & Thèmes',
                badge: '7 thèmes natifs',
                badgeVariant: 'default',
                description:
                    'Basculez entre Clair, Sombre, OLED, Océan, Ardoise, Nuit et Contraste Élevé en 0ms sans déclencher de re-rendu du DOM virtuel React.',
            },
            {
                title: '83 primitives de production',
                badge: 'Conforme WCAG 2.1 AA',
                badgeVariant: 'success',
                description:
                    'Des boutons élémentaires aux tables de données virtualisées, palettes de commandes et tiroirs animés, chaque composant dispose d’une parité de typage à 100%.',
            },
            {
                title: 'React 19 Natif',
                badge: 'Prop ref directe',
                badgeVariant: 'primary',
                description:
                    'Spécifiquement conçu pour React 19 avec passage direct des refs (zéro wrapper forwardRef déprécié), compatibilité Server Components et frontières "use client" soignées.',
            },
            {
                title: 'Ergonomie haute densité',
                badge: 'Compact & Normal',
                badgeVariant: 'default',
                description:
                    'Calibré pour les consoles de télémétrie, les tableaux de données et les outils métier où l’espace à l’écran et la hiérarchie visuelle sont cruciaux.',
            },
            {
                title: 'Zéro surcharge CSS au runtime',
                badge: 'CSS statique pur',
                badgeVariant: 'success',
                description:
                    'Aucun injecteur dynamique runtime comme Emotion ou styled-components. Les feuilles CSS sont pré-compilées et tree-shakeables pour une hydratation instantanée.',
            },
        ],
    },
    codeExperience: {
        title: 'Expérience Développeur',
        description: 'Composition limpide, typage strict et zéro code superflu.',
        tabComponent: 'Dashboard.tsx',
        tabTheme: 'theme.config.ts',
        tabHtml: 'index.html',
    },
} satisfies typeof enHome
