import { DocPage, type DocPageData } from '../DocPage'
import {
    ProgressBasicExample,
    ProgressValuesExample,
    ProgressTonesExample,
    ProgressWithoutValueExample,
    ProgressIndeterminateExample,
} from './Progress.examples'

const docData: DocPageData = {
    title: 'Progress',
    description:
        'Progress indicator for uploads, migrations, and task completion with determinate and indeterminate modes.',
    importCode: "import { Progress } from '@monority/ui/progress'",
    usageCode: `<Progress value={68} label="Release migration" />`,
    preview: () => <ProgressBasicExample />,
    examples: [
        { title: 'Values', content: <ProgressValuesExample /> },
        { title: 'Tones', content: <ProgressTonesExample /> },
        { title: 'Without value', content: <ProgressWithoutValueExample /> },
        { title: 'Indeterminate', content: <ProgressIndeterminateExample /> },
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
            type: `'neutral' | 'success' | 'warning' | 'danger'`,
            defaultValue: '-',
            description: 'Progress bar tone.',
        },
        {
            name: 'mode',
            type: `'determinate' | 'indeterminate'`,
            defaultValue: "'determinate'",
            description: 'Display mode. Indeterminate shows an animated bar.',
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
        '[data-tone]',
        '[data-mode]',
    ],
    tokens: [
        '--mr-accent',
        '--mr-success',
        '--mr-warning',
        '--mr-danger',
        '--mr-bg-control',
        '--mr-border-subtle',
        '--mr-radius-full',
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
