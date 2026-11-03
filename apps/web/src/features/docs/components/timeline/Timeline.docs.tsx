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
import { useLocale } from '../../../../shared/i18n'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    TimelineCompoundExample,
    TimelineHorizontalExample,
    TimelineInteractiveExample,
} from './Timeline.examples'
import { timelineI18n } from './Timeline.messages'

function TimelinePlayground() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'
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

    const allItems: TimelineItemData[] = isFr
        ? [
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
        : [
              {
                  date: '2:30 PM',
                  title: 'Production deployment',
                  description: 'Version v2.4.0 active on EU cluster.',
                  status: 'success',
                  icon: markerType === 'icon' ? iconMap.success : undefined,
                  extra: (
                      <Badge variant="success" size="sm">
                          Production
                      </Badge>
                  ),
              },
              {
                  date: '12:10 PM',
                  title: 'Automated security scan',
                  description: '0 critical vulnerabilities detected on docker image.',
                  status: 'primary',
                  icon: markerType === 'icon' ? iconMap.primary : undefined,
                  extra: (
                      <Badge variant="primary" size="sm">
                          Verified
                      </Badge>
                  ),
              },
              {
                  date: '9:45 AM',
                  title: 'Pull request review #142',
                  description: 'Approved by 2 senior maintainers.',
                  status: 'default',
                  icon: markerType === 'icon' ? iconMap.default : undefined,
              },
              {
                  date: 'Yesterday',
                  title: 'Release branch created',
                  description: 'Feature freeze for testing phase.',
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
                      ? `, extra: <Badge variant="primary" size="sm">${isFr ? 'Vérifié' : 'Verified'}</Badge>`
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
                    label: isFr ? 'Orientation' : 'Orientation',
                    value: orientation,
                    options: [
                        { value: 'vertical', label: isFr ? 'Vertical' : 'Vertical' },
                        { value: 'horizontal', label: isFr ? 'Horizontal' : 'Horizontal' },
                    ],
                    onChange: (v) => setOrientation(v as TimelineOrientation),
                },
                {
                    type: 'select',
                    label: isFr ? 'Taille' : 'Size',
                    value: size,
                    options: [
                        { value: 'sm', label: isFr ? 'Compact (sm)' : 'Compact (sm)' },
                        { value: 'md', label: isFr ? 'Standard (md)' : 'Standard (md)' },
                        { value: 'lg', label: isFr ? 'Spacieux (lg)' : 'Spacious (lg)' },
                    ],
                    onChange: (v) => setSize(v as TimelineSize),
                },
                {
                    type: 'select',
                    label: isFr ? 'Style de ligne' : 'Line style',
                    value: lineStyle,
                    options: [
                        { value: 'solid', label: isFr ? 'Continue (solid)' : 'Solid' },
                        { value: 'dashed', label: isFr ? 'Tirets (dashed)' : 'Dashed' },
                        { value: 'dotted', label: isFr ? 'Pointillés (dotted)' : 'Dotted' },
                    ],
                    onChange: (v) => setLineStyle(v as TimelineLineStyle),
                },
                {
                    type: 'select',
                    label: isFr ? 'Marqueur' : 'Marker',
                    value: markerType,
                    options: [
                        { value: 'icon', label: isFr ? 'Icônes vectorielles' : 'Vector icons' },
                        { value: 'dot', label: isFr ? 'Points simples' : 'Simple dots' },
                    ],
                    onChange: (v) => setMarkerType(v as 'dot' | 'icon'),
                },
                {
                    type: 'select',
                    label: isFr ? 'Nombre d’étapes' : 'Step count',
                    value: itemCount,
                    options: [
                        { value: '3', label: isFr ? '3 événements' : '3 events' },
                        { value: '4', label: isFr ? '4 événements' : '4 events' },
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
        'Structured chronological feed for activity history, deployment pipelines, and sequential step tracking with icon or dot markers.',
    importCode: "import { Timeline } from '@monority/ui/timeline'",
    usageCode: `<Timeline
  size="md"
  lineStyle="dashed"
  items={[
    { date: '2:30 PM', title: 'Deployment', description: 'Live', status: 'success', extra: 'v2.4' },
    { date: '11:15 AM', title: 'Security', status: 'primary' },
  ]}
/>`,
    preview: () => <TimelinePlayground />,
    examples: [
        {
            title: 'Rich composition with subcomponents and icons',
            content: <TimelineCompoundExample />,
        },
        {
            title: 'Interactive timeline with step selection',
            content: <TimelineInteractiveExample />,
        },
        { title: 'Horizontal orientation', content: <TimelineHorizontalExample /> },
    ],
    props: [
        {
            name: 'items',
            type: 'TimelineItemData[]',
            defaultValue: '-',
            description:
                'Declarative array of steps or events (id, date, title, description, status, icon, extra, lineStyle).',
        },
        {
            name: 'orientation',
            type: "'vertical' | 'horizontal'",
            defaultValue: "'vertical'",
            description: 'Display direction of the timeline.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Dimensional scale of markers, typography, and spacing.',
        },
        {
            name: 'lineStyle',
            type: "'solid' | 'dashed' | 'dotted'",
            defaultValue: "'solid'",
            description: 'Geometric style of the connecting line.',
        },
        {
            name: 'children',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Custom subcomponents in composition mode.',
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
        'Semantic markup using ordered list (<ol>) and list items (<li>).',
        'Dates wrapped in native <time> tags with tabular figures.',
        'Decorative step markers are aria-hidden for screen readers.',
        'Interactive roles and keyboard navigation (Enter / Space) for interactive items with visible focus ring.',
    ],
    i18n: timelineI18n,
}

export function TimelineDocs() {
    return <DocPage doc={docData} />
}
