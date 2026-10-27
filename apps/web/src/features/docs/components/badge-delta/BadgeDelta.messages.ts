import type { DocI18n } from '../doc-messages'

export const badgeDeltaI18n: DocI18n = {
    fr: {
        description:
            'Indicateur compact de variation statistique et de tendance avec iconographie directionnelle et couleurs sémantiques.',
        playgroundLabels: {
            label: 'Valeur de variation',
            deltaType: 'Type de variation',
            size: 'Dimension',
            isIncreasePositive: 'Hausse favorable (vert)',
        },
        examples: [
            { title: 'Toutes les tailles (sm, md, lg)' },
            { title: 'Sens de variation inversé (ex. latence)' },
        ],
        propDescriptions: {
            deltaType: 'Type de variation à représenter.',
            size: 'Taille et densité du badge.',
            isIncreasePositive:
                'Définit si une hausse est favorable (vert) ou défavorable (rouge).',
            children: 'Libellé ou pourcentage affiché.',
        },
        a11y: [
            'Iconographie directionnelle intégrée masquée aux lecteurs d’écran (aria-hidden).',
            'Prend en charge aria-label sur le badge pour une restitution textuelle explicite.',
        ],
    },
}
