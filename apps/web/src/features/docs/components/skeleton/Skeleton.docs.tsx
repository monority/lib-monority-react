import { Skeleton } from '@monority/ui/skeleton'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    SkeletonBasicExample,
    SkeletonCardExample,
    SkeletonCircleExample,
    SkeletonListExample,
} from './Skeleton.examples'

function SkeletonPlaygroundDemo(props: {
    size: 'sm' | 'md' | 'lg'
    lines: number
    circle: boolean
    rounded: boolean
}) {
    return (
        <div style={{ width: '100%', maxWidth: '360px', margin: '0 auto' }}>
            <Skeleton
                size={props.size}
                lines={props.lines}
                circle={props.circle}
                rounded={props.rounded}
                height={
                    props.circle
                        ? props.size === 'sm'
                            ? 32
                            : props.size === 'lg'
                              ? 48
                              : 40
                        : undefined
                }
                width={
                    props.circle
                        ? props.size === 'sm'
                            ? 32
                            : props.size === 'lg'
                              ? 48
                              : 40
                        : undefined
                }
            />
        </div>
    )
}

const skeletonPlayground = (
    <ComponentPlayground<{
        size: 'sm' | 'md' | 'lg'
        lines: number
        circle: boolean
        rounded: boolean
    }>
        componentName="Skeleton"
        importCode="import { Skeleton } from '@monority/ui/skeleton'"
        getCode={(p) => {
            const propsStr = [
                p.size !== 'md' ? `size="${p.size}"` : '',
                p.lines !== 1 ? `lines={${p.lines}}` : '',
                p.circle ? 'circle' : '',
                p.rounded ? 'rounded' : '',
            ]
                .filter(Boolean)
                .join(' ')

            return `import { Skeleton } from '@monority/ui/skeleton'\n\n<Skeleton ${propsStr} />`
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
                name: 'lines',
                type: 'number',
                label: 'Nombre de lignes (lines)',
                defaultValue: 3,
                min: 1,
                max: 6,
            },
            {
                name: 'rounded',
                type: 'boolean',
                label: 'Bords arrondis (rounded)',
                defaultValue: true,
            },
            {
                name: 'circle',
                type: 'boolean',
                label: 'Forme circulaire (avatar)',
                defaultValue: false,
            },
        ]}
        render={(props) => <SkeletonPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'Skeleton',
    description:
        'Shimmer placeholder for content that is still loading, useful for cards, lists, and profile rows.',
    importCode: "import { Skeleton } from '@monority/ui/skeleton'",
    usageCode: `<Skeleton style={{ width: '14rem', height: '1rem' }} />`,
    preview: () => <SkeletonBasicExample />,
    playground: skeletonPlayground,
    examples: [
        { title: 'Card layout', content: <SkeletonCardExample /> },
        { title: 'List items', content: <SkeletonListExample /> },
        { title: 'Circle avatar', content: <SkeletonCircleExample /> },
    ],
    props: [
        {
            name: 'size',
            type: `'sm' | 'md' | 'lg'`,
            defaultValue: "'md'",
            description: 'Size density of lines.',
        },
        {
            name: 'lines',
            type: 'number',
            defaultValue: '1',
            description: 'Number of placeholder lines rendered in group.',
        },
        {
            name: 'circle',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Renders circular avatar placeholder.',
        },
        {
            name: 'rounded',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Applies full pill border-radius.',
        },
    ],
    cssHooks: ['.mr-skeleton', '[data-size]'],
    tokens: [
        '--mr-bg-surface-strong',
        '--mr-bg-surface',
        '--mr-radius-sm',
        '--mr-duration-loop',
        '--mr-ease-in-out',
    ],
    a11y: [
        'Skeleton blocks are aria-hidden because they are decorative placeholders.',
        'Use aria-busy on the parent region while real content is loading.',
    ],
}

export function SkeletonDocs() {
    return <DocPage doc={docData} />
}
