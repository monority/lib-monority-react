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
import { cn } from '@/lib/cn'
import { OVERLAY_OFFSET } from '@/lib/constants'
import { Field } from '@/components/forms/field/Field'
import { FormControl } from '@/primitives/form-control'
import { InputBase } from '@/primitives/input-base'
import { Spinner } from '@/components/feedback/spinner/Spinner'
import { usePortalTarget } from '@/internal/use-portal-target'
import type {
    ComboboxEmptyProps,
    ComboboxInputProps,
    ComboboxItem as ComboboxItemData,
    ComboboxItemDescriptionProps,
    ComboboxItemLabelProps,
    ComboboxItemProps,
    ComboboxListProps,
    ComboboxProps,
    ComboboxSize,
    ComboboxTone,
} from './Combobox.types'

const ClearIcon = () => (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
            d="M5 5L15 15M15 5L5 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
    </svg>
)

interface ComboboxContextValue {
    open: boolean
    setOpen: (open: boolean) => void
    query: string
    setQuery: (q: string) => void
    selectedValue: string
    selectItem: (value: string, label?: string) => void
    activeIndex: number
    setActiveIndex: (idx: number | ((prev: number) => number)) => void
    inputId: string
    resolvedSize: ComboboxSize
    resolvedTone: ComboboxTone
    disabled: boolean
    inputRef: React.RefObject<HTMLInputElement | null>
    position: { top: number; left: number; width: number }
    activeTheme?: string
    activeBrand?: string
    activeDensity?: string
}

const ComboboxContext = createContext<ComboboxContextValue | null>(null)

export function Combobox({
    ref,
    tone,
    size,
    label,
    hint,
    error,
    id,
    className,
    items = [],
    value,
    defaultValue = '',
    onChange,
    placeholder = 'Rechercher...',
    emptyLabel = 'Aucun resultat',
    invalid = false,
    disabled = false,
    required = false,
    loading = false,
    clearable = false,
    clearAriaLabel = 'Effacer la sélection',
    onClear,
    children,
    ...props
}: ComboboxProps) {
    const generatedId = useId()
    const inputId = id || generatedId

    const rootRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const listRef = useRef<HTMLDivElement>(null)

    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = useState(defaultValue)
    const [query, setQuery] = useState('')
    const [open, setOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 })

    const selectedValue = isControlled ? value : internalValue
    const portalTarget = usePortalTarget()

    const hasValue = Boolean(selectedValue && selectedValue.length > 0) || query.length > 0
    const showClear = Boolean(clearable) && hasValue && !disabled && !props.readOnly && !loading

    function handleClear(e: React.MouseEvent) {
        e.stopPropagation()
        setQuery('')
        if (!isControlled) setInternalValue('')
        onChange?.('')
        setOpen(false)
        setActiveIndex(0)
        onClear?.()
        inputRef.current?.focus()
    }

    const resolvedTone: ComboboxTone = tone ?? 'neutral'
    const resolvedSize: ComboboxSize = size ?? 'md'
    const isInvalid = invalid || Boolean(error)

    const handleRef = useCallback(
        (node: HTMLInputElement | null) => {
            inputRef.current = node
            if (typeof ref === 'function') {
                ref(node)
            } else if (ref && typeof ref === 'object' && 'current' in ref) {
                ;(ref as { current: HTMLInputElement | null }).current = node
            }
        },
        [ref]
    )

    const selectedItem = useMemo(
        () => items.find((item) => item.value === selectedValue) ?? null,
        [items, selectedValue]
    )

    const filteredItems = useMemo(() => {
        const nq = query.trim().toLowerCase()
        if (!nq) return items
        return items.filter((item) =>
            `${item.label} ${item.keywords ?? ''}`.toLowerCase().includes(nq)
        )
    }, [items, query])

    useEffect(() => {
        if (!open) return
        const frameId = window.requestAnimationFrame(() => {
            const r = inputRef.current?.getBoundingClientRect()
            if (r) setPosition({ top: r.bottom + OVERLAY_OFFSET, left: r.left, width: r.width })
        })
        function pd(e: MouseEvent) {
            if (
                !rootRef.current?.contains(e.target as Node) &&
                !listRef.current?.contains(e.target as Node)
            ) {
                setOpen(false)
                setQuery('')
                setActiveIndex(0)
            }
        }
        function vc() {
            const r = inputRef.current?.getBoundingClientRect()
            if (r) setPosition({ top: r.bottom + OVERLAY_OFFSET, left: r.left, width: r.width })
        }
        document.addEventListener('mousedown', pd)
        window.addEventListener('resize', vc)
        window.addEventListener('scroll', vc, true)
        return () => {
            window.cancelAnimationFrame(frameId)
            document.removeEventListener('mousedown', pd)
            window.removeEventListener('resize', vc)
            window.removeEventListener('scroll', vc, true)
        }
    }, [open])

    const selectItemByValue = useCallback(
        (val: string) => {
            if (!isControlled) setInternalValue(val)
            onChange?.(val)
            setQuery('')
            setOpen(false)
            setActiveIndex(0)
        },
        [isControlled, onChange]
    )

    function selectItem(item: ComboboxItemData) {
        selectItemByValue(item.value)
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            if (!open) {
                setOpen(true)
                setQuery('')
            }
            setActiveIndex((prev) => Math.min(prev + 1, filteredItems.length - 1))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            if (!open) {
                setOpen(true)
                setQuery('')
            }
            setActiveIndex((prev) => Math.max(prev - 1, 0))
        } else if (e.key === 'Enter') {
            e.preventDefault()
            if (open && filteredItems[activeIndex]) {
                selectItem(filteredItems[activeIndex])
            }
        } else if (e.key === 'Escape') {
            e.preventDefault()
            setOpen(false)
            setQuery('')
            setActiveIndex(0)
        }
    }

    const activeTheme = rootRef.current
        ? (rootRef.current.closest('[data-theme]')?.getAttribute('data-theme') ?? undefined)
        : undefined
    const activeBrand = rootRef.current
        ? (rootRef.current.closest('[data-brand]')?.getAttribute('data-brand') ?? undefined)
        : undefined
    const activeDensity = rootRef.current
        ? (rootRef.current.closest('[data-density]')?.getAttribute('data-density') ?? undefined)
        : undefined

    const contextValue: ComboboxContextValue = {
        open,
        setOpen,
        query,
        setQuery,
        selectedValue,
        selectItem: selectItemByValue,
        activeIndex,
        setActiveIndex,
        inputId,
        resolvedSize,
        resolvedTone,
        disabled,
        inputRef,
        position,
        activeTheme,
        activeBrand,
        activeDensity,
    }

    return (
        <ComboboxContext.Provider value={contextValue}>
            <FormControl
                id={inputId}
                hint={!!hint}
                error={!!error}
                size={resolvedSize}
                tone={resolvedTone}
                invalid={isInvalid}
                disabled={disabled}
                required={required}
            >
                <Field className={className} label={label} hint={hint} error={error}>
                    <div
                        ref={rootRef}
                        className="mr-combobox"
                        data-tone={resolvedTone}
                        data-size={resolvedSize}
                        data-open={open ? true : undefined}
                        data-loading={loading ? true : undefined}
                        data-has-clear={showClear ? true : undefined}
                        data-invalid={isInvalid ? true : undefined}
                        data-disabled={disabled ? true : undefined}
                        data-required={required ? true : undefined}
                    >
                        {children ? (
                            children
                        ) : (
                            <>
                                <InputBase
                                    as="input"
                                    ref={handleRef}
                                    type="text"
                                    role="combobox"
                                    className="mr-combobox__input"
                                    data-invalid={isInvalid ? true : undefined}
                                    data-disabled={disabled ? true : undefined}
                                    data-has-clear={showClear ? true : undefined}
                                    aria-busy={loading ? 'true' : undefined}
                                    aria-expanded={open}
                                    aria-controls={open ? `${inputId}-list` : undefined}
                                    aria-activedescendant={
                                        open && filteredItems[activeIndex]
                                            ? `${inputId}-item-${filteredItems[activeIndex].value}`
                                            : undefined
                                    }
                                    aria-autocomplete="list"
                                    autoComplete="off"
                                    placeholder={placeholder}
                                    value={open ? query : (selectedItem?.label ?? selectedValue)}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setQuery(e.target.value)
                                        setActiveIndex(0)
                                        setOpen(true)
                                    }}
                                    onFocus={() => {
                                        setQuery('')
                                        setOpen(true)
                                    }}
                                    onClick={() => {
                                        if (!open) {
                                            setQuery('')
                                            setOpen(true)
                                        }
                                    }}
                                    onKeyDown={handleKeyDown}
                                    aria-label={typeof label === 'string' ? label : undefined}
                                    {...props}
                                />
                                {showClear ? (
                                    <button
                                        type="button"
                                        className="mr-combobox__clear"
                                        aria-label={clearAriaLabel}
                                        onClick={handleClear}
                                        onMouseDown={(e) => e.preventDefault()}
                                        tabIndex={-1}
                                        disabled={disabled}
                                    >
                                        <ClearIcon />
                                    </button>
                                ) : null}
                                {loading ? (
                                    <span className="mr-combobox__spinner" aria-hidden="true">
                                        <Spinner size="sm" />
                                    </span>
                                ) : null}
                                {open && portalTarget
                                    ? createPortal(
                                          <div
                                              ref={listRef}
                                              id={`${inputId}-list`}
                                              className="mr-combobox__list"
                                              role="listbox"
                                              aria-label={
                                                  typeof label === 'string' ? label : undefined
                                              }
                                              data-size={resolvedSize}
                                              data-tone={resolvedTone}
                                              data-theme={activeTheme}
                                              data-brand={activeBrand}
                                              data-density={activeDensity}
                                              style={{
                                                  position: 'fixed',
                                                  top: `${position.top}px`,
                                                  left: `${position.left}px`,
                                                  width: `${position.width}px`,
                                              }}
                                          >
                                              {filteredItems.length ? (
                                                  filteredItems.map((item, index) => {
                                                      const isActive = index === activeIndex
                                                      const isSelected =
                                                          item.value === selectedValue
                                                      return (
                                                          <button
                                                              key={item.value}
                                                              type="button"
                                                              id={`${inputId}-item-${item.value}`}
                                                              role="option"
                                                              aria-selected={isSelected}
                                                              data-active={
                                                                  isActive ? true : undefined
                                                              }
                                                              data-selected={
                                                                  isSelected ? true : undefined
                                                              }
                                                              className={cn(
                                                                  'mr-combobox__item',
                                                                  isActive && 'is-active',
                                                                  isSelected && 'is-selected'
                                                              )}
                                                              onMouseEnter={() =>
                                                                  setActiveIndex(index)
                                                              }
                                                              onClick={() => selectItem(item)}
                                                          >
                                                              <span className="mr-combobox__item-label">
                                                                  {item.label}
                                                              </span>
                                                              {item.description ? (
                                                                  <span className="mr-combobox__item-description">
                                                                      {item.description}
                                                                  </span>
                                                              ) : null}
                                                          </button>
                                                      )
                                                  })
                                              ) : (
                                                  <div className="mr-combobox__empty">
                                                      {emptyLabel}
                                                  </div>
                                              )}
                                          </div>,
                                          portalTarget
                                      )
                                    : null}
                            </>
                        )}
                    </div>
                </Field>
            </FormControl>
        </ComboboxContext.Provider>
    )
}

function ComboboxInput({ ref, className, ...props }: ComboboxInputProps) {
    const ctx = useContext(ComboboxContext)
    return (
        <InputBase
            as="input"
            ref={ref}
            type="text"
            role="combobox"
            className={cn('mr-combobox__input', className)}
            aria-expanded={ctx?.open}
            aria-autocomplete="list"
            autoComplete="off"
            {...props}
        />
    )
}

function ComboboxList({ ref, className, children, ...props }: ComboboxListProps) {
    const ctx = useContext(ComboboxContext)
    const portalTarget = usePortalTarget()

    if (!ctx?.open || !portalTarget) return null

    return createPortal(
        <div
            ref={ref}
            id={`${ctx.inputId}-list`}
            className={cn('mr-combobox__list', className)}
            role="listbox"
            data-size={ctx.resolvedSize}
            data-tone={ctx.resolvedTone}
            data-theme={ctx.activeTheme}
            data-brand={ctx.activeBrand}
            data-density={ctx.activeDensity}
            style={{
                position: 'fixed',
                top: `${ctx.position.top}px`,
                left: `${ctx.position.left}px`,
                width: `${ctx.position.width}px`,
            }}
            {...props}
        >
            {children}
        </div>,
        portalTarget
    )
}

function ComboboxItemComponent({
    ref,
    value,
    label,
    description,
    className,
    children,
    onClick,
    ...props
}: ComboboxItemProps) {
    const ctx = useContext(ComboboxContext)
    const isSelected = ctx?.selectedValue === value

    return (
        <button
            ref={ref}
            type="button"
            role="option"
            aria-selected={isSelected}
            data-selected={isSelected ? true : undefined}
            className={cn('mr-combobox__item', isSelected && 'is-selected', className)}
            onClick={(e) => {
                ctx?.selectItem(value, label)
                onClick?.(e)
            }}
            {...props}
        >
            {children ?? (
                <>
                    <span className="mr-combobox__item-label">{label ?? value}</span>
                    {description ? (
                        <span className="mr-combobox__item-description">{description}</span>
                    ) : null}
                </>
            )}
        </button>
    )
}

function ComboboxItemLabel({ ref, className, children, ...props }: ComboboxItemLabelProps) {
    return (
        <span ref={ref} className={cn('mr-combobox__item-label', className)} {...props}>
            {children}
        </span>
    )
}

function ComboboxItemDescription({
    ref,
    className,
    children,
    ...props
}: ComboboxItemDescriptionProps) {
    return (
        <span ref={ref} className={cn('mr-combobox__item-description', className)} {...props}>
            {children}
        </span>
    )
}

function ComboboxEmpty({ ref, className, children, ...props }: ComboboxEmptyProps) {
    return (
        <div ref={ref} className={cn('mr-combobox__empty', className)} {...props}>
            {children}
        </div>
    )
}

Combobox.Input = ComboboxInput
Combobox.List = ComboboxList
Combobox.Item = ComboboxItemComponent
Combobox.ItemLabel = ComboboxItemLabel
Combobox.ItemDescription = ComboboxItemDescription
Combobox.Empty = ComboboxEmpty

export {
    ComboboxInput,
    ComboboxList,
    ComboboxItemComponent as ComboboxItem,
    ComboboxItemLabel,
    ComboboxItemDescription,
    ComboboxEmpty,
}

export type {
    ComboboxProps,
    ComboboxTone,
    ComboboxSize,
    ComboboxItemData,
    ComboboxInputProps,
    ComboboxListProps,
    ComboboxItemProps,
    ComboboxItemLabelProps,
    ComboboxItemDescriptionProps,
    ComboboxEmptyProps,
} from './Combobox.types'
