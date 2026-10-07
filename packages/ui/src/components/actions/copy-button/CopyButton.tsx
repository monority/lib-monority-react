import { Button } from '../button/Button'
import type { CopyButtonProps } from './CopyButton.types'

const variantMap = { subtle: 'subtle', outline: 'secondary', solid: 'primary' } as const

export function CopyButton({
    value,
    label,
    copiedLabel = 'Copied!',
    duration = 2000,
    size,
    variant = 'subtle',
    className,
    ref,
    ...props
}: CopyButtonProps & { ref?: React.Ref<HTMLButtonElement> }) {
    return (
        <Button
            ref={ref}
            copyValue={value}
            copiedLabel={copiedLabel}
            duration={duration}
            size={size}
            variant={variantMap[variant] ?? 'primary'}
            className={className}
            {...props}
        >
            {label}
        </Button>
    )
}

export type { CopyButtonProps, CopyButtonSize, CopyButtonVariant } from './CopyButton.types'
