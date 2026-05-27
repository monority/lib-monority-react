import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import type { BreadcrumbProps } from './Breadcrumb.types'

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb({ items = [], className, ...props }, ref) {
    return (
      <nav ref={ref} className={cn('mr-breadcrumb', className)} aria-label="Breadcrumb" {...props}>
        <ol className="mr-breadcrumb__list">
          {items.map((item, index) => (
            <li key={index} className="mr-breadcrumb__item">
              {item.href ? (
                <a href={item.href} className="mr-breadcrumb__link">
                  {item.label}
                </a>
              ) : (
                <span className="mr-breadcrumb__current" aria-current="page">
                  {item.label}
                </span>
              )}
              {index < items.length - 1 ? (
                <span className="mr-breadcrumb__separator" aria-hidden="true">
                  /
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </nav>
    )
  },
)

export type { BreadcrumbProps, BreadcrumbItem } from './Breadcrumb.types'
