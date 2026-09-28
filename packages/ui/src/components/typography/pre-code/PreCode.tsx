import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import type { PreCodeProps } from './PreCode.types'

export const PreCode = forwardRef<HTMLPreElement, PreCodeProps>(function PreCode(
    { children, className, codeClassName, codeRef, language, size = 'md', wrap = false, ...props },
    ref
) {
    const languageClassName = language ? `language-${language}` : undefined

    return (
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
})

export type { PreCodeProps, PreCodeSize } from './PreCode.types'
