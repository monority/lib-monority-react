import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import type { PreCodeProps } from './PreCode.types'

const preCodeVariants = cva({
  base: 'mr-pre-code',
  variants: {
    size: {
      sm: 'mr-pre-code--sm',
      md: 'mr-pre-code--md',
    },
    wrap: {
      true: 'mr-pre-code--wrap',
      false: '',
    },
  },
  defaultVariants: { size: 'md', wrap: 'false' },
})

export const PreCode = forwardRef<HTMLPreElement, PreCodeProps>(
  function PreCode(
    {
      children,
      className,
      codeClassName,
      codeRef,
      language,
      size = 'md',
      wrap = false,
      ...props
    },
    ref,
  ) {
    const languageClassName = language ? `language-${language}` : undefined

    return (
      <pre
        ref={ref}
        className={cn(preCodeVariants({ size, wrap: wrap ? 'true' : 'false' }), className)}
        data-size={size}
        data-wrap={wrap ? 'true' : undefined}
        {...props}
      >
        <code ref={codeRef} className={cn(languageClassName, codeClassName)}>
          {children}
        </code>
      </pre>
    )
  },
)

export type { PreCodeProps, PreCodeSize } from './PreCode.types'
