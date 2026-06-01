import { DocPage, type DocPageData } from '../DocPage'
import {
  ScrollAreaBasicExample,
  ScrollAreaHorizontalExample,
  ScrollAreaBothExample,
  ScrollAreaHideScrollbarExample,
} from './ScrollArea.examples'

const docData: DocPageData = {
  title: 'ScrollArea',
  description: 'A styled scrollable container with custom scrollbar styling and orientation control.',
  importCode: "import { ScrollArea } from '@monority/ui'",
  usageCode: `<ScrollArea orientation="vertical" style={{ maxHeight: 200 }}>
  <p>Long scrollable content...</p>
</ScrollArea>`,
  preview: () => <ScrollAreaBasicExample />,
  examples: [
    { title: 'Horizontal scroll', content: <ScrollAreaHorizontalExample /> },
    { title: 'Both directions', content: <ScrollAreaBothExample /> },
    { title: 'Hide scrollbar', content: <ScrollAreaHideScrollbarExample /> },
  ],
  props: [
    { name: 'orientation', type: "'both' | 'vertical' | 'horizontal'", defaultValue: "'vertical'", description: 'Scroll direction.' },
    { name: 'hideScrollbar', type: 'boolean', defaultValue: 'false', description: 'Visually hides scrollbar while keeping scrollable.' },
  ],
  cssHooks: [
    '.mr-scroll-area',
    '.mr-scroll-area--vertical',
    '.mr-scroll-area--horizontal',
    '.mr-scroll-area--both',
    '.mr-scroll-area--hide',
  ],
  tokens: [
    '--mr-border-subtle',
    '--mr-border-muted',
    '--mr-radius-full',
  ],
  a11y: [
    'Uses native scroll behavior with overflow.',
    'Scrollbar is styled but remains accessible.',
    'hideScrollbar removes visual scrollbar — ensure content is still discoverable.',
  ],
}

export function ScrollAreaDocs() {
  return <DocPage doc={docData} />
}
