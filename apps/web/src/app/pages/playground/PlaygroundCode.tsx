import { useState } from 'react'
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock'

interface PlaygroundCodeProps {
    code: string
}

export function PlaygroundCode({ code }: PlaygroundCodeProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1600)
        } catch {
            setCopied(false)
        }
    }

    return (
        <section className="pg-code" aria-label="Generated code">
            <div className="pg-code__header">
                <p className="pg-preview__kicker">Code</p>
                <button type="button" className="pg-code__copy" onClick={handleCopy}>
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>
            <DocsCodeBlock language="tsx">{code}</DocsCodeBlock>
        </section>
    )
}
