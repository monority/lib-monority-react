import { DocPage, type DocPageData } from '../DocPage'
import { StackBasicExample, StackGapExample, StackHorizontalExample } from './Stack.examples'

const docData: DocPageData = {
    title: 'Stack',
    description:
        'Flex layout primitive for vertical or horizontal grouping, spacing, alignment, and framed content blocks.',
    importCode: "import { Stack } from '@monority/ui'",
    usageCode: `<Stack gap="md" direction="vertical">
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>`,
    preview: () => <StackBasicExample />,
    examples: [
        { title: 'Gap sizes', content: <StackGapExample /> },
        { title: 'Horizontal', content: <StackHorizontalExample /> },
    ],
    props: [
        {
            name: 'gap',
            type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`,
            defaultValue: "'md'",
            description: 'Gap between children.',
        },
        {
            name: 'direction',
            type: `'vertical' | 'horizontal'`,
            defaultValue: "'vertical'",
            description: 'Main axis direction.',
        },
        {
            name: 'align',
            type: `'stretch' | 'start' | 'center' | 'end'`,
            defaultValue: "'stretch'",
            description: 'Cross-axis alignment.',
        },
        {
            name: 'justify',
            type: `'start' | 'center' | 'end' | 'between'`,
            defaultValue: "'start'",
            description: 'Main-axis distribution.',
        },
    ],
    cssHooks: ['.mr-stack', '[data-gap]', '[data-align]', '[data-justify]'],
    tokens: ['--mr-space-*'],
    a11y: ['Structural layout component.', 'No interactive semantics by default.'],
}

export function StackDocs() {
    return <DocPage doc={docData} />
}
