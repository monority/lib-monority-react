import { cn } from '@/lib/cn'
import type { ButtonHTMLAttributes, HTMLAttributes, ReactEventHandler, ReactNode, Ref } from 'react'

export interface MenuItemPrimitiveProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect' | 'value'> {
    ref?: Ref<HTMLButtonElement>
    value?: string | number | readonly string[]
    danger?: boolean
    icon?: ReactNode
    shortcut?: ReactNode
    onSelect?: ((value: string) => void) | ReactEventHandler<HTMLButtonElement>
    classPrefix?: string
    onItemClick?: () => void
    shortcutClassName?: string
    dangerClassName?: string
    disabledClassName?: string
}

export function MenuItemPrimitive({
    ref,
    value,
    danger = false,
    icon,
    shortcut,
    onSelect,
    disabled = false,
    className,
    classPrefix = 'mr-dropdown',
    onItemClick,
    shortcutClassName,
    dangerClassName,
    disabledClassName,
    children,
    onClick,
    ...props
}: MenuItemPrimitiveProps) {
    const dangerClass = dangerClassName ?? 'is-danger'
    const stringValue = value !== undefined ? String(value) : undefined
    return (
        <button
            ref={ref}
            type="button"
            role="menuitem"
            data-value={stringValue}
            value={value}
            disabled={disabled}
            className={cn(
                `${classPrefix}__item`,
                danger && dangerClass,
                disabled && disabledClassName,
                className
            )}
            onClick={(e) => {
                if (disabled) return
                onClick?.(e)
                if (stringValue !== undefined && onSelect) {
                    ;(onSelect as (val: string) => void)(stringValue)
                }
                onItemClick?.()
            }}
            {...props}
        >
            {icon ? (
                <span className={`${classPrefix}__item-icon`} aria-hidden="true">
                    {icon}
                </span>
            ) : null}
            <span className={`${classPrefix}__item-label`}>{children}</span>
            {shortcut ? (
                <span className={shortcutClassName ?? `${classPrefix}__item-shortcut`}>
                    {shortcut}
                </span>
            ) : null}
        </button>
    )
}

export interface MenuSeparatorPrimitiveProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    classPrefix?: string
}

export function MenuSeparatorPrimitive({
    ref,
    className,
    classPrefix = 'mr-dropdown',
    ...props
}: MenuSeparatorPrimitiveProps) {
    return (
        <div
            ref={ref}
            role="separator"
            className={cn(`${classPrefix}__separator`, className)}
            {...props}
        />
    )
}

export interface MenuLabelPrimitiveProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    classPrefix?: string
}

export function MenuLabelPrimitive({
    ref,
    className,
    classPrefix = 'mr-dropdown',
    children,
    ...props
}: MenuLabelPrimitiveProps) {
    return (
        <div ref={ref} className={cn(`${classPrefix}__label`, className)} {...props}>
            {children}
        </div>
    )
}
