import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import type { KbdProps } from './Kbd.types'

const kbdVariants = cva({
  base: 'mr-kbd',
  variants: {
    size: {
      sm: 'mr-kbd--sm',
      md: 'mr-kbd--md',
      lg: 'mr-kbd--lg',
    },
  },
  defaultVariants: { size: 'md' },
})

export const Kbd = forwardRef<HTMLElement, KbdProps>(
  function Kbd({ children, size, keys, className, ...props }, ref) {
    if (keys) {
      return (
        <kbd ref={ref} className={cn(kbdVariants({ size }), className)} {...props}>
          {keys.map((key, i) => (
            <span key={i}>
              {i > 0 && <span className="mr-kbd__separator">+</span>}
              <span className="mr-kbd__key">{key}</span>
            </span>
          ))}
        </kbd>
      )
    }
    return (
      <kbd ref={ref} className={cn(kbdVariants({ size }), className)} {...props}>
        {children}
      </kbd>
    )
  },
)
