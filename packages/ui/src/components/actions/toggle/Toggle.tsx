import { forwardRef, useState, useEffect } from 'react'
import { cn } from '@/lib/cn'
import type { ToggleProps } from './Toggle.types'

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
    {
        pressed: controlledPressed,
        defaultPressed = false,
        onPressedChange,
        variant,
        size,
        disabled,
        className,
        onClick,
        children,
        ...props
    },
    ref
) {
    const [internalPressed, setInternalPressed] = useState(defaultPressed)
    const pressed = controlledPressed ?? internalPressed

    useEffect(() => {
        if (controlledPressed !== undefined) {
            setInternalPressed(controlledPressed)
        }
    }, [controlledPressed])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return
        const newPressed = !pressed
        if (controlledPressed === undefined) {
            setInternalPressed(newPressed)
        }
        onPressedChange?.(newPressed)
        onClick?.(e)
    }

    return (
        <button
            ref={ref}
            type="button"
            disabled={disabled}
            aria-pressed={pressed}
            data-state={pressed ? 'on' : 'off'}
            data-variant={variant ?? 'default'}
            data-size={size ?? 'md'}
            className={cn('mr-toggle', className)}
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    )
})

export type { ToggleProps, ToggleVariant, ToggleSize } from './Toggle.types'
