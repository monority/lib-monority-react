import { DocPage, type DocPageData } from '../DocPage'
import { CardBasicExample, CardInteractiveExample, CardPaddingExample } from './Card.examples'

const docData: DocPageData = {
    title: 'Card',
    description:
        'Surface primitive for grouping related content with consistent density and elevation.',
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
        {
            name: 'padding',
            type: `'sm' | 'md' | 'lg'`,
            defaultValue: "'md'",
            description: 'Interior spacing.',
        },
        {
            name: 'interactive',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Adds hover affordance for selectable cards.',
        },
    ],
    cssHooks: [
        '.mr-card',
        '.mr-card--sm',
        '.mr-card--md',
        '.mr-card--lg',
        '[data-padding]',
        '[data-interactive]',
        '.mr-card__header',
        '.mr-card__content',
        '.mr-card__footer',
    ],
    tokens: [
        '--mr-card-radius',
        '--mr-card-padding-sm',
        '--mr-card-padding-md',
        '--mr-card-padding-lg',
        '--mr-bg-surface',
        '--mr-bg-surface-elevated',
        '--mr-border-subtle',
        '--mr-elevation-surface',
        '--mr-elevation-raised',
    ],
    a11y: ['Card is layout only.', 'Use a real button or link for primary actions inside a card.'],
}

export function CardDocs() {
    return <DocPage doc={docData} />
}
