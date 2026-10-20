import { useBodyScrollLock } from '@/internal/use-body-scroll-lock'
import { useFocusTrap } from '@/internal/use-focus-trap'
import { usePortalTarget } from '@/internal/use-portal-target'
import { usePresence } from '@/internal/use-presence'
import { cn } from '@/lib/cn'

import { cva } from '@/lib/variants'
import { InputBase } from '@/primitives/input-base'
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from 'react'
import { createPortal } from 'react-dom'
import type {
    CommandPaletteEmptyProps,
    CommandPaletteGroupProps,
    CommandPaletteHeaderProps,
    CommandPaletteInputProps,
    CommandPaletteItemDescriptionProps,
    CommandPaletteItemLabelProps,
    CommandPaletteItemProps,
    CommandPaletteListProps,
    CommandPaletteProps,
    CommandPaletteSeparatorProps,
    CommandPaletteShortcutProps,
} from './CommandPalette.types'

const commandPaletteVariants = cva({
    base: 'mr-command-palette__panel',
    variants: {},
})

interface CommandPaletteContextValue {
    query: string
    setQuery: (q: string) => void
    activeIndex: number
    setActiveIndex: (action: number | ((prev: number) => number)) => void
    closePalette: () => void
    setInputNode: (node: HTMLInputElement | null) => void
    titleId: string
    panelRef: React.RefObject<HTMLDivElement | null>
}

const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(null)

function useCommandPaletteContext() {
    const ctx = useContext(CommandPaletteContext)
    if (!ctx) {
        throw new Error(
            'CommandPalette compound components must be rendered inside <CommandPalette>.'
        )
    }
    return ctx
}

export function CommandPalette({
    ref,
    open,
    onClose,
    items = [],
    title = 'Command palette',
    placeholder = 'Rechercher une action…',
    emptyLabel = 'Aucun résultat.',
    className,
    children,
    ...props
}: CommandPaletteProps) {
    const generatedId = useId()
    const titleId = `${generatedId}-title`
    const panelRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const portalTarget = usePortalTarget()
    const { isMounted, presenceProps, ref: presenceRef } = usePresence(open, { durationMs: 200 })

    const [query, setQuery] = useState('')

    const [activeIndex, setActiveIndex] = useState(0)

    const closePalette = useCallback(() => {
        setQuery('')
        setActiveIndex(0)
        onClose?.()
    }, [onClose])

    useBodyScrollLock(open)
    useFocusTrap({
        active: open,
        containerRef: panelRef,
        initialFocusRef: inputRef,
        onEscape: closePalette,
    })

    const setInputNode = useCallback((node: HTMLInputElement | null) => {
        inputRef.current = node
    }, [])

    const filteredItems = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase()
        if (!normalizedQuery) return items

        return items.filter((item) =>
            [item.label, item.description, item.keywords, item.group]
                .filter(Boolean)
                .join(' ')
                .toLowerCase()
                .includes(normalizedQuery)
        )
    }, [items, query])

    // Synchronize active states on DOM items
    useEffect(() => {
        if (!open || !panelRef.current) return
        const domItems = panelRef.current.querySelectorAll<HTMLButtonElement>('.mr-command__item')
        domItems.forEach((el, idx) => {
            const isSelected = idx === activeIndex
            el.setAttribute('aria-selected', isSelected ? 'true' : 'false')
            if (isSelected) {
                el.classList.add('is-active')
            } else {
                el.classList.remove('is-active')
            }
        })
    }, [open, activeIndex, query, children])

    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        const domItems = panelRef.current
            ? Array.from(panelRef.current.querySelectorAll<HTMLButtonElement>('.mr-command__item'))
            : []
        const count = domItems.length || filteredItems.length

        if (event.key === 'ArrowDown') {
            event.preventDefault()
            setActiveIndex((current) => (count ? (current + 1) % count : 0))
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault()
            setActiveIndex((current) => (count ? (current - 1 + count) % count : 0))
        }

        if (event.key === 'Enter') {
            event.preventDefault()
            if (domItems.length && domItems[activeIndex]) {
                domItems[activeIndex].click()
            } else if (filteredItems[activeIndex]) {
                filteredItems[activeIndex].onSelect?.()
                closePalette()
            }
        }

        if (event.key === 'Home') {
            event.preventDefault()
            setActiveIndex(0)
        }

        if (event.key === 'End') {
            event.preventDefault()
            setActiveIndex(count ? count - 1 : 0)
        }
    }

    if (!isMounted || !portalTarget) return null

    const contextValue: CommandPaletteContextValue = {
        query,
        setQuery,
        activeIndex,
        setActiveIndex,
        closePalette,
        setInputNode,
        titleId,
        panelRef,
    }

    return createPortal(
        <CommandPaletteContext.Provider value={contextValue}>
            <div
                ref={ref}
                className={cn('mr-modal', 'mr-command-palette', className)}
                data-open={open ? true : undefined}
                role="presentation"
                {...presenceProps}
                {...props}
            >
                <div
                    className="mr-modal__backdrop"
                    onClick={closePalette}
                    aria-hidden="true"
                    data-state={presenceProps['data-state']}
                />

                <div
                    ref={(node) => {
                        panelRef.current = node
                        presenceRef(node)
                    }}
                    className={cn(commandPaletteVariants(), 'mr-modal__panel', 'mr-command')}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={titleId}
                    tabIndex={-1}
                    data-state={presenceProps['data-state']}
                    onKeyDown={handleKeyDown}
                >
                    <div className="mr-command__layout">
                        {children ? (
                            children
                        ) : (
                            <>
                                <header className="mr-command__header">
                                    <div className="mr-command__heading">
                                        <h3
                                            className={cn('mr-title', 'mr-modal__title')}
                                            id={titleId}
                                        >
                                            {title}
                                        </h3>
                                    </div>
                                    <InputBase
                                        as="input"
                                        ref={(node: HTMLInputElement | null) => {
                                            setInputNode(node)
                                        }}
                                        className="mr-command__input"
                                        type="text"
                                        value={query}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setQuery(event.target.value)
                                            setActiveIndex(0)
                                        }}
                                        placeholder={placeholder}
                                    />
                                </header>

                                <div
                                    className="mr-command__list"
                                    role="listbox"
                                    aria-label="Commandes"
                                >
                                    {filteredItems.length ? (
                                        filteredItems.map((item, index) => (
                                            <button
                                                key={item.value}
                                                type="button"
                                                role="option"
                                                aria-selected={activeIndex === index}
                                                className={cn(
                                                    'mr-command__item',
                                                    activeIndex === index && 'is-active'
                                                )}
                                                onMouseEnter={() => setActiveIndex(index)}
                                                onClick={() => {
                                                    item.onSelect?.()
                                                    closePalette()
                                                }}
                                            >
                                                <span className="mr-command__item-main">
                                                    {item.group ? (
                                                        <span className="mr-command__item-group">
                                                            {item.group}
                                                        </span>
                                                    ) : null}
                                                    <span className="mr-command__item-label">
                                                        {item.label}
                                                    </span>
                                                    {item.description ? (
                                                        <span className="mr-command__item-description">
                                                            {item.description}
                                                        </span>
                                                    ) : null}
                                                </span>
                                                {item.shortcut ? (
                                                    <span className="mr-command__shortcut">
                                                        {item.shortcut}
                                                    </span>
                                                ) : null}
                                            </button>
                                        ))
                                    ) : (
                                        <div className="mr-command__empty">{emptyLabel}</div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </CommandPaletteContext.Provider>,
        portalTarget
    )
}

function CommandPaletteHeader({ ref, className, children, ...props }: CommandPaletteHeaderProps) {
    return (
        <header ref={ref} className={cn('mr-command__header', className)} {...props}>
            {children}
        </header>
    )
}

function CommandPaletteInput({
    ref,
    className,
    value,
    onChange,
    placeholder = 'Rechercher une action…',
    ...props
}: CommandPaletteInputProps) {
    const ctx = useCommandPaletteContext()
    const resolvedValue = value !== undefined ? value : ctx.query

    const handleRef = useCallback(
        (node: HTMLInputElement | null) => {
            ctx.setInputNode(node)
            if (typeof ref === 'function') {
                ref(node)
            } else if (ref && 'current' in ref) {
                ;(ref as React.MutableRefObject<HTMLInputElement | null>).current = node
            }
        },
        [ctx, ref]
    )

    return (
        <InputBase
            as="input"
            ref={handleRef}
            className={cn('mr-command__input', className)}
            type="text"
            value={resolvedValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                ctx.setQuery(event.target.value)
                ctx.setActiveIndex(0)
                onChange?.(event)
            }}
            placeholder={placeholder}
            {...props}
        />
    )
}

function CommandPaletteList({ ref, className, children, ...props }: CommandPaletteListProps) {
    return (
        <div
            ref={ref}
            className={cn('mr-command__list', className)}
            role="listbox"
            aria-label="Commandes"
            {...props}
        >
            {children}
        </div>
    )
}

function CommandPaletteGroup({
    ref,
    heading,
    className,
    children,
    ...props
}: CommandPaletteGroupProps) {
    return (
        <div ref={ref} className={cn('mr-command__group', className)} role="group" {...props}>
            {heading ? <div className="mr-command__group-heading">{heading}</div> : null}
            {children}
        </div>
    )
}

function CommandPaletteItem({
    ref,
    value,
    active,
    onSelect,
    className,
    children,
    ...props
}: CommandPaletteItemProps) {
    const { setActiveIndex, closePalette, panelRef } = useCommandPaletteContext()
    const itemRef = useRef<HTMLButtonElement | null>(null)

    const handleMouseEnter = useCallback(() => {
        if (!panelRef.current || !itemRef.current) return
        const domItems = Array.from(
            panelRef.current.querySelectorAll<HTMLButtonElement>('.mr-command__item')
        )
        const idx = domItems.indexOf(itemRef.current)
        if (idx >= 0) {
            setActiveIndex(idx)
        }
    }, [panelRef, setActiveIndex])

    const handleClick = useCallback(() => {
        onSelect?.()
        closePalette()
    }, [onSelect, closePalette])

    const setNode = useCallback(
        (node: HTMLButtonElement | null) => {
            itemRef.current = node
            if (typeof ref === 'function') {
                ref(node)
            } else if (ref && 'current' in ref) {
                ;(ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
            }
        },
        [ref]
    )

    return (
        <button
            ref={setNode}
            type="button"
            role="option"
            data-value={value}
            aria-selected={active}
            className={cn('mr-command__item', active && 'is-active', className)}
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
            {...props}
        >
            <span className="mr-command__item-main">{children}</span>
        </button>
    )
}

function CommandPaletteItemLabel({
    ref,
    className,
    children,
    ...props
}: CommandPaletteItemLabelProps) {
    return (
        <span ref={ref} className={cn('mr-command__item-label', className)} {...props}>
            {children}
        </span>
    )
}

function CommandPaletteItemDescription({
    ref,
    className,
    children,
    ...props
}: CommandPaletteItemDescriptionProps) {
    return (
        <span ref={ref} className={cn('mr-command__item-description', className)} {...props}>
            {children}
        </span>
    )
}

function CommandPaletteShortcut({
    ref,
    className,
    children,
    ...props
}: CommandPaletteShortcutProps) {
    return (
        <span ref={ref} className={cn('mr-command__shortcut', className)} {...props}>
            {children}
        </span>
    )
}

function CommandPaletteEmpty({ ref, className, children, ...props }: CommandPaletteEmptyProps) {
    return (
        <div ref={ref} className={cn('mr-command__empty', className)} {...props}>
            {children}
        </div>
    )
}

function CommandPaletteSeparator({ ref, className, ...props }: CommandPaletteSeparatorProps) {
    return (
        <div
            ref={ref}
            className={cn('mr-command__separator', className)}
            role="separator"
            aria-hidden="true"
            {...props}
        />
    )
}

CommandPalette.Header = CommandPaletteHeader
CommandPalette.Input = CommandPaletteInput
CommandPalette.List = CommandPaletteList
CommandPalette.Group = CommandPaletteGroup
CommandPalette.Item = CommandPaletteItem
CommandPalette.ItemLabel = CommandPaletteItemLabel
CommandPalette.ItemDescription = CommandPaletteItemDescription
CommandPalette.Shortcut = CommandPaletteShortcut
CommandPalette.Empty = CommandPaletteEmpty
CommandPalette.Separator = CommandPaletteSeparator

export {
    CommandPaletteHeader,
    CommandPaletteInput,
    CommandPaletteList,
    CommandPaletteGroup,
    CommandPaletteItem,
    CommandPaletteItemLabel,
    CommandPaletteItemDescription,
    CommandPaletteShortcut,
    CommandPaletteEmpty,
    CommandPaletteSeparator,
}

export type {
    CommandItem,
    CommandPaletteProps,
    CommandPaletteHeaderProps,
    CommandPaletteInputProps,
    CommandPaletteListProps,
    CommandPaletteGroupProps,
    CommandPaletteItemProps,
    CommandPaletteItemLabelProps,
    CommandPaletteItemDescriptionProps,
    CommandPaletteShortcutProps,
    CommandPaletteEmptyProps,
    CommandPaletteSeparatorProps,
} from './CommandPalette.types'
