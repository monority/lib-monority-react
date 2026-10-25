import type { guides as enGuides } from '../en/guides'

export const guides = {
    introduction: {
        hero: {
            kicker: 'Monority UI',
            title: 'Introduction',
            description:
                'Une bibliothèque de composants React moderne et accessible pour construire des interfaces produit sobres et cohérentes, à partir de primitives, de mises en page, de surfaces de retour et d’overlays prêts pour la production.',
        },
        features: {
            title: 'Ce que propose la bibliothèque',
            description:
                'Des fondations stables, accessibles et cohérentes pour toutes vos applications.',
            items: [
                {
                    variant: 'primary',
                    title: 'Interface guidée par le système',
                    description:
                        'Des tokens, des recettes et des composants partagés qui alignent visuellement les coques, les formulaires et les surfaces de contenu.',
                },
                {
                    variant: 'success',
                    title: 'Architecture composable',
                    description:
                        'Utilisez le point d’entrée principal pour aller vite ou les sous-chemins pour un contrôle plus fin du bundle.',
                },
                {
                    variant: 'warning',
                    title: 'Accessibilité par défaut',
                    description:
                        'La gestion du clavier, les motifs ARIA et le focus sont intégrés à la couche des composants.',
                },
                {
                    variant: 'primary',
                    title: 'Styles prêts pour les thèmes',
                    description:
                        'Le thème piloté par variables CSS permet à la documentation et aux produits de partager le même langage visuel.',
                },
                {
                    variant: 'danger',
                    title: 'Couverture étendue',
                    description:
                        'Des petits utilitaires typographiques aux mises en page riches en données et aux overlays, la bibliothèque couvre le travail produit quotidien.',
                },
                {
                    variant: 'default',
                    title: 'Typé de bout en bout',
                    description:
                        'Un support TypeScript fort garde les API de composants prévisibles à mesure que le design system grandit.',
                },
            ] satisfies {
                variant: 'default' | 'primary' | 'success' | 'warning' | 'danger'
                title: string
                description: string
            }[],
        },
        quickstart: {
            title: 'Démarrage rapide',
            description:
                'Installez le paquet et importez vos premiers composants en quelques secondes.',
            cta: 'Consulter le guide complet d’installation',
        },
        categories: {
            title: 'Catégories de composants',
            description: 'Panorama des familles d’éléments disponibles dans la bibliothèque.',
            items: [
                {
                    label: 'Actions',
                    items: 'Button, ButtonLink, IconButton, CopyButton, Toggle, ToggleGroup',
                },
                {
                    label: 'Formulaires',
                    items: 'Input, InputOTP, Select, Textarea, Checkbox, RadioGroup, Switch, Slider, Rating, DatePicker',
                },
                {
                    label: 'Navigation',
                    items: 'Tabs, SegmentedControl, Stepper, Breadcrumb, Pagination, Toolbar, Topbar, SidebarLayout',
                },
                {
                    label: 'Overlays',
                    items: 'Modal, AlertDialog, Sheet, Drawer, Tooltip, Popover, DropdownMenu',
                },
                {
                    label: 'Données et affichage',
                    items: 'DataTable, DataList, Table, Card, MetricGrid, StatCard, Timeline',
                },
                {
                    label: 'Feedback',
                    items: 'Badge, BadgeDelta, Callout, InlineAlert, Banner, Progress, Spinner, Toast',
                },
                {
                    label: 'Disposition',
                    items: 'Container, Grid, Stack, Section, Divider, Separator, ScrollArea',
                },
            ],
        },
    },
    installation: {
        hero: {
            kicker: 'Premiers pas',
            title: 'Installation',
            description:
                'Installez Monority UI dans votre projet, chargez les styles partagés et composez des écrans prêts pour la production avec le système de composants.',
        },
        steps: {
            title: 'Guide pas à pas',
            description: 'Intégrez la bibliothèque dans votre projet en trois étapes simples.',
            install: {
                title: '1. Installer le paquet',
                description: 'Choisissez votre gestionnaire de paquets préféré.',
            },
            css: {
                title: '2. Importer la fondation CSS',
                description:
                    'Chargez la feuille de styles principale au point d’entrée de votre application.',
            },
            compose: {
                title: '3. Composer vos interfaces',
                description:
                    'Importez directement depuis le point d’entrée principal ou via des sous-chemins optimisés.',
            },
        },
        prerequisites: {
            title: 'Prérequis',
            description: 'Configuration d’exécution recommandée.',
            items: [
                'React 19 ou version ultérieure',
                'React DOM 19 ou version ultérieure',
                'TypeScript 5.7+ pour une prise en charge complète des types',
            ],
        },
        nextSteps: {
            title: 'Prochaines étapes',
            description: 'Explorez l’écosystème et commencez à concevoir.',
            docsLabel: 'documentation des composants',
            moodboardLabel: 'Design Studio',
            browsePrefix: 'Consultez la',
            testPrefix: 'Testez vos combinaisons de tokens dans le',
        },
    },
} satisfies typeof enGuides
