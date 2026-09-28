import { Section } from '@monority/ui/section'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const defaults: PlaygroundProps = {
    title: 'Account activity',
    variant: 'card',
    spacing: 'md',
    titleAs: 'h2',
}

function codeFor(props: PlaygroundProps): string {
    const lines: string[] = []
    if (props.title) lines.push(`  title="${String(props.title)}"`)
    if (props.variant !== 'default') lines.push(`  variant="${String(props.variant)}"`)
    if (props.spacing !== 'md') lines.push(`  spacing="${String(props.spacing)}"`)
    if (props.titleAs !== 'h2') lines.push(`  titleAs="${String(props.titleAs)}"`)
    const open = lines.length === 0 ? '<Section>' : `<Section\n${lines.join('\n')}\n>`
    return `${open}\n  Sections group related content with a stable rhythm.\n</Section>`
}

export const sectionPlayground: PlaygroundDefinition = {
    slug: 'section',
    label: 'Section',
    docsPath: '/docs/section',
    importStatement: "import { Section } from '@monority/ui/section'",
    controls: [
        { name: 'title', type: 'text', placeholder: 'Account activity' },
        { name: 'variant', type: 'select', options: ['default', 'bordered', 'muted', 'card'] },
        { name: 'spacing', type: 'select', options: ['sm', 'md', 'lg', 'xl'] },
        { name: 'titleAs', type: 'select', options: ['h1', 'h2', 'h3', 'h4'] },
    ],
    defaultProps: defaults,
    render: (props) => (
        <Section
            title={String(props.title ?? '') || undefined}
            variant={props.variant as 'card'}
            spacing={props.spacing as 'md'}
            titleAs={props.titleAs as 'h2'}
        >
            <p style={{ margin: 0, color: 'var(--mr-fg-muted)' }}>
                Sections group related content with a stable title and spacing rhythm.
            </p>
        </Section>
    ),
    generateCode: codeFor,
}
