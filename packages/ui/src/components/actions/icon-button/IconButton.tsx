import { forwardRef } from 'react'
import { Button } from '../button/Button'
import type { IconButtonProps } from './IconButton.types'

const toneVariantMap = { neutral: 'ghost', accent: 'primary', danger: 'danger' } as const

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { label, tone = 'neutral', size, className, children, disabled, ...props },
    ref,
  ) {
    return (
      <Button
        ref={ref}
        iconOnly
        variant={toneVariantMap[tone]}
        size={size}
        className={className}
        aria-label={label}
        disabled={disabled}
        data-tone={tone}
        {...props}
      >
        {children}
      </Button>
    )
  },
)

export type { IconButtonProps, IconButtonSize, IconButtonTone } from './IconButton.types'
