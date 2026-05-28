import { DocPage, type DocPageData } from '../DocPage'
import {
  SpinnerBasicExample,
  SpinnerSizesExample,
  SpinnerTonesExample,
  SpinnerWithTextExample,
} from './Spinner.examples'

const docData: DocPageData = {
  title: 'Spinner',
  description: "A visual indicator that an action is in progress.",
  importCode: "import { Spinner } from '@monority/ui'",
  usageCode: `<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />`,
  preview: () => <SpinnerBasicExample />,
  examples: [
    { title: 'Sizes', content: <SpinnerSizesExample /> },
    { title: 'Tones', content: <SpinnerTonesExample /> },
    { title: 'With text', content: <SpinnerWithTextExample /> },
  ],
  props: [
    { name: 'size', type: `'sm' | 'md' | 'lg'`, defaultValue: "'md'", description: "Size of the spinner" },
    { name: 'tone', type: `'base' | 'muted' | 'inverse'`, defaultValue: "'base'", description: "Color tone of the spinner" }
  ],
  cssHooks: [
    '.mr-spinner', '[data-size]', '[data-tone]',
  ],
  tokens: [
    '--mr-fg-base', '--mr-fg-muted', '--mr-fg-inverse',
  ],
  a11y: [
    'aria-busy="true" on parent container.',
    'Spinner is aria-hidden (decorative).',
    'Use alongside visible text for context.',
  ],
}

export function SpinnerDocs() {
  return <DocPage doc={docData} />
}
