import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import type { CalloutProps, CalloutTone } from './Callout.types'

const calloutVariants = cva({
  base: 'mr-callout',
  variants: {
    tone: {
      neutral: 'mr-callout--neutral',
      info: 'mr-callout--info',
      success: 'mr-callout--success',
      warning: 'mr-callout--warning',
      danger: 'mr-callout--danger',
    },
  },
  defaultVariants: { tone: 'neutral' },
})

export const Callout = forwardRef<HTMLDivElement, CalloutProps>(function Callout(
  { tone, title, description, children, className, ...props },
  ref,
) {
  const resolvedTone = tone ?? 'neutral'

  return (
    <div
      ref={ref}
      className={cn(calloutVariants({ tone: resolvedTone }), className)}
      role="note"
      data-tone={resolvedTone}
      {...props}
    >
      {title ? <strong className="mr-callout__title">{title}</strong> : null}
      {description ? <p className="mr-callout__description">{description}</p> : null}
      {children}
    </div>
  )
})

export type { CalloutProps, CalloutTone } from './Callout.types'
