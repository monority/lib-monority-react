import type { DocExample } from './DocPage'
import { CodeViewer } from '@/shared/components/CodeViewer'

export interface DocExampleCardProps {
    example: DocExample
}

export function DocExampleCard({ example }: DocExampleCardProps) {
    const filename = `${example.title.toLowerCase().replace(/\s+/g, '-')}.tsx`

    return (
        <div className="docs-example-group">
            <h3>{example.title}</h3>
            <div className="docs-example-content">{example.content}</div>
            {example.code ? <CodeViewer code={example.code} filename={filename} /> : null}
        </div>
    )
}
