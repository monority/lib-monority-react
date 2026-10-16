import { Spinner } from '@monority/ui/spinner'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    SpinnerBasicExample,
    SpinnerSizesExample,
    SpinnerTonesExample,
    SpinnerWithTextExample,
} from './Spinner.examples'

function SpinnerPlaygroundDemo(props: {
    size: 'sm' | 'md' | 'lg'
    tone: 'base' | 'muted' | 'inverse'
}) {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 'var(--mr-space-6)',
                background: props.tone === 'inverse' ? 'var(--mr-text-primary)' : 'transparent',
                borderRadius: 'var(--mr-radius-md)',
            }}
        >
            <Spinner size={props.size} tone={props.tone} />
        </div>
    )
}

const spinnerPlayground = (
    <ComponentPlayground<{
        size: 'sm' | 'md' | 'lg'
        tone: 'base' | 'muted' | 'inverse'
    }>
        componentName="Spinner"
        importCode="import { Spinner } from '@monority/ui/spinner'"
        getCode={(p) => {
            const propsStr = [
                p.size !== 'md' ? `size="${p.size}"` : '',
                p.tone !== 'base' ? `tone="${p.tone}"` : '',
            ]
                .filter(Boolean)
                .join(' ')

            return `import { Spinner } from '@monority/ui/spinner'\n\n<Spinner ${propsStr} />`
        }}
        controls={[
            {
                name: 'size',
                type: 'select',
                label: 'Dimension (size)',
                defaultValue: 'md',
                options: [
                    { value: 'sm', label: 'Small' },
                    { value: 'md', label: 'Medium' },
                    { value: 'lg', label: 'Large' },
                ],
            },
            {
                name: 'tone',
                type: 'select',
                label: 'Tonalite visuelle',
                defaultValue: 'base',
                options: [
                    { value: 'base', label: 'Base (accent)' },
                    { value: 'muted', label: 'Muted (atténué)' },
                    { value: 'inverse', label: 'Inverse (sur fond sombre)' },
                ],
            },
        ]}
        render={(props) => <SpinnerPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'Spinner',
    description:
        'Compact loading indicator for short waits, background actions, and inline status feedback.',
    importCode: "import { Spinner } from '@monority/ui/spinner'",
    usageCode: `<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />`,
    preview: () => <SpinnerBasicExample />,
    playground: spinnerPlayground,
    examples: [
        { title: 'Sizes', content: <SpinnerSizesExample /> },
        { title: 'Tones', content: <SpinnerTonesExample /> },
        { title: 'With text', content: <SpinnerWithTextExample /> },
    ],
    props: [
        {
            name: 'size',
            type: `'sm' | 'md' | 'lg'`,
            defaultValue: "'md'",
            description: 'Size of the spinner.',
        },
        {
            name: 'tone',
            type: `'base' | 'muted' | 'inverse'`,
            defaultValue: "'base'",
            description: 'Color tone of the spinner.',
        },
    ],
    cssHooks: ['.mr-spinner', '.mr-spinner__ring', '[data-size]', '[data-tone]'],
    tokens: [
        '--mr-accent-solid',
        '--mr-text-secondary',
        '--mr-spinner-size-sm',
        '--mr-spinner-size-md',
        '--mr-spinner-size-lg',
        '--mr-spinner-ring-sm',
        '--mr-spinner-ring-md',
        '--mr-spinner-ring-lg',
        '--mr-dur-600',
        '--mr-ease-linear',
    ],
    a11y: [
        'The component exposes role="status" with an accessible loading label.',
        'Add visible text nearby when the operation needs extra context.',
    ],
}

export function SpinnerDocs() {
    return <DocPage doc={docData} />
}
