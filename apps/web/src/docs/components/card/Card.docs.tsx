import { DocPage, type DocPageData } from '../DocPage'
import {
  CardBasicExample,
  CardPaddingExample,
  CardInteractiveExample,
} from './Card.examples'

const docData: DocPageData = {
  title: 'Card',
  description: 'Surface primitive for grouping related content without owning internal layout.',
  importCode: "import { Card } from '@monority/ui/card'",
  usageCode: `<Card padding="lg" interactive>
  <h3>Project health</h3>
  <p>Stable release candidate.</p>
</Card>`,
  preview: () => <CardBasicExample />,
  examples: [
    { title: 'Padding sizes', content: <CardPaddingExample /> },
    { title: 'Interactive', content: <CardInteractiveExample /> },
  ],
  props: [
    { name: 'padding', type: `'sm' | 'md' | 'lg'`, defaultValue: "'md'", description: 'Interior spacing.' },
    { name: 'interactive', type: `boolean`, defaultValue: "false", description: 'Adds hover affordance for clickable cards.' },
  ],
  cssHooks: ['.mr-card', '.mr-card--sm', '.mr-card--md', '.mr-card--lg', '[data-padding]', '[data-interactive]'],
  tokens: ['--mr-radius-lg', '--mr-border-subtle', '--mr-shadow-sm', '--mr-space-*'],
  a11y: ['Card is layout only.', 'Use a button/link inside or wrap carefully for interactive cards.'],
}

export function CardDocs() {
  return <DocPage doc={docData} />
}
