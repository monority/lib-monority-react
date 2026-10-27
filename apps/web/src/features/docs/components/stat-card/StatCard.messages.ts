import type { DocI18n } from '../doc-messages'

export const statCardI18n: DocI18n = {
    fr: {
        description:
            'Carte d’indicateur clé compacte pour métriques de tableau de bord, contexte de tendance et notes complémentaires.',
        playgroundLabels: {
            label: 'Libellé (label)',
            value: 'Valeur (value)',
            trend: 'Tendance (trend)',
            trendTone: 'Ton de tendance',
            description: 'Description',
        },
        examples: [
            { title: 'Composition Compound' },
            { title: 'Tons de tendance' },
            { title: 'Avec icône' },
            { title: 'Avec pied de carte' },
            { title: 'Texte long' },
        ],
        propDescriptions: {
            label: 'Libellé descriptif de la métrique.',
            value: 'Valeur numérique ou formatée de la métrique.',
            trend: 'Texte indicateur de tendance ou variation.',
            trendTone: 'Intention visuelle et couleur associée à la tendance.',
            description: 'Description contextuelle secondaire.',
            icon: 'Icône décorative ou illustrative facultative.',
            footer: 'Contenu facultatif de pied de carte.',
        },
        a11y: [
            'Motif de présentation statistique et récapitulative.',
            'Support d’aria-label pour regrouper sémantiquement les métriques.',
            'Sens de variation et tendance énoncés sous forme textuelle en plus de l’indice chromatique.',
        ],
    },
}
