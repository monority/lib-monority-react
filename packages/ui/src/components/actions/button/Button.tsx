import { forwardRef, type ElementType, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import './Button.css'

type ButtonVariant = 'primary' | 'ghost' | 'subtle' | 'danger' | 'secondary' | 'muted'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'as' | 'type'> {
  as?: ElementType; variant?: ButtonVariant; size?: ButtonSize; className?: string
  type?: 'button' | 'submit' | 'reset'; fullWidth?: boolean; loading?: boolean
  iconLeading?: React.ReactNode; iconTrailing?: React.ReactNode; children?: React.ReactNode
}

const buttonVariants = cva({
  base: 'ui-btn',
  variants: {
    variant: { primary: 'ui-btn--primary', secondary: 'ui-btn--secondary', muted: 'ui-btn--muted', ghost: 'ui-btn--ghost', subtle: 'ui-btn--subtle', danger: 'ui-btn--danger' },
    size: { sm: 'ui-btn--sm', md: 'ui-btn--md', lg: 'ui-btn--lg' },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
})

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({ as: Component = 'button', variant, size, className, type = 'button', fullWidth = false, loading = false, iconLeading, iconTrailing, children, disabled, ...props }, ref) {
  const isDisabled = disabled || loading
  return (
    <Component ref={ref} className={cn(buttonVariants({ variant, size }), fullWidth && 'ui-btn--full-width', loading && 'ui-btn--loading', className)} type={Component === 'button' ? type : undefined} disabled={Component === 'button' ? isDisabled : undefined} aria-disabled={Component !== 'button' && isDisabled ? true : undefined} aria-busy={loading || undefined} {...props}>
      {iconLeading ? <span className="ui-btn__icon">{iconLeading}</span> : null}
      <span className="ui-btn__label">{children}</span>
      {iconTrailing ? <span className="ui-btn__icon">{iconTrailing}</span> : null}
    </Component>
  )
})

export type { ButtonProps, ButtonVariant, ButtonSize }
