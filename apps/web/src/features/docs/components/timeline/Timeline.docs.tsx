import { DocPage, type DocPageData } from '../DocPage'
import {
    TimelineBasicExample,
    TimelineCompoundExample,
    TimelineHorizontalExample,
} from './Timeline.examples'

const docData: DocPageData = {
    title: 'Timeline',
    description:
        "Fil chronologique structuré pour l'historique d'activités, les journaux d'audit et le suivi séquentiel d'étapes.",
    importCode: "import { Timeline } from '@monority/ui'",
    usageCode: `<Timeline
  items={[
    { date: '14h30', title: 'Deploiement', description: 'En ligne', status: 'success' },
    { date: '11h15', title: 'Securite', status: 'primary' },
  ]}
/>`,
    preview: () => <TimelineBasicExample />,
    examples: [
        { title: 'Composition avec sous-composants', content: <TimelineCompoundExample /> },
        { title: 'Orientation horizontale', content: <TimelineHorizontalExample /> },
    ],
    props: [
        {
            name: 'items',
            type: 'TimelineItemData[]',
            defaultValue: '-',
            description: "Tableau declaratif d'etapes ou d'evenements a afficher.",
        },
        {
            name: 'orientation',
            type: "'vertical' | 'horizontal'",
            defaultValue: "'vertical'",
            description: "Direction d'affichage de la chronologie.",
        },
        {
            name: 'children',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Sous-composants personnalises en mode composition libre.',
        },
    ],
    cssHooks: [
        '.mr-timeline',
        '.mr-timeline__item',
        '.mr-timeline__point',
        '.mr-timeline__content',
        '.mr-timeline__date',
        '.mr-timeline__title',
        '.mr-timeline__description',
        '[data-orientation]',
        '[data-status]',
    ],
    tokens: [
        '--mr-border-default',
        '--mr-border-strong',
        '--mr-bg-canvas',
        '--mr-accent-solid',
        '--mr-success-solid',
        '--mr-warning-solid',
        '--mr-danger-solid',
        '--mr-radius-full',
        '--mr-space-4',
        '--mr-space-6',
    ],
    a11y: [
        'Balisage semantique utilisant une liste ordonnee (<ol>) et des elements de liste (<li>).',
        'Dates encapsulees dans la balise native <time>.',
        "Points de statut stylises avec contraste de couleur eleve et masques aux lecteurs d'ecran (aria-hidden).",
    ],
}

export function TimelineDocs() {
    return <DocPage doc={docData} />
}
