import { DocPage, type DocPageData } from '../DocPage'
import {
    AspectRatioBasicExample,
    AspectRatioVideoExample,
    AspectRatioSquareExample,
} from './AspectRatio.examples'

const docData: DocPageData = {
    title: 'AspectRatio',
    description:
        'Maintains a fixed aspect ratio for child content using the CSS padding-bottom trick.',
    importCode: "import { AspectRatio } from '@monority/ui'",
    usageCode: `<AspectRatio ratio={16 / 9}>
  <img src="/image.jpg" alt="Content" />
</AspectRatio>`,
    preview: () => <AspectRatioBasicExample />,
    examples: [
        { title: 'Video embed (16/9)', content: <AspectRatioVideoExample /> },
        { title: 'Square (1/1)', content: <AspectRatioSquareExample /> },
    ],
    props: [
        {
            name: 'ratio',
            type: 'number',
            defaultValue: '16 / 9',
            description: 'Aspect ratio as width/height.',
        },
    ],
    cssHooks: ['.mr-aspect-ratio', '.mr-aspect-ratio__content'],
    tokens: [],
    a11y: [
        'Structural layout component.',
        'No interactive semantics by default.',
        'Ensure child content has appropriate accessible names.',
    ],
}

export function AspectRatioDocs() {
    return <DocPage doc={docData} />
}
