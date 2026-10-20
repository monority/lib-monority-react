import { Badge } from '@monority/ui/badge'
import { IconAlertCircle, IconCheck, IconSparkles, IconUpload } from '@monority/ui/icons'
import {
    Timeline,
    type TimelineItemData,
    type TimelineLineStyle,
    type TimelineOrientation,
    type TimelineSize,
} from '@monority/ui/timeline'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    TimelineCompoundExample,
    TimelineHorizontalExample,
    TimelineInteractiveExample,
} from './Timeline.examples'

function TimelinePlayground() {
    const [orientation, setOrientation] = useState<TimelineOrientation>('vertical')
    const [size, setSize] = useState<TimelineSize>('md')
    const [lineStyle, setLineStyle] = useState<TimelineLineStyle>('solid')
    const [markerType, setMarkerType] = useState<'dot' | 'icon'>('icon')
    const [itemCount, setItemCount] = useState<'3' | '4'>('3')

    const iconMap = {
        success: <IconCheck size={size === 'sm' ? 10 : 12} />,
        primary: <IconUpload size={size === 'sm' ? 10 : 12} />,
        warning: <IconAlertCircle size={size === 'sm' ? 10 : 12} />,
        default: <IconSparkles size={size === 'sm' ? 10 : 12} />,
    }

    const allItems: TimelineItemData[] = [
        {
            date: '14h30',
            title: 'Déploiement en production',
            description: 'Version v2.4.0 active sur le cluster européen.',
            status: 'success',
            icon: markerType === 'icon' ? iconMap.success : undefined,
            extra: (
                <Badge variant="success" size="sm">
                    Production
                </Badge>
            ),
        },
        {
            date: '12h10',
            title: 'Audit de sécurité automatique',
            description: '0 vulnérabilité critique détectée sur l’image docker.',
            status: 'primary',
            icon: markerType === 'icon' ? iconMap.primary : undefined,
            extra: (
                <Badge variant="primary" size="sm">
                    Vérifié
                </Badge>
            ),
        },
        {
            date: '09h45',
            title: 'Revue de pull request #142',
            description: 'Approbation par 2 mainteneurs seniors.',
            status: 'default',
            icon: markerType === 'icon' ? iconMap.default : undefined,
        },
        {
            date: 'Hier',
            title: 'Création de la branche de release',
            description: 'Gel des fonctionnalités pour la phase de test.',
            status: 'default',
            icon: markerType === 'icon' ? iconMap.default : undefined,
        },
    ]

    const items = allItems.slice(0, Number(itemCount))

    const snippet = `<Timeline
  orientation="${orientation}"
  size="${size}"
  lineStyle="${lineStyle}"
  items={[
${items
    .map(
        (i) =>
            `    { date: '${i.date}', title: '${i.title}', status: '${i.status}'${
                i.status === 'success'
                    ? `, extra: <Badge variant="success" size="sm">Production</Badge>`
                    : i.status === 'primary'
                      ? `, extra: <Badge variant="primary" size="sm">Vérifié</Badge>`
                      : ''
            } }`
    )
    .join(',\n')}
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
                    onChange: (v) => setOrientation(v as TimelineOrientation),
                },
                {
                    type: 'select',
                    label: 'Taille',
                    value: size,
                    options: [
                        { value: 'sm', label: 'Compact (sm)' },
                        { value: 'md', label: 'Standard (md)' },
                        { value: 'lg', label: 'Spacieux (lg)' },
                    ],
                    onChange: (v) => setSize(v as TimelineSize),
                },
                {
                    type: 'select',
                    label: 'Style de ligne',
                    value: lineStyle,
                    options: [
                        { value: 'solid', label: 'Continue (solid)' },
                        { value: 'dashed', label: 'Tirets (dashed)' },
                        { value: 'dotted', label: 'Pointillés (dotted)' },
                    ],
                    onChange: (v) => setLineStyle(v as TimelineLineStyle),
                },
                {
                    type: 'select',
                    label: 'Marqueur',
                    value: markerType,
                    options: [
                        { value: 'icon', label: 'Icônes vectorielles' },
                        { value: 'dot', label: 'Points simples' },
                    ],
                    onChange: (v) => setMarkerType(v as 'dot' | 'icon'),
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
                    maxWidth: orientation === 'vertical' ? 480 : 720,
                    margin: '0 auto',
                    width: '100%',
                }}
            >
                <Timeline
                    orientation={orientation}
                    size={size}
                    lineStyle={lineStyle}
                    items={items}
                />
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'Timeline',
    description:
        "Fil chronologique structuré pour l'historique d'activités, les pipelines de déploiement et le suivi séquentiel d'étapes avec marqueurs icônes ou points.",
    importCode: "import { Timeline } from '@monority/ui'",
    usageCode: `<Timeline
  size="md"
  lineStyle="dashed"
  items={[
    { date: '14h30', title: 'Déploiement', description: 'En ligne', status: 'success', extra: 'v2.4' },
    { date: '11h15', title: 'Sécurité', status: 'primary' },
  ]}
/>`,
    preview: () => <TimelinePlayground />,
    examples: [
        {
            title: 'Composition riche avec sous-composants et icônes',
            content: <TimelineCompoundExample />,
        },
        {
            title: 'Fil interactif avec sélection d’étapes',
            content: <TimelineInteractiveExample />,
        },
        { title: 'Orientation horizontale', content: <TimelineHorizontalExample /> },
    ],
    props: [
        {
            name: 'items',
            type: 'TimelineItemData[]',
            defaultValue: '-',
            description:
                "Tableau déclaratif d'étapes ou d'événements (id, date, title, description, status, icon, extra, lineStyle).",
        },
        {
            name: 'orientation',
            type: "'vertical' | 'horizontal'",
            defaultValue: "'vertical'",
            description: "Direction d'affichage de la chronologie.",
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description:
                'Échelle dimensionnelle des marqueurs, des typographies et des espacements.',
        },
        {
            name: 'lineStyle',
            type: "'solid' | 'dashed' | 'dotted'",
            defaultValue: "'solid'",
            description: 'Style géométrique de la ligne connectrice.',
        },
        {
            name: 'children',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Sous-composants personnalisés en mode composition libre.',
        },
    ],
    cssHooks: [
        '.mr-timeline',
        '.mr-timeline__item',
        '.mr-timeline__point',
        '.mr-timeline__content',
        '.mr-timeline__header',
        '.mr-timeline__extra',
        '.mr-timeline__date',
        '.mr-timeline__title',
        '.mr-timeline__description',
        '[data-orientation]',
        '[data-size]',
        '[data-line-style]',
        '[data-status]',
        '[data-variant]',
        '[data-has-icon]',
        '[data-interactive]',
    ],
    tokens: [
        '--mr-border-default',
        '--mr-border-strong',
        '--mr-bg-canvas',
        '--mr-bg-sunken',
        '--mr-accent-solid',
        '--mr-accent-subtle',
        '--mr-success-subtle',
        '--mr-success-text',
        '--mr-warning-subtle',
        '--mr-warning-text',
        '--mr-danger-subtle',
        '--mr-danger-text',
        '--mr-radius-full',
        '--mr-radius-md',
        '--mr-space-2',
        '--mr-space-3',
        '--mr-space-4',
        '--mr-space-6',
        '--mr-space-8',
    ],
    a11y: [
        'Balisage sémantique utilisant une liste ordonnée (<ol>) et des éléments de liste (<li>).',
        'Dates encapsulées dans la balise native <time> avec chiffres tabulaires.',
        'Marqueurs d’étape décoratifs masqués aux lecteurs d’écran (aria-hidden).',
        'Rôles interactifs et navigation clavier (Entrée / Espace) pour les éléments interactifs avec focus visible.',
    ],
}

export function TimelineDocs() {
    return <DocPage doc={docData} />
}
