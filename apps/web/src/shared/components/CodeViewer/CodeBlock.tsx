import { useEffect, useRef } from 'react'
import { PreCode } from '@monority/ui/pre-code'
import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/github-dark.css'

hljs.registerLanguage('bash', bash)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('tsx', typescript)
hljs.registerLanguage('xml', xml)

export interface CodeBlockProps {
    children: string
    className?: string
    language?: 'bash' | 'tsx' | 'typescript' | 'xml'
}

export function CodeBlock({ children, className, language = 'tsx' }: CodeBlockProps) {
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        if (ref.current) {
            ref.current.removeAttribute('data-highlighted')
            hljs.highlightElement(ref.current)
        }
    }, [children])

    return (
        <PreCode
            className={className ? `${className} docs-code-pre` : 'docs-code-pre'}
            codeRef={ref}
            language={language}
        >
            {children}
        </PreCode>
    )
}
