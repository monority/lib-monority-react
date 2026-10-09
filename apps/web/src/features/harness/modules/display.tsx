import { Accordion, Avatar, Button, Card, Carousel, Collapsible } from '@monority/ui'
import { Sample } from '../Sample'

export function CardHarness() {
    return (
        <>
            <Sample label="Card Compound">
                <Card style={{ maxWidth: 360 }}>
                    <Card.Header>
                        <Card.Title>Project Settings</Card.Title>
                        <Card.Description>
                            Configure project defaults and team access.
                        </Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <p
                            style={{
                                margin: 0,
                                fontSize: 'var(--mr-type-small-size)',
                                color: 'var(--mr-text-secondary)',
                            }}
                        >
                            Card content containing detailed configuration controls.
                        </p>
                    </Card.Content>
                    <Card.Footer>
                        <Button size="sm">Save</Button>
                    </Card.Footer>
                </Card>
            </Sample>
            <Sample label="Card Interactive">
                <Card interactive padding="md" style={{ maxWidth: 360, cursor: 'pointer' }}>
                    <h4 style={{ margin: 0 }}>Clickable Card</h4>
                    <p
                        style={{
                            margin: 'var(--mr-spacing-1) 0 0',
                            color: 'var(--mr-text-secondary)',
                            fontSize: 'var(--mr-type-small-size)',
                        }}
                    >
                        Interactive card surface with hover elevation.
                    </p>
                </Card>
            </Sample>
            <Sample label="Card Paddings">
                <div style={{ display: 'flex', gap: 'var(--mr-spacing-3)' }}>
                    <Card padding="sm">Small padding</Card>
                    <Card padding="md">Medium padding</Card>
                    <Card padding="lg">Large padding</Card>
                </div>
            </Sample>
        </>
    )
}

export function AccordionHarness() {
    const items = [
        {
            value: 'item-1',
            title: 'Is Monority UI accessible?',
            content:
                'Yes, Monority UI strictly adheres to WCAG 2.2 AA standards and follows WAI-ARIA guidelines.',
        },
        {
            value: 'item-2',
            title: 'Does it support dark mode?',
            content:
                'Yes, 7 distinct themes including oled, slate, ocean, night, and high-contrast are supported.',
        },
        {
            value: 'item-3',
            title: 'Disabled Section',
            content: 'This section cannot be opened.',
            disabled: true,
        },
    ]

    return (
        <>
            <Sample label="Accordion Single">
                <Accordion items={items} defaultValue="item-1" />
            </Sample>
            <Sample label="Accordion Multiple">
                <Accordion items={items} allowMultiple defaultValue={['item-1', 'item-2']} />
            </Sample>
            <Sample label="Accordion Sizes">
                <div
                    style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-spacing-4)' }}
                >
                    <Accordion items={items.slice(0, 2)} size="sm" defaultValue="item-1" />
                    <Accordion items={items.slice(0, 2)} size="lg" defaultValue="item-1" />
                </div>
            </Sample>
        </>
    )
}

export function AvatarHarness() {
    return (
        <>
            <Sample label="Avatar Sizes">
                <div style={{ display: 'flex', gap: 'var(--mr-spacing-3)', alignItems: 'center' }}>
                    <Avatar size="sm" name="Alice Martin" />
                    <Avatar size="md" name="Bob Dupont" />
                    <Avatar size="lg" name="Charlie Vance" />
                </div>
            </Sample>
            <Sample label="Avatar With Status">
                <div style={{ display: 'flex', gap: 'var(--mr-spacing-3)', alignItems: 'center' }}>
                    <Avatar size="md" name="Alice Martin" status="online" />
                    <Avatar size="md" name="Bob Dupont" status="offline" />
                </div>
            </Sample>
            <Sample label="Avatar Fallback Initial">
                <div style={{ display: 'flex', gap: 'var(--mr-spacing-3)', alignItems: 'center' }}>
                    <Avatar size="md" name="Dev Ops" />
                    <Avatar size="md" name="Monority" />
                </div>
            </Sample>
        </>
    )
}

export function CarouselHarness() {
    const slides = [
        <div
            key="1"
            style={{
                height: 140,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--mr-bg-muted)',
                borderRadius: 'var(--mr-radius-md)',
            }}
        >
            Slide 1: Welcome to Monority UI
        </div>,
        <div
            key="2"
            style={{
                height: 140,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--mr-bg-subtle)',
                borderRadius: 'var(--mr-radius-md)',
            }}
        >
            Slide 2: Token-driven Design System
        </div>,
        <div
            key="3"
            style={{
                height: 140,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--mr-bg-muted)',
                borderRadius: 'var(--mr-radius-md)',
            }}
        >
            Slide 3: React 19 Native Architecture
        </div>,
    ]

    return (
        <>
            <Sample label="Carousel">
                <div style={{ maxWidth: 450 }}>
                    <Carousel slides={slides} showArrows showDots />
                </div>
            </Sample>
        </>
    )
}

export function CollapsibleHarness() {
    return (
        <>
            <Sample label="Collapsible Default">
                <div style={{ maxWidth: 360 }}>
                    <Collapsible title="View Technical Details" defaultOpen>
                        <p
                            style={{
                                margin: 'var(--mr-spacing-2) 0 0',
                                fontSize: 'var(--mr-type-small-size)',
                            }}
                        >
                            Component is compiled as ESM and CJS with full tree-shaking support.
                        </p>
                    </Collapsible>
                </div>
            </Sample>
            <Sample label="Collapsible Closed">
                <div style={{ maxWidth: 360 }}>
                    <Collapsible title="Advanced Configuration">
                        <p
                            style={{
                                margin: 'var(--mr-spacing-2) 0 0',
                                fontSize: 'var(--mr-type-small-size)',
                            }}
                        >
                            Override CSS variables `--mr-*` for customized layout rules.
                        </p>
                    </Collapsible>
                </div>
            </Sample>
        </>
    )
}
