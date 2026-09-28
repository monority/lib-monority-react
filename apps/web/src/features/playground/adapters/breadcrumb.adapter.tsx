import { Breadcrumb } from '@monority/ui/breadcrumb'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const defaults: PlaygroundProps = { 'aria-label': 'Breadcrumb' }

function codeFor(props: PlaygroundProps): string {
    const label = String(props['aria-label'] ?? 'Breadcrumb')
    const labelProp = label !== 'Breadcrumb' ? `\n  aria-label="${label}"` : ''
    return `<Breadcrumb${labelProp}\n  items={[\n    { label: 'Docs', href: '/docs' },\n    { label: 'Components', href: '/docs' },\n    { label: 'Button' },\n  ]}\n/>`
}

export const breadcrumbPlayground: PlaygroundDefinition = {
    slug: 'breadcrumb',
    label: 'Breadcrumb',
    docsPath: '/docs/breadcrumb',
    importStatement: "import { Breadcrumb } from '@monority/ui/breadcrumb'",
    controls: [
        { name: 'aria-label', type: 'text', label: 'aria-label', placeholder: 'Breadcrumb' },
    ],
    defaultProps: defaults,
    render: (props) => (
        <Breadcrumb
            aria-label={String(props['aria-label'] ?? 'Breadcrumb') || undefined}
            items={[
                { label: 'Docs', href: '/docs' },
                { label: 'Components', href: '/docs' },
                { label: 'Button' },
            ]}
        />
    ),
    generateCode: codeFor,
}
