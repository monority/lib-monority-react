import { DocPage, type DocPageData } from '../DocPage'
import {
    ProgressAnimatedExample,
    ProgressIndeterminateExample,
    ProgressRealisticServerExample,
    ProgressStripedExample,
    ProgressTonesExample,
    ProgressValuesExample,
    ProgressWithoutValueExample,
} from './Progress.examples'

const docData: DocPageData = {
    title: 'Progress',
    description:
        'Progress indicator for uploads, migrations, and task completion with determinate, indeterminate, and animated striped modes.',
    importCode: "import { Progress } from '@monority/ui/progress'",
    usageCode: `<Progress value={68} label="Release migration" />`,
    preview: () => <ProgressRealisticServerExample />,
    examples: [
        {
            title: 'Flux asynchrone réaliste (Règle d’or)',
            content: <ProgressRealisticServerExample />,
        },
        { title: 'Stries et animation continue', content: <ProgressStripedExample /> },
        { title: 'Animation cyclique', content: <ProgressAnimatedExample /> },
        { title: 'Valeurs et échelons', content: <ProgressValuesExample /> },
        { title: 'Tonalités', content: <ProgressTonesExample /> },
        { title: 'Sans affichage de valeur', content: <ProgressWithoutValueExample /> },
        { title: 'Mode indéterminé', content: <ProgressIndeterminateExample /> },
    ],
    props: [
        {
            name: 'value',
            type: `number`,
            defaultValue: '0',
            description: 'Progress value (0-100).',
        },
        { name: 'label', type: `ReactNode`, defaultValue: '-', description: 'Accessible label.' },
        {
            name: 'showValue',
            type: `boolean`,
            defaultValue: 'true',
            description: 'Show percentage text.',
        },
        {
            name: 'tone',
            type: `'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info'`,
            defaultValue: "'neutral'",
            description: 'Progress bar tone.',
        },
        {
            name: 'mode',
            type: `'determinate' | 'indeterminate'`,
            defaultValue: "'determinate'",
            description: 'Display mode. Indeterminate shows an animated bar.',
        },
        {
            name: 'striped',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Apply diagonal subtle stripes on the bar.',
        },
        {
            name: 'animated',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Continuously animate stripes to preserve activity perception.',
        },
        {
            name: 'barClassName',
            type: `string`,
            defaultValue: '-',
            description: 'Class for the bar element.',
        },
    ],
    cssHooks: [
        '.mr-progress',
        '.mr-progress__meta',
        '.mr-progress__track',
        '.mr-progress__bar',
        '.mr-progress__label',
        '.mr-progress__bar--indeterminate',
        '.mr-progress__bar--striped',
        '.mr-progress__bar--animated',
        '[data-tone]',
        '[data-mode]',
        '[data-striped]',
        '[data-animated]',
    ],
    tokens: [
        '--mr-accent',
        '--mr-success',
        '--mr-warning',
        '--mr-danger',
        '--mr-bg-control',
        '--mr-border-subtle',
        '--mr-radius-full',
        '--mr-duration-base',
        '--mr-dur-1200',
        '--mr-ease-in-out',
    ],
    a11y: [
        'The track exposes role="progressbar".',
        'aria-valuenow, aria-valuemin, and aria-valuemax are provided in determinate mode.',
        'Indeterminate mode omits aria-valuenow.',
    ],
}

export function ProgressDocs() {
    return <DocPage doc={docData} />
}
