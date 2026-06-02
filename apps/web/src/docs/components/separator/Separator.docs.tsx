import { DocPage, type DocPageData } from '../DocPage'
import {
    SeparatorBasicExample,
    SeparatorDecorativeExample,
    SeparatorVerticalExample,
} from './Separator.examples'

const docData: DocPageData = {
    title: 'Separator',
    description: 'Subtle divider for separating related groups without adding a new surface.',
    importCode: "import { Separator } from '@monority/ui'",
    usageCode: '<Separator />',
    preview: () => <SeparatorBasicExample />,
    examples: [
        { title: 'Vertical', content: <SeparatorVerticalExample /> },
        { title: 'Decorative', content: <SeparatorDecorativeExample /> },
    ],
    props: [
        {
            name: 'orientation',
            type: "'horizontal' | 'vertical'",
            defaultValue: "'horizontal'",
            description: 'Axis of the divider.',
        },
        {
            name: 'decorative',
            type: 'boolean',
            defaultValue: 'false',
            description:
                'Switches the separator to presentation role when structure is already clear.',
        },
    ],
    cssHooks: [
        '.mr-separator',
        '.mr-separator--horizontal',
        '.mr-separator--vertical',
        '[data-orientation="horizontal"]',
        '[data-orientation="vertical"]',
    ],
    tokens: ['--mr-separator-color', '--mr-border-subtle'],
    a11y: [
        'Uses role="separator" and aria-orientation by default.',
        'Use decorative={true} for purely visual grouping.',
        'Do not rely on separators as the only indication of section meaning.',
    ],
}

export function SeparatorDocs() {
    return <DocPage doc={docData} />
}
