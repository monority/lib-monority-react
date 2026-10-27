import { Progress } from '@monority/ui/progress'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    ProgressAnimatedExample,
    ProgressBasicExample,
    ProgressIndeterminateExample,
    ProgressRealisticServerExample,
    ProgressStripedExample,
    ProgressTonesExample,
    ProgressValuesExample,
    ProgressWithoutValueExample,
} from './Progress.examples'
import { progressI18n } from './Progress.messages'

function ProgressPlaygroundDemo(props: {
    value: number
    label: string
    tone: 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info'
    mode: 'determinate' | 'indeterminate'
    striped: boolean
    animated: boolean
    showValue: boolean
}) {
    return (
        <div style={{ width: '100%', maxWidth: '420px', margin: '0 auto' }}>
            <Progress
                value={props.value}
                label={props.label}
                tone={props.tone}
                mode={props.mode}
                striped={props.striped}
                animated={props.animated}
                showValue={props.showValue}
            />
        </div>
    )
}

const progressPlayground = (
    <ComponentPlayground<{
        value: number
        label: string
        tone: 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info'
        mode: 'determinate' | 'indeterminate'
        striped: boolean
        animated: boolean
        showValue: boolean
    }>
        componentName="Progress"
        importCode="import { Progress } from '@monority/ui/progress'"
        getCode={(p) => {
            const propsStr = [
                `  value={${p.value}}`,
                `  label="${p.label}"`,
                p.tone !== 'neutral' ? `  tone="${p.tone}"` : '',
                p.mode !== 'determinate' ? `  mode="${p.mode}"` : '',
                p.striped ? '  striped' : '',
                p.animated ? '  animated' : '',
                !p.showValue ? '  showValue={false}' : '',
            ]
                .filter(Boolean)
                .join('\n')

            return `import { Progress } from '@monority/ui/progress'\n\n<Progress\n${propsStr}\n/>`
        }}
        controls={[
            {
                name: 'label',
                type: 'text',
                label: 'Accessible label',
                defaultValue: 'Application deployment',
            },
            {
                name: 'value',
                type: 'number',
                label: 'Progress (%)',
                defaultValue: 68,
                min: 0,
                max: 100,
            },
            {
                name: 'tone',
                type: 'select',
                label: 'Visual tone',
                defaultValue: 'accent',
                options: [
                    { value: 'neutral', label: 'Neutral' },
                    { value: 'accent', label: 'Accent' },
                    { value: 'success', label: 'Success' },
                    { value: 'warning', label: 'Warning' },
                    { value: 'danger', label: 'Danger' },
                    { value: 'info', label: 'Info' },
                ],
            },
            {
                name: 'mode',
                type: 'select',
                label: 'Progress mode',
                defaultValue: 'determinate',
                options: [
                    { value: 'determinate', label: 'Determinate' },
                    { value: 'indeterminate', label: 'Indeterminate' },
                ],
            },
            {
                name: 'striped',
                type: 'boolean',
                label: 'Striped pattern (striped)',
                defaultValue: true,
            },
            {
                name: 'animated',
                type: 'boolean',
                label: 'Continuous animation',
                defaultValue: true,
            },
            {
                name: 'showValue',
                type: 'boolean',
                label: 'Show percentage',
                defaultValue: true,
            },
        ]}
        render={(props) => <ProgressPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'Progress',
    description:
        'Progress indicator for uploads, migrations, and task completion with determinate, indeterminate, and animated striped modes.',
    importCode: "import { Progress } from '@monority/ui/progress'",
    usageCode: `<Progress value={68} label="Release migration" />`,
    preview: () => <ProgressBasicExample />,
    playground: progressPlayground,
    examples: [
        {
            title: 'Realistic async flow (Golden rule)',
            content: <ProgressRealisticServerExample />,
            code: `// 1. Instant start to acknowledge user action
// 2. Fast ramp then deceleration toward 85%
// 3. Stagnation around 85-88% waiting for server response (animated stripes)
// 4. Direct jump from 88% to 100% at the final moment
<Progress
  value={progress}
  label={status === 'done' ? 'Deployment completed successfully' : 'Container synchronization in progress...'}
  tone={status === 'done' ? 'success' : 'accent'}
  striped={status === 'running'}
  animated={status === 'running'}
/>`,
        },
        { title: 'Stripes and continuous animation', content: <ProgressStripedExample /> },
        { title: 'Cyclic animation', content: <ProgressAnimatedExample /> },
        { title: 'Values and steps', content: <ProgressValuesExample /> },
        { title: 'Tones', content: <ProgressTonesExample /> },
        { title: 'Without value display', content: <ProgressWithoutValueExample /> },
        { title: 'Indeterminate mode', content: <ProgressIndeterminateExample /> },
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
        '--mr-accent-solid',
        '--mr-success',
        '--mr-warning',
        '--mr-danger',
        '--mr-bg-surface',
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
    i18n: progressI18n,
}

export function ProgressDocs() {
    return <DocPage doc={docData} />
}
