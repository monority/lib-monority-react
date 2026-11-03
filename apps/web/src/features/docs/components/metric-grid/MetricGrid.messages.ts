import type { DocI18n } from '../doc-messages'

export const metricGridI18n: DocI18n = {
    fr: {
        description:
            'Disposition en grille réactive pour les indicateurs StatCard — affiche une grille d’indicateurs clés de performance.',
        playgroundLabels: {
            count: 'Nombre d’indicateurs',
            trendTone: 'Tendance KPI 1',
        },
        examples: [
            { title: 'Enfants déclaratifs (Children)' },
            { title: 'Indicateur de revenu' },
            { title: 'Indicateur de risque' },
            { title: 'Indicateur de santé' },
        ],
        propDescriptions: {
            items: 'Tableau de données des cartes d’indicateurs clés (KPI).',
        },
        a11y: [
            'Structure de synthèse statistique de tableau de bord.',
            'Support d’aria-label pour regrouper sémantiquement les métriques.',
            'Sens de variation et tendance énoncés sous forme textuelle en plus de l’indice chromatique.',
        ],
    },
}
