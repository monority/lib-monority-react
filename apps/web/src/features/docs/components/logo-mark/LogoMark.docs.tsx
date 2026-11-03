import { LogoMark } from '@monority/ui/logo-mark'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    LogoMarkAmberExample,
    LogoMarkCurrentExample,
    LogoMarkDarkExample,
    LogoMarkLightExample,
    LogoMarkSizesExample,
} from './LogoMark.examples'
import { logoMarkI18n } from './LogoMark.messages'

type Variant = 'current' | 'dark' | 'light' | 'amber'

function LogoMarkPlaygroundDemo(props: { variant: Variant; size: number }) {
    const light = props.variant === 'light'
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 'var(--mr-space-6)',
                borderRadius: 'var(--mr-radius-md)',
                background: light ? '#ECEBEB' : undefined,
            }}
        >
            <LogoMark variant={props.variant} size={props.size} label="Monority" />
        </div>
    )
}

const logoMarkPlayground = (
    <ComponentPlayground<{ variant: Variant; size: number }>
        componentName="LogoMark"
        importCode="import { LogoMark } from '@monority/ui/logo-mark'"
        getCode={(p) => {
            const variantProp = p.variant !== 'current' ? ` variant="${p.variant}"` : ''
            return `import { LogoMark } from '@monority/ui/logo-mark'\n\n<LogoMark${variantProp} size={${p.size}} label="Monority" />`
        }}
        controls={[
            {
                name: 'size',
                type: 'number',
                label: 'Size in pixels',
                defaultValue: 96,
                min: 16,
                max: 256,
                step: 8,
            },
            {
                name: 'variant',
                type: 'select',
                label: 'Color variant',
                defaultValue: 'current',
                options: [
                    { value: 'current', label: 'currentColor' },
                    { value: 'dark', label: 'On dark' },
                    { value: 'light', label: 'On light' },
                    { value: 'amber', label: 'Amber' },
                ],
            },
        ]}
        render={(props) => <LogoMarkPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'LogoMark',
    description:
        'The Monority mark: a three-ribbon knot drawn as a single fixed path. The geometry never changes, only the colour does.',
    importCode: "import { LogoMark } from '@monority/ui/logo-mark'",
    usageCode: '<LogoMark size={32} label="Monority" />',
    preview: () => <LogoMarkCurrentExample />,
    playground: logoMarkPlayground,
    examples: [
        { title: 'Colour from text (default)', content: <LogoMarkCurrentExample /> },
        { title: 'On dark', content: <LogoMarkDarkExample /> },
        { title: 'On light', content: <LogoMarkLightExample /> },
        { title: 'Amber on dark', content: <LogoMarkAmberExample /> },
        { title: 'Display sizes', content: <LogoMarkSizesExample /> },
    ],
    props: [
        {
            name: 'variant',
            type: `'current' | 'dark' | 'light' | 'amber'`,
            defaultValue: "'current'",
            description: 'Mark colour. `dark` and `amber` are made for a dark background.',
        },
        {
            name: 'label',
            type: 'string',
            defaultValue: '-',
            description: 'Accessible name. Without it the mark is decorative.',
        },
        {
            name: 'size',
            type: 'number',
            defaultValue: '-',
            description: 'Width and height in pixels.',
        },
    ],
    cssHooks: ['.mr-logo-mark'],
    tokens: ['--mr-text-primary', '--mr-accent-solid'],
    a11y: [
        'Decorative by default: no role, aria-hidden.',
        'Pass a label when the mark carries meaning on its own.',
    ],
    i18n: logoMarkI18n,
}

export function LogoMarkDocs() {
    return <DocPage doc={docData} />
}
