import { Title, type TitleSize } from '@monority/ui/title'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { titleI18n } from './Title.messages'
import { TitleLevelsExample, TitleSizesExample } from './Title.examples'

function TitlePlayground() {
    return (
        <ComponentPlayground
            componentName="Title"
            controls={[
                {
                    type: 'select',
                    name: 'size',
                    prop: 'size',
                    label: 'Visual scale (size)',
                    defaultValue: 'lg',
                    options: [
                        { value: 'sm', label: 'Small (sm)' },
                        { value: 'md', label: 'Medium (md)' },
                        { value: 'lg', label: 'Large (lg)' },
                        { value: 'display', label: 'Display (display)' },
                    ],
                },
                {
                    type: 'select',
                    name: 'as',
                    prop: 'as',
                    label: 'Semantic heading tag (as)',
                    defaultValue: 'h2',
                    options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                },
                {
                    type: 'text',
                    name: 'content',
                    prop: 'content',
                    label: 'Heading text',
                    defaultValue: 'Typographic Rigor & Balance',
                },
            ]}
            renderCode={(props) => `<Title
  as="${props.as}"
  size="${props.size}"
>
  ${props.content}
</Title>`}
        >
            {(props) => (
                <div style={{ maxWidth: 540 }}>
                    <Title
                        as={props.as as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'}
                        size={props.size as TitleSize}
                    >
                        {props.content as string}
                    </Title>
                </div>
            )}
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'Title',
    description: 'Polymorphic heading component for semantic page and panel hierarchy.',
    importCode: "import { Title } from '@monority/ui/title'",
    usageCode: `<Title as="h1" size="display">Release readiness</Title>
<Title as="h2" size="lg">Review queue</Title>
<Text as="p" tone="base">
  Use titles to give product sections a clear hierarchy without changing semantic heading order.
</Text>`,
    playground: <TitlePlayground />,
    preview: () => <TitlePlayground />,
    examples: [
        { title: 'Sizes', content: <TitleSizesExample /> },
        { title: 'Heading levels', content: <TitleLevelsExample /> },
    ],
    props: [
        {
            name: 'as',
            type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'",
            defaultValue: "'h2'",
            description: 'Rendered heading level.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg' | 'display'",
            defaultValue: "'md'",
            description: 'Visual heading scale.',
        },
        { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Heading content.' },
    ],
    cssHooks: ['.mr-title', '[data-size]'],
    tokens: ['--mr-text-primary', '--mr-text-lg', '--mr-text-xl', '--mr-text-2xl', '--mr-text-3xl'],
    a11y: [
        'Choose `as` from document hierarchy, not visual size.',
        'Avoid skipping heading levels inside docs and application pages.',
    ],
    i18n: titleI18n,
}

export function TitleDocs() {
    return <DocPage doc={docData} />
}
