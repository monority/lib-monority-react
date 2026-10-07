import { useControllableState } from '@/internal/use-controllable-state'
import { cn } from '@/lib/cn'
import type { ToggleProps } from './Toggle.types'

export function Toggle({
    pressed: controlledPressed,
    defaultPressed = false,
    onPressedChange,
    variant = 'default',
    size = 'md',
    tone = 'neutral',
    disabled = false,
    className,
    onClick,
    children,
    ref,
    ...props
}: ToggleProps) {
    const [pressed, setPressed] = useControllableState<boolean>({
        value: controlledPressed,
        defaultValue: defaultPressed,
        onChange: onPressedChange,
    })

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return
        setPressed(!pressed)
        onClick?.(e)
    }

    return (
        <button
            ref={ref}
            type="button"
            disabled={disabled}
            aria-pressed={pressed}
            data-state={pressed ? 'on' : 'off'}
            data-variant={variant}
            data-size={size}
            data-tone={tone}
            className={cn('mr-toggle', className)}
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    )
}

export type { ToggleProps, ToggleVariant, ToggleSize, ToggleTone } from './Toggle.types'
