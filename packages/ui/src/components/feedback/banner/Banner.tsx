import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import type { BannerProps, BannerTone } from './Banner.types'

const bannerVariants = cva({
  base: 'mr-banner',
  variants: {
    tone: {
      info: 'mr-banner--info',
      success: 'mr-banner--success',
      warning: 'mr-banner--warning',
      danger: 'mr-banner--danger',
    },
  },
  defaultVariants: { tone: 'info' },
})

export const Banner = forwardRef<HTMLElement, BannerProps>(function Banner(
  { tone, eyebrow, title, description, actions, className, ...props },
  ref,
) {
  const resolvedTone = tone ?? 'info'

  return (
    <section
      ref={ref}
      className={cn(bannerVariants({ tone: resolvedTone }), className)}
      data-tone={resolvedTone}
      {...props}
    >
      <div className="mr-banner__body">
        {eyebrow ? <span className="mr-banner__eyebrow">{eyebrow}</span> : null}
        {title ? <strong className="mr-banner__title">{title}</strong> : null}
        {description ? <p className="mr-banner__description">{description}</p> : null}
      </div>
      {actions ? <div className="mr-banner__actions">{actions}</div> : null}
    </section>
  )
})

export type { BannerProps, BannerTone } from './Banner.types'
