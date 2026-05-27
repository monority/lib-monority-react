import { forwardRef, useEffect, useId, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import { Field } from '@/components/forms/field/Field'
import { usePortalTarget } from '@/internal/use-portal-target'
import type { ComboboxProps, ComboboxItem } from './Combobox.types'

const comboboxVariants = cva({
  base: 'mr-combobox',
  variants: {
    tone: {
      neutral: 'mr-combobox--neutral',
      accent: 'mr-combobox--accent',
      danger: 'mr-combobox--danger',
    },
    size: {
      sm: 'mr-combobox--sm',
      md: 'mr-combobox--md',
      lg: 'mr-combobox--lg',
    },
  },
  defaultVariants: { tone: 'neutral', size: 'md' },
})

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  function Combobox(
    {
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
      ...props
    },
    ref,
  ) {
    const generatedId = useId()
    const inputId = id || generatedId
    const hintId = hint ? `${inputId}-hint` : undefined
    const errorId = error ? `${inputId}-error` : undefined
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

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

    const resolvedTone = tone ?? 'neutral'
    const resolvedSize = size ?? 'md'
    const isInvalid = invalid || Boolean(error)

    const selectedItem = useMemo(
      () => items.find((item) => item.value === selectedValue) ?? null,
      [items, selectedValue],
    )

    const filteredItems = useMemo(() => {
      const nq = query.trim().toLowerCase()
      if (!nq) return items
      return items.filter((item) =>
        `${item.label} ${item.keywords ?? ''}`.toLowerCase().includes(nq),
      )
    }, [items, query])

    useEffect(() => {
      if (!open) return
      const frameId = window.requestAnimationFrame(() => {
        const r = inputRef.current?.getBoundingClientRect()
        if (r) setPosition({ top: r.bottom + 10, left: r.left, width: r.width })
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
        if (r) setPosition({ top: r.bottom + 10, left: r.left, width: r.width })
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

    function selectItem(item: ComboboxItem) {
      if (!isControlled) setInternalValue(item.value)
      onChange?.(item.value)
      setQuery('')
      setOpen(false)
      setActiveIndex(0)
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

    return (
      <Field
        className={className}
        htmlFor={inputId}
        label={label}
        hint={hint}
        error={error}
        required={required}
        hintId={hintId}
        errorId={errorId}
      >
        <div
          ref={rootRef}
          className={comboboxVariants({ tone: resolvedTone, size: resolvedSize })}
          data-tone={resolvedTone}
          data-size={resolvedSize}
          data-open={open ? true : undefined}
          data-invalid={isInvalid ? true : undefined}
          data-disabled={disabled ? true : undefined}
          data-required={required ? true : undefined}
        >
          <input
            ref={(node) => {
              inputRef.current = node
              if (typeof ref === 'function') ref(node)
              else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node
            }}
            className={cn(
              'mr-combobox__input',
              isInvalid && 'mr-combobox__input--invalid',
              disabled && 'mr-combobox__input--disabled',
            )}
            id={inputId}
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-controls={`${inputId}-list`}
            aria-activedescendant={
              filteredItems[activeIndex]
                ? `${inputId}-item-${filteredItems[activeIndex].value}`
                : undefined
            }
            aria-autocomplete="list"
            autoComplete="off"
            value={
              open
                ? query
                : selectedItem?.label ?? selectedValue
            }
            onChange={(e) => {
              setQuery(e.target.value)
              setActiveIndex(0)
              setOpen(true)
            }}
            onFocus={() => {
              setQuery('')
              setOpen(true)
            }}
            onKeyDown={handleKeyDown}
            aria-label={typeof label === 'string' ? label : undefined}
            aria-invalid={isInvalid || undefined}
            aria-describedby={describedBy}
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            {...props}
          />
          {open && portalTarget
            ? createPortal(
                <div
                  ref={listRef}
                  id={`${inputId}-list`}
                  className="mr-combobox__list"
                  role="listbox"
                  aria-label={typeof label === 'string' ? label : undefined}
                  style={{
                    position: 'fixed',
                    top: `${position.top}px`,
                    left: `${position.left}px`,
                    width: `${position.width}px`,
                  }}
                >
                  {filteredItems.length
                    ? filteredItems.map((item, index) => {
                        const isActive = index === activeIndex
                        const isSelected = item.value === selectedValue
                        return (
                          <button
                            key={item.value}
                            type="button"
                            id={`${inputId}-item-${item.value}`}
                            role="option"
                            aria-selected={isSelected}
                            data-active={isActive ? true : undefined}
                            data-selected={isSelected ? true : undefined}
                            className={cn(
                              'mr-combobox__item',
                              isActive && 'is-active',
                              isSelected && 'is-selected',
                            )}
                            onMouseEnter={() => setActiveIndex(index)}
                            onClick={() => selectItem(item)}
                          >
                            <span className="mr-combobox__item-label">{item.label}</span>
                            {item.description ? (
                              <span className="mr-combobox__item-description">
                                {item.description}
                              </span>
                            ) : null}
                          </button>
                        )
                      })
                    : <div className="mr-combobox__empty">{emptyLabel}</div>}
                </div>,
                portalTarget,
              )
            : null}
        </div>
      </Field>
    )
  },
)
