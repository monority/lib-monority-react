import { DocPage, type DocPageData } from '../DocPage'
import {
    DividerBasicExample,
    DividerWithLabelExample,
    DividerVerticalExample,
} from './Divider.examples'

const docData: DocPageData = {
    title: 'Divider',
    description: 'Labeled or unlabeled rule for separating adjacent product content.',
    importCode: "import { Divider } from '@monority/ui'",
    usageCode: '<Divider />',
    preview: () => <DividerBasicExample />,
    examples: [
        { title: 'With label', content: <DividerWithLabelExample /> },
        { title: 'Vertical', content: <DividerVerticalExample /> },
    ],
    props: [
        {
            name: 'orientation',
            type: "'horizontal' | 'vertical'",
            defaultValue: "'horizontal'",
            description: 'Axis of the divider.',
        },
        {
            name: 'label',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Optional centered label.',
        },
    ],
    cssHooks: ['.mr-divider', '.mr-divider__label', '[data-orientation="vertical"]'],
    tokens: ['--mr-divider-color', '--mr-divider-label-bg', '--mr-fg-muted', '--mr-text-xs'],
    a11y: [
        'Uses role="separator" with aria-orientation.',
        'Keep labels short and avoid using dividers as the only section label.',
    ],
}

export function DividerDocs() {
    return <DocPage doc={docData} />
}
