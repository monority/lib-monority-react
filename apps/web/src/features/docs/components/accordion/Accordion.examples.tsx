import { Accordion } from '@monority/ui/accordion'

const releaseItems = [
    {
        value: 'tokens',
        title: 'What changed in the token system?',
        content: (
            <p>
                Surface, border, and emphasis tokens were tightened so docs, product shells, and
                overlays read like one family instead of separate demos.
            </p>
        ),
    },
    {
        value: 'migration',
        title: 'How should teams migrate existing pages?',
        content: (
            <p>
                Start with shells, then shared controls, then content surfaces. That order keeps
                visual drift low while preserving local component APIs.
            </p>
        ),
    },
    {
        value: 'a11y',
        title: 'Did accessibility behavior change?',
        content: (
            <p>
                No breaking keyboard changes. The update mostly improves focus contrast, spacing
                rhythm, and panel readability.
            </p>
        ),
    },
]

export function AccordionBasicExample() {
    return <Accordion items={releaseItems} defaultValue="tokens" collapsible />
}

export function AccordionWithItemsExample() {
    return (
        <Accordion
            items={[
                {
                    value: 'foundations',
                    title: 'Foundations',
                    content: (
                        <p>
                            Tokens, typography, and spacing primitives that shape the whole
                            interface language.
                        </p>
                    ),
                },
                {
                    value: 'navigation',
                    title: 'Navigation',
                    content: (
                        <p>
                            Shell, tabs, menus, and wayfinding components tuned for scanning and
                            repeat use.
                        </p>
                    ),
                },
                {
                    value: 'feedback',
                    title: 'Feedback',
                    content: (
                        <p>
                            Banners, callouts, and status surfaces that stay visible without
                            shouting at the page.
                        </p>
                    ),
                },
            ]}
        />
    )
}

export function AccordionMultipleExample() {
    return (
        <Accordion
            allowMultiple
            defaultValue={['api', 'guides']}
            items={[
                {
                    value: 'api',
                    title: 'API reference',
                    content: <p>Precise props, tokens, CSS hooks, and composition details.</p>,
                },
                {
                    value: 'guides',
                    title: 'Guides',
                    content: (
                        <p>
                            Opinionated walkthroughs for forms, shells, and content-heavy screens.
                        </p>
                    ),
                },
                {
                    value: 'examples',
                    title: 'Examples',
                    content: <p>Product-flavored snippets that show intent, not just syntax.</p>,
                },
            ]}
        />
    )
}

export function AccordionCollapsibleExample() {
    return (
        <Accordion
            collapsible
            defaultValue="support"
            items={[
                {
                    value: 'support',
                    title: 'What level of control do I keep?',
                    content: (
                        <p>
                            The component manages open state by default, but you can fully control
                            expanded items when docs or product logic require it.
                        </p>
                    ),
                },
                {
                    value: 'content',
                    title: 'What content works best here?',
                    content: (
                        <p>
                            Use concise explanations, nested metadata, or short follow-up actions.
                            Long-form reading usually belongs in a section instead.
                        </p>
                    ),
                },
            ]}
        />
    )
}
