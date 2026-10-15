import { DocPage, type DocPageData } from '../DocPage'
import { TitleBasicExample, TitleLevelsExample, TitleSizesExample } from './Title.examples'

const docData: DocPageData = {
    title: 'Title',
    description: 'Polymorphic heading component for semantic page and panel hierarchy.',
    importCode: "import { Title } from '@monority/ui'",
    usageCode: `<Title as="h1" size="display">Release readiness</Title>
<Title as="h2" size="lg">Review queue</Title>
<Text as="p" tone="base">
  Use titles to give product sections a clear hierarchy without changing semantic heading order.
</Text>`,
    preview: () => <TitleBasicExample />,
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
}

export function TitleDocs() {
    return <DocPage doc={docData} />
}
