import { cn } from '@/lib/cn'
import { CopyButton } from '@/components/actions/copy-button/CopyButton'
import type { PreCodeProps } from './PreCode.types'

export function PreCode({
    children,
    className,
    codeClassName,
    codeRef,
    language,
    size = 'md',
    wrap = false,
    copyable = false,
    copyValue,
    ref,
    ...props
}: PreCodeProps) {
    const languageClassName = language ? `language-${language}` : undefined
    const textToCopy = copyValue ?? (typeof children === 'string' ? children : '')

    const preElement = (
        <pre
            ref={ref}
            className={cn('mr-pre-code', className)}
            data-size={size}
            data-wrap={wrap ? 'true' : undefined}
            {...props}
        >
            <code ref={codeRef} className={cn(languageClassName, codeClassName)}>
                {children}
            </code>
        </pre>
    )

    if (!copyable) return preElement

    return (
        <div className="mr-pre-code-container">
            {preElement}
            <CopyButton
                className="mr-pre-code__copy-btn"
                value={textToCopy}
                size="sm"
                variant="subtle"
                aria-label="Copy code"
            />
        </div>
    )
}

export type { PreCodeProps, PreCodeSize } from './PreCode.types'
