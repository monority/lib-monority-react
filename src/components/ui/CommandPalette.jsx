import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'

export function CommandPalette({
    open,
    onClose,
    items = [],
    title = 'Command palette',
    placeholder = 'Rechercher une action...',
    emptyLabel = 'Aucun resultat.',
}) {
    const titleId = useId()
    const inputRef = useRef(null)
    const [query, setQuery] = useState('')
    const [activeIndex, setActiveIndex] = useState(0)

    const filteredItems = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase()

        if (!normalizedQuery) {
            return items
        }

        return items.filter((item) => {
            const haystack = [item.label, item.keywords, item.group]
                .filter(Boolean)
                .join(' ')
                .toLowerCase()

            return haystack.includes(normalizedQuery)
        })
    }, [items, query])

    function closePalette() {
        setQuery('')
        setActiveIndex(0)
        onClose?.()
    }

    useEffect(() => {
        if (!open) {
            return undefined
        }

        const { overflow } = document.body.style
        document.body.style.overflow = 'hidden'

        const frameId = window.requestAnimationFrame(() => {
            inputRef.current?.focus()
        })

        return () => {
            window.cancelAnimationFrame(frameId)
            document.body.style.overflow = overflow
        }
    }, [open])

    if (!open) {
        return null
    }

    const activeItem = filteredItems[activeIndex]

    function handleSelect(item) {
        item.onSelect?.()
        closePalette()
    }

    return createPortal(
        <div className="ui-modal" role="presentation">
            <div className="ui-modal__backdrop" onClick={closePalette} aria-hidden="true" />
            <div
                className={cn('ui-modal__panel', 'ui-command')}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
                onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                        event.preventDefault()
                        closePalette()
                    }

                    if (event.key === 'ArrowDown') {
                        event.preventDefault()
                        setActiveIndex((current) =>
                            filteredItems.length ? (current + 1) % filteredItems.length : 0,
                        )
                    }

                    if (event.key === 'ArrowUp') {
                        event.preventDefault()
                        setActiveIndex((current) =>
                            filteredItems.length
                                ? (current - 1 + filteredItems.length) % filteredItems.length
                                : 0,
                        )
                    }

                    if (event.key === 'Enter' && activeItem) {
                        event.preventDefault()
                        handleSelect(activeItem)
                    }
                }}
            >
                <div className="stack-m">
                    <header className="stack-s">
                        <h3 className={cn('ui-title', 'ui-modal__title')} id={titleId}>
                            {title}
                        </h3>
                        <input
                            ref={inputRef}
                            className="ui-input ui-command__input"
                            type="text"
                            value={query}
                            onChange={(event) => {
                                setQuery(event.target.value)
                                setActiveIndex(0)
                            }}
                            placeholder={placeholder}
                        />
                    </header>

                    <div className="ui-command__list" role="listbox" aria-label="Commandes">
                        {filteredItems.length ? (
                            filteredItems.map((item, index) => (
                                <button
                                    key={item.value}
                                    type="button"
                                    role="option"
                                    aria-selected={activeIndex === index}
                                    className={cn(
                                        'ui-command__item',
                                        activeIndex === index && 'is-active',
                                    )}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onClick={() => handleSelect(item)}
                                >
                                    <span className="ui-command__item-main">
                                        <span className="ui-command__item-label">{item.label}</span>
                                        {item.description ? (
                                            <span className="ui-command__item-description">
                                                {item.description}
                                            </span>
                                        ) : null}
                                    </span>
                                    {item.shortcut ? (
                                        <span className="ui-command__shortcut">{item.shortcut}</span>
                                    ) : null}
                                </button>
                            ))
                        ) : (
                            <div className="ui-command__empty">{emptyLabel}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.body,
    )
}
