import { Timeline, type TimelineItemData } from '@monority/ui/timeline'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { TimelineCompoundExample, TimelineHorizontalExample } from './Timeline.examples'

function TimelinePlayground() {
    const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>('vertical')
    const [itemCount, setItemCount] = useState<'3' | '4'>('3')

    const allItems: TimelineItemData[] = [
        {
            date: '14h30',
            title: 'Déploiement en production',
            description: 'Version v2.4.0 active sur le cluster européen.',
            status: 'success',
        },
        {
            date: '12h10',
            title: 'Audit de sécurité automatique',
            description: '0 vulnérabilité critique détectée sur l’image docker.',
            status: 'primary',
        },
        {
            date: '09h45',
            title: 'Revue de pull request #142',
            description: 'Approbation par 2 mainteneurs seniors.',
            status: 'default',
        },
        {
            date: 'Hier',
            title: 'Création de la branche de release',
            description: 'Gel des fonctionnalités pour la phase de test.',
            status: 'default',
        },
    ]

    const items = allItems.slice(0, Number(itemCount))

    const snippet = `<Timeline
  orientation="${orientation}"
  items={[
${items.map((i) => `    { date: '${i.date}', title: '${i.title}', status: '${i.status}' }`).join(',\n')}
  ]}
/>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    label: 'Orientation',
                    value: orientation,
                    options: [
                        { value: 'vertical', label: 'Vertical' },
                        { value: 'horizontal', label: 'Horizontal' },
                    ],
                    onChange: (v) => setOrientation(v as 'vertical' | 'horizontal'),
                },
                {
                    type: 'select',
                    label: 'Nombre d’étapes',
                    value: itemCount,
                    options: [
                        { value: '3', label: '3 événements' },
                        { value: '4', label: '4 événements' },
                    ],
                    onChange: (v) => setItemCount(v as '3' | '4'),
                },
            ]}
            codeSnippet={snippet}
        >
            <div
                style={{
                    maxWidth: orientation === 'vertical' ? 440 : 680,
                    margin: '0 auto',
                    width: '100%',
                }}
            >
                <Timeline orientation={orientation} items={items} />
            </div>
        </ComponentPlayground>
    )
}

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
    preview: () => <TimelinePlayground />,
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
