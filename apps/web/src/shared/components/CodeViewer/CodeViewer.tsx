import type { Ref } from 'react'
import { CopyButton } from '@monority/ui/copy-button'
import { DocsCodeBlock } from '@/features/docs/components/DocsCodeBlock'
import './CodeViewer.css'

export interface CodeViewerProps {
    code: string
    filename?: string
    language?: 'bash' | 'tsx' | 'typescript' | 'xml'
    className?: string
    ref?: Ref<HTMLDivElement>
}

export function CodeViewer({
    code,
    filename,
    language = 'tsx',
    className = '',
    ref,
}: CodeViewerProps) {
    return (
        <div ref={ref} className={`code-viewer ${className}`.trim()}>
            <div className="code-viewer__header">
                <span className="code-viewer__filename">{filename ?? `${language}.snippet`}</span>
                <CopyButton
                    value={code}
                    size="sm"
                    variant="subtle"
                    label="Copy"
                    copiedLabel="Copied!"
                    aria-label="Copy code"
                />
            </div>
            <div className="code-viewer__body">
                <DocsCodeBlock language={language}>{code}</DocsCodeBlock>
            </div>
        </div>
    )
}
