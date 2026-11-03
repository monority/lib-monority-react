import { Badge } from '@monority/ui/badge'
import { Card } from '@monority/ui/card'
import { Text } from '@monority/ui/text'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { cardI18n } from './Card.messages'
import { CardInteractiveExample, CardPaddingExample } from './Card.examples'

function CardPlayground() {
    const [padding, setPadding] = useState<'sm' | 'md' | 'lg'>('md')
    const [interactive, setInteractive] = useState(false)
    const [title, setTitle] = useState('Project health')
    const [description, setDescription] = useState(
        'Stable release deployed to production with zero reported anomalies.'
    )
    const [showBadge, setShowBadge] = useState(true)

    const snippet = `<Card padding="${padding}"${interactive ? '\n  interactive' : ''}>
  <Card.Header>
    <Card.Title>${title}</Card.Title>${showBadge ? '\n    <Badge variant="default">Live</Badge>' : ''}
  </Card.Header>
  <Card.Description>
    ${description}
  </Card.Description>
  <Card.Footer>
    <Text tone="muted" size="sm">Updated 5 min ago</Text>
  </Card.Footer>
</Card>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    name: 'padding',
                    label: 'Padding',
                    value: padding,
                    options: [
                        { value: 'sm', label: 'Small (sm)' },
                        { value: 'md', label: 'Medium (md)' },
                        { value: 'lg', label: 'Large (lg)' },
                    ],
                    onChange: (v) => setPadding(v as 'sm' | 'md' | 'lg'),
                },
                {
                    type: 'boolean',
                    name: 'interactive',
                    label: 'Interactive',
                    value: interactive,
                    onChange: setInteractive,
                },
                {
                    type: 'text',
                    name: 'title',
                    label: 'Title',
                    value: title,
                    onChange: setTitle,
                },
                {
                    type: 'text',
                    name: 'description',
                    label: 'Description',
                    value: description,
                    onChange: setDescription,
                },
                {
                    type: 'boolean',
                    name: 'showBadge',
                    label: 'Header badge',
                    value: showBadge,
                    onChange: setShowBadge,
                },
            ]}
            codeSnippet={snippet}
        >
            <div style={{ maxWidth: 440, margin: '0 auto', width: '100%' }}>
                <Card padding={padding} interactive={interactive}>
                    <Card.Header>
                        <Card.Title>{title}</Card.Title>
                        {showBadge && <Badge variant="default">Live</Badge>}
                    </Card.Header>
                    <Card.Description>{description}</Card.Description>
                    <Card.Footer>
                        <Text tone="muted" size="sm">
                            Updated 5 min ago
                        </Text>
                    </Card.Footer>
                </Card>
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'Card',
    description:
        'Surface primitive for grouping related content with consistent density and elevation.',
    importCode:
        "import { Card } from '@monority/ui/card'\nimport { Badge } from '@monority/ui/badge'\nimport { Text } from '@monority/ui/text'",
    usageCode: `<Card padding="lg">
  <Card.Header>
    <Card.Title>Project health</Card.Title>
    <Badge variant="default">Live</Badge>
  </Card.Header>
  <Card.Description>Stable release candidate, no blocking issues.</Card.Description>
  <Card.Footer>
    <Text tone="muted" size="sm">
      Updated 5 minutes ago
    </Text>
  </Card.Footer>
</Card>`,
    preview: () => <CardPlayground />,
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
        '--mr-bg-raised',
        '--mr-border-subtle',
        '--mr-elevation-surface',
        '--mr-elevation-raised',
    ],
    a11y: ['Card is layout only.', 'Use a real button or link for primary actions inside a card.'],
    i18n: cardI18n,
}

export function CardDocs() {
    return <DocPage doc={docData} />
}
