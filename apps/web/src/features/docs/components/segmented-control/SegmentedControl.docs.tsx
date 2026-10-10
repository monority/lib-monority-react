import { DocPage, type DocPageData } from '../DocPage'
import {
    SegmentedControlBasicExample,
    SegmentedControlSizesExample,
    SegmentedControlCompoundExample,
} from './SegmentedControl.examples'

const docData: DocPageData = {
    title: 'SegmentedControl',
    description:
        'Controle compact a segments multiples permettant de basculer instantanement entre des vues ou modes exclusifs.',
    importCode: "import { SegmentedControl } from '@monority/ui/segmented-control'",
    usageCode: `<SegmentedControl
  options={[
    { value: 'grid', label: 'Vue Grille' },
    { value: 'list', label: 'Vue Liste' },
    { value: 'table', label: 'Vue Tableau' },
  ]}
  value={view}
  onChange={setView}
/>`,
    preview: () => <SegmentedControlBasicExample />,
    examples: [
        { title: 'Tailles standardisees (sm, md, lg)', content: <SegmentedControlSizesExample /> },
        {
            title: 'Composition declarative (SegmentedControl.Item)',
            content: <SegmentedControlCompoundExample />,
        },
    ],
    props: [
        {
            name: 'options',
            type: 'SegmentedControlOption[]',
            defaultValue: '-',
            description: 'Liste des options avec value, label, disabled.',
        },
        {
            name: 'value',
            type: 'string',
            defaultValue: '-',
            description: 'Valeur controlee de l option active.',
        },
        {
            name: 'defaultValue',
            type: 'string',
            defaultValue: '-',
            description: 'Valeur initiale par defaut en mode incontrole.',
        },
        {
            name: 'onChange',
            type: '(value: string) => void',
            defaultValue: '-',
            description: 'Rappel declenche lors de la selection d une option.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Hauteur et echelle de densite du controle.',
        },
        {
            name: 'fullWidth',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Occupe toute la largeur disponible du conteneur.',
        },
        {
            name: 'disabled',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Desactive l ensemble du controle.',
        },
    ],
    cssHooks: [
        '.mr-segmented-control',
        '.mr-segmented-control__item',
        '.mr-segmented-control__indicator',
        '[data-state="active"]',
        '[data-size="sm|md|lg"]',
        '[data-full-width="true"]',
    ],
    tokens: [
        '--mr-bg-muted',
        '--mr-bg-surface',
        '--mr-text-primary',
        '--mr-text-muted',
        '--mr-shadow-sm',
        '--mr-radius-control-md',
        '--mr-size-control-sm',
        '--mr-size-control-md',
        '--mr-size-control-lg',
    ],
    a11y: [
        'Conforme au motif WAI-ARIA Radio Group avec role="radiogroup".',
        'Chaque segment possede role="radio" et aria-checked="true|false".',
        'Support complet de la navigation par fleches du clavier (Left/Right/Up/Down) avec roving tabindex.',
    ],
}

export function SegmentedControlDocs() {
    return <DocPage doc={docData} />
}
