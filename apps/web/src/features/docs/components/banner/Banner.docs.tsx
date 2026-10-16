import { Banner } from '@monority/ui/banner'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    BannerBasicExample,
    BannerTonesExample,
    BannerWithActionsExample,
    BannerWithEyebrowExample,
} from './Banner.examples'

function BannerPlaygroundDemo(props: {
    tone: 'info' | 'success' | 'warning' | 'danger'
    eyebrow: string
    title: string
    description: string
}) {
    return (
        <div style={{ width: '100%', margin: '0 auto' }}>
            <Banner
                tone={props.tone}
                eyebrow={props.eyebrow || undefined}
                title={props.title}
                description={props.description}
            />
        </div>
    )
}

const bannerPlayground = (
    <ComponentPlayground<{
        tone: 'info' | 'success' | 'warning' | 'danger'
        eyebrow: string
        title: string
        description: string
    }>
        componentName="Banner"
        importCode="import { Banner } from '@monority/ui/banner'"
        getCode={(p) => {
            const propsStr = [
                `  tone="${p.tone}"`,
                p.eyebrow ? `  eyebrow="${p.eyebrow}"` : '',
                `  title="${p.title}"`,
                `  description="${p.description}"`,
            ]
                .filter(Boolean)
                .join('\n')

            return `import { Banner } from '@monority/ui/banner'\n\n<Banner\n${propsStr}\n/>`
        }}
        controls={[
            {
                name: 'title',
                type: 'text',
                label: 'Titre du bandeau',
                defaultValue: 'Maintenance planifiee du cluster',
            },
            {
                name: 'description',
                type: 'text',
                label: 'Description',
                defaultValue: 'Une coupure de quelques minutes interviendra dimanche a 03h00 UTC.',
            },
            {
                name: 'eyebrow',
                type: 'text',
                label: 'Sur-titre (eyebrow)',
                defaultValue: 'Infrastructure',
            },
            {
                name: 'tone',
                type: 'select',
                label: 'Tonalite visuelle',
                defaultValue: 'info',
                options: [
                    { value: 'info', label: 'Info' },
                    { value: 'success', label: 'Success' },
                    { value: 'warning', label: 'Warning' },
                    { value: 'danger', label: 'Danger' },
                ],
            },
        ]}
        render={(props) => <BannerPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'Banner',
    description:
        'Top-of-page notification with eyebrow, title, description, and optional actions. Use for persistent page- or section-level information.',
    importCode: "import { Banner } from '@monority/ui/banner'",
    usageCode: `<Banner tone="info" title="Scheduled maintenance" description="Service may be briefly unavailable." />`,
    preview: () => <BannerBasicExample />,
    playground: bannerPlayground,
    examples: [
        { title: 'Tones', content: <BannerTonesExample /> },
        { title: 'With actions', content: <BannerWithActionsExample /> },
        { title: 'With eyebrow', content: <BannerWithEyebrowExample /> },
    ],
    props: [
        {
            name: 'tone',
            type: `'info' | 'success' | 'warning' | 'danger'`,
            defaultValue: "'info'",
            description: 'Visual tone.',
        },
        {
            name: 'eyebrow',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Small text above title.',
        },
        { name: 'title', type: `ReactNode`, defaultValue: '-', description: 'Banner title.' },
        {
            name: 'description',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Banner description.',
        },
        { name: 'actions', type: `ReactNode`, defaultValue: '-', description: 'Action buttons.' },
        {
            name: 'children',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Fallback message when title and description are omitted.',
        },
    ],
    cssHooks: ['.mr-banner', '.mr-banner__marker', '.mr-banner__body', '.mr-banner__actions'],
    tokens: [
        '--mr-info',
        '--mr-success',
        '--mr-warning',
        '--mr-danger',
        '--mr-bg-raised',
        '--mr-border-subtle',
        '--mr-font-size-sm',
    ],
    a11y: [
        'Renders a static section: add role="alert" yourself for time-sensitive messages.',
        'Use semantic headings within the banner content.',
    ],
}

export function BannerDocs() {
    return <DocPage doc={docData} />
}
