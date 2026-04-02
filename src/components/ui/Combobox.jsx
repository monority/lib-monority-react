import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { Field } from './Field'

export function Combobox({
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
    required = false,
}) {
    const generatedId = useId()
    const inputId = id || generatedId
    const hintId = hint ? `${inputId}-hint` : undefined
    const errorId = error ? `${inputId}-error` : undefined
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
    const rootRef = useRef(null)
    const inputRef = useRef(null)
    const listRef = useRef(null)
    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = useState(defaultValue)
    const [query, setQuery] = useState('')
    const [open, setOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 })
    const selectedValue = isControlled ? value : internalValue

    const selectedItem = useMemo(
        () => items.find((item) => item.value === selectedValue) ?? null,
        [items, selectedValue],
    )

    const filteredItems = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase()

        if (!normalizedQuery) {
            return items
        }

        return items.filter((item) =>
            `${item.label} ${item.keywords ?? ''}`.toLowerCase().includes(normalizedQuery),
        )
    }, [items, query])

    useEffect(() => {
        if (!open) {
            return undefined
        }

        const frameId = window.requestAnimationFrame(() => {
            const rect = inputRef.current?.getBoundingClientRect()

            if (rect) {
                setPosition({
                    top: rect.bottom + 10,
                    left: rect.left,
                    width: rect.width,
                })
            }
        })

        function handlePointerDown(event) {
            if (
                !rootRef.current?.contains(event.target) &&
                !listRef.current?.contains(event.target)
            ) {
                setOpen(false)
                setQuery('')
                setActiveIndex(0)
            }
        }

        function handleViewportChange() {
            const rect = inputRef.current?.getBoundingClientRect()

            if (rect) {
                setPosition({
                    top: rect.bottom + 10,
                    left: rect.left,
                    width: rect.width,
                })
            }
        }

        document.addEventListener('mousedown', handlePointerDown)
        window.addEventListener('resize', handleViewportChange)
        window.addEventListener('scroll', handleViewportChange, true)

        return () => {
            window.cancelAnimationFrame(frameId)
            document.removeEventListener('mousedown', handlePointerDown)
            window.removeEventListener('resize', handleViewportChange)
            window.removeEventListener('scroll', handleViewportChange, true)
        }
    }, [open])

    function selectItem(item) {
        if (!isControlled) {
            setInternalValue(item.value)
        }

        onChange?.(item.value)
        setQuery('')
        setOpen(false)
        setActiveIndex(0)
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
            <div ref={rootRef} className="ui-combobox">
                <input
                    ref={inputRef}
                    className={cn('ui-input', error && 'ui-input--error')}
                    id={inputId}
                    type="text"
                    role="combobox"
                    aria-expanded={open}
                    aria-controls={`${inputId}-listbox`}
                    aria-invalid={Boolean(error)}
                    aria-describedby={describedBy}
                    autoComplete="off"
                    value={open ? query : selectedItem?.label ?? query}
                    placeholder={placeholder}
                    required={required}
                    onFocus={() => setOpen(true)}
                    onChange={(event) => {
                        setQuery(event.target.value)
                        setOpen(true)
                        setActiveIndex(0)
                    }}
                    onKeyDown={(event) => {
                        if (event.key === 'ArrowDown') {
                            event.preventDefault()
                            setOpen(true)
                            setActiveIndex((current) =>
                                filteredItems.length ? (current + 1) % filteredItems.length : 0,
                            )
                        }

                        if (event.key === 'ArrowUp') {
                            event.preventDefault()
                            setOpen(true)
                            setActiveIndex((current) =>
                                filteredItems.length
                                    ? (current - 1 + filteredItems.length) % filteredItems.length
                                    : 0,
                            )
                        }

                        if (event.key === 'Enter' && open && filteredItems[activeIndex]) {
                            event.preventDefault()
                            selectItem(filteredItems[activeIndex])
                        }

                        if (event.key === 'Escape') {
                            event.preventDefault()
                            setOpen(false)
                            setQuery('')
                            setActiveIndex(0)
                        }
                    }}
                />
                {open
                    ? createPortal(
                          <div
                              ref={listRef}
                              id={`${inputId}-listbox`}
                              className="ui-combobox__list"
                              role="listbox"
                              style={{
                                  top: `${position.top}px`,
                                  left: `${position.left}px`,
                                  width: `${position.width}px`,
                              }}
                          >
                              {filteredItems.length ? (
                                  filteredItems.map((item, index) => (
                                      <button
                                          key={item.value}
                                          type="button"
                                          role="option"
                                          aria-selected={selectedValue === item.value}
                                          className={cn(
                                              'ui-combobox__item',
                                              activeIndex === index && 'is-active',
                                          )}
                                          onMouseEnter={() => setActiveIndex(index)}
                                          onClick={() => selectItem(item)}
                                      >
                                          <span className="ui-combobox__item-label">{item.label}</span>
                                          {item.description ? (
                                              <span className="ui-combobox__item-description">
                                                  {item.description}
                                              </span>
                                          ) : null}
                                      </button>
                                  ))
                              ) : (
                                  <div className="ui-combobox__empty">{emptyLabel}</div>
                              )}
                          </div>,
                          document.body,
                      )
                    : null}
            </div>
        </Field>
    )
}
