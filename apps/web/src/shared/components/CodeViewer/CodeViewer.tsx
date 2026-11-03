import { LocaleContext } from '@/shared/i18n/locale-context'
import { common as enCommon } from '@/shared/i18n/messages/en/common'
import { CopyButton } from '@monority/ui/copy-button'
import { type Ref, useContext } from 'react'
import { CodeBlock, type CodeLanguage } from './CodeBlock'
import './CodeViewer.css'

export interface CodeViewerProps {
    code: string
    filename?: string
    language?: CodeLanguage
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
    const codeMessages = useContext(LocaleContext)?.messages.common.code ?? enCommon.code

    return (
        <div ref={ref} className={`code-viewer ${className}`.trim()}>
            <div className="code-viewer__header docs-code-header">
                <span className="code-viewer__filename">{filename ?? `${language}.snippet`}</span>
                <CopyButton
                    value={code}
                    size="sm"
                    variant="subtle"
                    label={codeMessages.copy}
                    copiedLabel={codeMessages.copied}
                    aria-label={codeMessages.copyAriaLabel}
                    className="docs-copy-btn"
                />
            </div>
            <div
                className="code-viewer__body"
                tabIndex={0}
                role="region"
                aria-label={codeMessages.sourceRegionLabel}
            >
                <CodeBlock language={language}>{code}</CodeBlock>
            </div>
        </div>
    )
}
