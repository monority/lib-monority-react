import type { guides as enGuides } from '../en/guides'

export const guides = {
    introduction: {
        hero: {
            kicker: 'Monority UI',
            title: 'Introduction',
            description:
                'Une infrastructure de composants React 19 pilotée par des couches CSS natives (@layer) et des design tokens OKLCH. Construisez des interfaces sobres, accessibles et thématiques au runtime sans dette de spécificité.',
            installCta: 'Guide d’installation',
            exploreCta: 'Parcourir les composants',
        },
        telemetry: {
            ariaLabel: 'Spécifications du design system',
            componentsLabel: 'Composants',
            componentsDetail: '11 familles documentées',
            themesValue: '7',
            themesLabel: 'Thèmes OKLCH',
            themesDetail: 'Runtime + high-contrast',
            layersValue: '6',
            layersLabel: 'Couches @layer',
            layersDetail: 'mr.reset à mr.utilities',
            reactValue: '19',
            reactLabel: 'React & TS strict',
            reactDetail: 'Prop ref native · WAI-ARIA',
        },
        architecture: {
            kicker: 'Contrats d’ingénierie',
            title: 'Architecture fondamentale',
            description:
                'Chaque primitive repose sur quatre contrats non négociables conçus pour passer à l’échelle sur des produits complexes sans jamais lutter contre la cascade CSS.',
            pillars: [
                {
                    icon: 'layers',
                    tag: '@layer mr.*',
                    title: 'Cascade CSS @layer déterministe',
                    description:
                        'Toutes les règles de la bibliothèque résident dans six couches ordonnées (de mr.reset à mr.utilities). Le CSS hors couche de votre application gagne toujours sans aucun !important.',
                },
                {
                    icon: 'tokens',
                    tag: 'oklch() · ThemeScope',
                    title: 'Moteur de tokens OKLCH à trois niveaux',
                    description:
                        'Les primitives de marque alimentent les surfaces, bordures et textes à contraste vérifié à travers 7 thèmes, 3 densités et des sous-arbres isolés via ThemeScope.',
                },
                {
                    icon: 'accessibility',
                    tag: 'WAI-ARIA · React 19',
                    title: 'Sémantique native et contrats clavier',
                    description:
                        'Priorité au HTML sémantique (<button>, <dialog>, popover), gestion délibérée du focus, respect de prefers-reduced-motion et prop ref React 19 directe.',
                },
                {
                    icon: 'modular',
                    tag: 'exports["./*"]',
                    title: 'API composable et tree-shaking par sous-chemins',
                    description:
                        'Composez depuis l’entrée principale @monority/ui pour aller vite, ou importez chaque primitive via @monority/ui/<slug> pour un contrôle chirurgical du bundle.',
                },
            ],
        },
        quickstart: {
            kicker: 'Système vivant',
            title: 'Prise en main et isolation de thème',
            description:
                'Installez l’unique paquet @monority/ui, chargez la fondation CSS une seule fois et composez des surfaces réactives aux tokens sans runtime CSS-in-JS.',
            previewLabel: 'Surface ThemeScope interactive',
            themeControlLabel: 'Thème de l’aperçu',
            densityControlLabel: 'Densité de l’aperçu',
            densities: {
                comfortable: 'Confortable',
                compact: 'Compacte',
            },
            themes: {
                dark: 'Dark',
                light: 'Light',
                ocean: 'Ocean',
                highContrast: 'Contraste élevé',
            },
            sampleCard: {
                kicker: 'POLITIQUE D’ESPACE',
                badge: 'Actif',
                title: 'Isolation locale des tokens',
                description:
                    'Enveloppez n’importe quel sous-arbre dans ThemeScope pour surcharger l’atmosphère ou la densité des contrôles sans affecter le reste de la page.',
                switchLabel: 'Appliquer les tokens à contraste vérifié',
                switchHint: 'Garantit les seuils WCAG AA sur les textes et bordures de contrôle.',
                primaryAction: 'Appliquer',
                secondaryAction: 'Inspecter',
            },
        },
        categories: {
            kicker: 'Catalogue',
            title: 'Répertoire des composants',
            description:
                'Accès direct à l’ensemble des primitives documentées de la bibliothèque, synchronisé dynamiquement avec le registre des composants.',
            countUnit: (count: number) => (count === 1 ? '1 composant' : `${count} composants`),
        },
        pager: {
            nextDescription:
                'Installer @monority/ui, charger les couches CSS et configurer ThemeProvider et le script SSR.',
        },
    },
    installation: {
        hero: {
            kicker: 'Premiers pas',
            title: 'Installation',
            description:
                'Intégrez @monority/ui dans une application React 19, chargez la fondation CSS en couches @layer, configurez les providers racine et supprimez tout flash de thème au premier rendu.',
        },
        telemetry: {
            ariaLabel: 'Prérequis techniques',
            reactValue: '19+',
            reactLabel: 'Peer dependencies',
            reactDetail: 'react ^19.0.0 · react-dom ^19.0.0',
            tsValue: '5.7+',
            tsLabel: 'TypeScript',
            tsDetail: 'moduleResolution: "bundler"',
            cssValue: '@layer',
            cssLabel: 'Fondation CSS',
            cssDetail: 'Cascade Layers & OKLCH natifs',
            bundleValue: 'ESM',
            bundleLabel: 'Distribution',
            bundleDetail: 'sideEffects: ["*.css"]',
        },
        install: {
            kicker: 'Étape 01',
            title: 'Installer le paquet',
            description:
                '@monority/ui est l’unique paquet publié sur npm. Il embarque les primitives React 19, les déclarations TypeScript strictes, les icônes et les feuilles CSS compilées.',
        },
        styles: {
            kicker: 'Étape 02',
            title: 'Charger la fondation CSS et l’ordre @layer',
            description:
                'Importez la feuille de styles une seule fois au point d’entrée racine. Chaque règle est encapsulée dans les couches mr.* afin que votre CSS applicatif conserve toujours la priorité.',
            entrypointsLabel: 'ENTRÉES CSS PUBLIQUES',
            entrypoints: [
                {
                    path: '@monority/ui/styles.css',
                    badge: 'Recommandé',
                    description:
                        'Fondation complète : ordre des couches, reset, typographie de base, tokens OKLCH, les 7 thèmes, recettes de composants et utilitaires.',
                },
                {
                    path: '@monority/ui/index.css',
                    badge: 'Alias',
                    description:
                        'Alias exact de @monority/ui/styles.css lorsque vos conventions d’import privilégient index.css.',
                },
                {
                    path: '@monority/ui/reset.css',
                    badge: 'Modulaire',
                    description:
                        'Feuille @layer mr.reset autonome pour les intégrations hôtes avancées.',
                },
                {
                    path: '@monority/ui/utilities.css',
                    badge: 'Modulaire',
                    description: 'Classes utilitaires @layer mr.utilities autonomes.',
                },
            ],
            layerNoteTitle: 'Cohabitation avec vos propres @layer ou Tailwind CSS v4',
            layerNoteDescription:
                'Si votre application déclare ses propres blocs @layer, annoncez la séquence mr.* en premier afin que vos couches applicatives soient évaluées après celles de la bibliothèque, sans !important.',
        },
        providers: {
            kicker: 'Étape 03',
            title: 'Configurer ThemeProvider et ToastProvider',
            description:
                'Enveloppez la racine de l’application avec ThemeProvider (synchronisation de data-theme, color-scheme et hook useTheme) et ToastProvider (portail d’annonces accessibles pour Toast).',
            contracts: [
                {
                    tag: 'ThemeProvider',
                    description:
                        'Lit le thème actif via useSyncExternalStore sans bloquer le rendu, persiste le choix utilisateur et expose { theme, resolvedTheme, setTheme } via useTheme().',
                },
                {
                    tag: 'HTML statique',
                    description:
                        'Si votre produit utilise une atmosphère fixe sans bascule dynamique, posez simplement data-theme="dark" et data-density="comfortable" sur <html>.',
                },
                {
                    tag: 'ThemeScope',
                    description:
                        'Utilisez <ThemeScope theme="ocean" density="compact"> sur n’importe quel sous-arbre pour isoler localement un thème, une marque ou une densité.',
                },
            ],
        },
        ssr: {
            kicker: 'Étape 04',
            title: 'Éviter le flash de thème au premier rendu (SSR et SPA)',
            description:
                'Injectez getThemeScript() depuis @monority/ui/get-theme-script dans <head> afin que le navigateur résolve localStorage, prefers-contrast et prefers-color-scheme avant de peindre la première frame.',
        },
        imports: {
            kicker: 'Étape 05',
            title: 'Importer les composants, tree-shaker et configurer TypeScript',
            description:
                'Importez depuis l’entrée principale @monority/ui pour composer rapidement ou via les sous-chemins dédiés @monority/ui/<slug> pour isoler finement votre bundle.',
            calloutTitle: 'Conservez l’import unique de styles.css à la racine',
            calloutDescription:
                'Les modules JavaScript des composants n’injectent aucun CSS global par effet de bord. Que vous importiez depuis @monority/ui ou @monority/ui/button, gardez @monority/ui/styles.css chargé une fois au point d’entrée.',
            tsconfigLabel: 'TSCONFIG.JSON RECOMMANDÉ',
        },
        frameworks: {
            kicker: 'Étape 06',
            title: 'Modèles rapides par framework',
            description:
                'Points d’entrée complets prêts à copier combinant fondation CSS, script de tête anti-flash et providers clients.',
            tabsAriaLabel: 'Modèles de frameworks',
            viteTab: 'Vite + React',
            nextTab: 'Next.js App Router',
            viteDescription:
                'Placez le script synchrone de thème dans index.html et montez AppProviders dans src/main.tsx.',
            nextDescription:
                'Isolez ThemeProvider et ToastProvider derrière une frontière "use client" tout en conservant app/layout.tsx en Server Component avec suppressHydrationWarning.',
        },
        pager: {
            prevDescription:
                'Revoir l’architecture fondamentale, l’aperçu ThemeScope interactif et le répertoire complet.',
            nextDescription:
                'Découvrir la première primitive d’action interactive, ses variantes, ses props et son contrat clavier.',
        },
    },
} satisfies typeof enGuides
