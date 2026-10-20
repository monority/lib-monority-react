import { Spinner } from '@/components/feedback/spinner/Spinner'
import { Field } from '@/components/forms/field/Field'
import { IconCheck } from '@/icons'
import { usePresence } from '@/internal/use-presence'
import { FormControl } from '@/primitives/form-control'
import { InputBase } from '@/primitives/input-base'
import {
    Children,
    type MouseEvent,
    type MutableRefObject,
    type ReactNode,
    isValidElement,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import type { SelectGroupProps, SelectOptionProps, SelectProps } from './Select.types'

export function SelectOption({ ref, children, ...props }: SelectOptionProps) {
    return (
        <option ref={ref} {...props}>
            {children}
        </option>
    )
}

export function SelectGroup({ ref, children, ...props }: SelectGroupProps) {
    return (
        <optgroup ref={ref} {...props}>
            {children}
        </optgroup>
    )
}

export function Select({
    tone,
    size,
    label,
    hint,
    error,
    id,
    className,
    invalid = false,
    disabled = false,
    loading = false,
    required = false,
    children,
    options,
    placeholder,
    ref,
    onMouseDown,
    onKeyDown,
    onChange,
    value,
    defaultValue,
    ...props
}: SelectProps) {
    const resolvedTone = tone ?? 'neutral'
    const resolvedSize = size ?? 'md'
    const isInvalid = invalid || Boolean(error)

    const [isOpen, setIsOpen] = useState(false)
    const [internalValue, setInternalValue] = useState<string | number | readonly string[]>(
        value ?? defaultValue ?? ''
    )
    const [highlightedIndex, setHighlightedIndex] = useState(-1)
    const wrapperRef = useRef<HTMLSpanElement>(null)
    const internalSelectRef = useRef<HTMLSelectElement | null>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const { isMounted, presenceProps, ref: presenceRef } = usePresence(isOpen, { durationMs: 150 })

    const currentValue = value !== undefined ? value : internalValue

    useEffect(() => {
        if (value !== undefined) {
            setInternalValue(value)
        }
    }, [value])

    const optionList = useMemo(() => {
        if (options && options.length > 0) {
            return options.map((opt) => ({
                value: String(opt.value),
                label: opt.label,
                disabled: opt.disabled,
            }))
        }
        const list: { value: string; label: ReactNode; disabled?: boolean }[] = []
        Children.forEach(children, (child) => {
            if (isValidElement(child)) {
                if (child.type === 'option' || child.type === SelectOption) {
                    const optProps = child.props as {
                        value?: string | number
                        children?: ReactNode
                        disabled?: boolean
                    }
                    if (optProps.value !== '' && optProps.value !== undefined) {
                        list.push({
                            value: String(optProps.value),
                            label: optProps.children ?? String(optProps.value),
                            disabled: optProps.disabled,
                        })
                    } else if (optProps.children) {
                        list.push({
                            value: String(optProps.children),
                            label: optProps.children,
                            disabled: optProps.disabled,
                        })
                    }
                } else if (child.type === 'optgroup' || child.type === SelectGroup) {
                    const groupProps = child.props as { children?: ReactNode }
                    Children.forEach(groupProps.children, (groupChild) => {
                        if (
                            isValidElement(groupChild) &&
                            (groupChild.type === 'option' || groupChild.type === SelectOption)
                        ) {
                            const optProps = groupChild.props as {
                                value?: string | number
                                children?: ReactNode
                                disabled?: boolean
                            }
                            if (optProps.value !== '' && optProps.value !== undefined) {
                                list.push({
                                    value: String(optProps.value),
                                    label: optProps.children ?? String(optProps.value),
                                    disabled: optProps.disabled,
                                })
                            } else if (optProps.children) {
                                list.push({
                                    value: String(optProps.children),
                                    label: optProps.children,
                                    disabled: optProps.disabled,
                                })
                            }
                        }
                    })
                }
            }
        })
        return list
    }, [options, children])

    useEffect(() => {
        if (!isOpen) return
        function handlePointerDown(e: MouseEvent | globalThis.MouseEvent) {
            if (!wrapperRef.current?.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        function handleKey(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                setIsOpen(false)
                internalSelectRef.current?.focus()
            }
        }
        window.addEventListener('pointerdown', handlePointerDown)
        window.addEventListener('keydown', handleKey)
        return () => {
            window.removeEventListener('pointerdown', handlePointerDown)
            window.removeEventListener('keydown', handleKey)
        }
    }, [isOpen])

    const handleSelectOption = (optVal: string) => {
        setInternalValue(optVal)
        setIsOpen(false)
        if (internalSelectRef.current) {
            internalSelectRef.current.value = optVal
            const event = new Event('change', { bubbles: true })
            internalSelectRef.current.dispatchEvent(event)
        }
        if (onChange) {
            const syntheticEvent = {
                target: { value: optVal },
                currentTarget: { value: optVal },
            } as React.ChangeEvent<HTMLSelectElement>
            onChange(syntheticEvent)
        }
        internalSelectRef.current?.focus()
    }

    const handleMouseDown = (e: MouseEvent<HTMLSelectElement>) => {
        onMouseDown?.(e)
        if (e.defaultPrevented || props.multiple || disabled || loading) return
        e.preventDefault()
        internalSelectRef.current?.focus()
        setIsOpen((prev) => !prev)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLSelectElement>) => {
        onKeyDown?.(e)
        if (e.defaultPrevented || props.multiple || disabled || loading) return

        if (!isOpen) {
            if (
                e.key === ' ' ||
                e.key === 'Enter' ||
                e.key === 'ArrowDown' ||
                e.key === 'ArrowUp'
            ) {
                e.preventDefault()
                setIsOpen(true)
                const currentIdx = optionList.findIndex(
                    (opt) => String(opt.value) === String(currentValue)
                )
                setHighlightedIndex(currentIdx >= 0 ? currentIdx : 0)
            }
        } else {
            if (e.key === 'ArrowDown') {
                e.preventDefault()
                setHighlightedIndex((prev) => {
                    const next = prev + 1 >= optionList.length ? 0 : prev + 1
                    return optionList[next]?.disabled
                        ? next + 1 >= optionList.length
                            ? 0
                            : next + 1
                        : next
                })
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setHighlightedIndex((prev) => {
                    const prevIdx = prev - 1 < 0 ? optionList.length - 1 : prev - 1
                    return optionList[prevIdx]?.disabled
                        ? prevIdx - 1 < 0
                            ? optionList.length - 1
                            : prevIdx - 1
                        : prevIdx
                })
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                if (
                    highlightedIndex >= 0 &&
                    optionList[highlightedIndex] &&
                    !optionList[highlightedIndex].disabled
                ) {
                    handleSelectOption(optionList[highlightedIndex].value)
                }
            } else if (e.key === 'Escape') {
                e.preventDefault()
                setIsOpen(false)
            }
        }
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setInternalValue(e.target.value)
        onChange?.(e)
    }

    return (
        <FormControl
            id={id}
            hint={Boolean(hint)}
            error={Boolean(error)}
            disabled={disabled}
            required={required}
            tone={resolvedTone}
            size={resolvedSize}
            invalid={isInvalid}
        >
            <Field className={className} label={label} hint={hint} error={error}>
                <span
                    ref={wrapperRef}
                    className="mr-select-wrapper"
                    data-size={resolvedSize}
                    data-disabled={disabled ? true : undefined}
                    data-loading={loading ? true : undefined}
                    data-invalid={isInvalid ? true : undefined}
                    data-multiple={props.multiple ? true : undefined}
                    data-open={isOpen ? true : undefined}
                >
                    <InputBase
                        as="select"
                        ref={(node: HTMLSelectElement | null) => {
                            internalSelectRef.current = node
                            if (typeof ref === 'function') {
                                ref(node)
                            } else if (ref && typeof ref === 'object' && 'current' in ref) {
                                ;(ref as MutableRefObject<HTMLSelectElement | null>).current = node
                            }
                        }}
                        className="mr-select"
                        disabled={disabled || loading}
                        aria-busy={loading ? 'true' : undefined}
                        aria-expanded={props.multiple ? undefined : isOpen}
                        value={currentValue}
                        onChange={handleSelectChange}
                        onMouseDown={handleMouseDown}
                        onKeyDown={handleKeyDown}
                        {...props}
                    >
                        {placeholder ? (
                            <option value="" disabled hidden>
                                {placeholder}
                            </option>
                        ) : null}
                        {options
                            ? options.map((opt) => (
                                  <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                                      {opt.label}
                                  </option>
                              ))
                            : null}
                        {children}
                    </InputBase>
                    {loading ? (
                        <span className="mr-select__spinner" aria-hidden="true">
                            <Spinner size="sm" />
                        </span>
                    ) : null}
                    {isMounted && !props.multiple && optionList.length > 0 && (
                        <div
                            ref={(node: HTMLDivElement | null) => {
                                dropdownRef.current = node
                                presenceRef(node)
                            }}
                            className="mr-select__dropdown"
                            role="listbox"
                            aria-label={label ? String(label) : 'Options'}
                            tabIndex={-1}
                            {...presenceProps}
                        >
                            {optionList.map((opt, idx) => {
                                const isSelected = String(opt.value) === String(currentValue)
                                const isHighlighted = idx === highlightedIndex
                                return (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        role="option"
                                        aria-selected={isSelected}
                                        data-selected={isSelected ? true : undefined}
                                        data-highlighted={isHighlighted ? true : undefined}
                                        disabled={opt.disabled}
                                        className="mr-select__dropdown-item"
                                        onClick={() => handleSelectOption(opt.value)}
                                        onMouseEnter={() => setHighlightedIndex(idx)}
                                    >
                                        <span className="mr-select__dropdown-label">
                                            {opt.label}
                                        </span>
                                        {isSelected && (
                                            <IconCheck
                                                size={14}
                                                className="mr-select__dropdown-check"
                                            />
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                    )}
                </span>
            </Field>
        </FormControl>
    )
}

Select.Option = SelectOption
Select.Group = SelectGroup

export type {
    SelectProps,
    SelectOptionProps,
    SelectGroupProps,
    SelectTone,
    SelectSize,
    SelectOption as SelectOptionData,
} from './Select.types'
