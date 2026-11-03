import { PreCode } from '@monority/ui/pre-code'
import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import json from 'highlight.js/lib/languages/json'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import { useEffect, useRef } from 'react'

hljs.registerLanguage('bash', bash)
hljs.registerLanguage('css', css)
hljs.registerLanguage('json', json)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('tsx', typescript)
hljs.registerLanguage('xml', xml)
hljs.configure({ ignoreUnescapedHTML: true })

export type CodeLanguage = 'bash' | 'css' | 'json' | 'tsx' | 'typescript' | 'xml'

export interface CodeBlockProps {
    children: string
    className?: string
    language?: CodeLanguage
}

export function CodeBlock({ children, className, language = 'tsx' }: CodeBlockProps) {
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        if (ref.current) {
            ref.current.removeAttribute('data-highlighted')
            hljs.highlightElement(ref.current)
        }
    }, [children, language])

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
