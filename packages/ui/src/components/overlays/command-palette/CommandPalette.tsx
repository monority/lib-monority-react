import { forwardRef, useId, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import { useBodyScrollLock } from '@/internal/use-body-scroll-lock'
import { useFocusTrap } from '@/internal/use-focus-trap'
import { usePortalTarget } from '@/internal/use-portal-target'
import { InputBase } from '@/primitives/input-base'
import type { CommandItem, CommandPaletteProps } from './CommandPalette.types'

const commandPaletteVariants = cva({
  base: 'mr-command-palette__panel',
  variants: {},
})

export const CommandPalette = forwardRef<HTMLDivElement, CommandPaletteProps>(
  function CommandPalette(
    {
      open,
      onClose,
      items = [],
      title = 'Command palette',
      placeholder = 'Rechercher une action…',
      emptyLabel = 'Aucun résultat.',
      className,
      ...props
    },
    ref,
  ) {
    const titleId = useId()
    const panelRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const portalTarget = usePortalTarget()

    const [query, setQuery] = useState('')
    const [activeIndex, setActiveIndex] = useState(0)

    useBodyScrollLock(open)
    useFocusTrap({
      active: open,
      containerRef: panelRef,
      initialFocusRef: inputRef,
      onEscape: () => closePalette(),
    })

    const filteredItems = useMemo(() => {
      const normalizedQuery = query.trim().toLowerCase()
      if (!normalizedQuery) return items

      return items.filter((item) =>
        [item.label, item.description, item.keywords, item.group]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery),
      )
    }, [items, query])

    const activeItem = filteredItems[activeIndex]

    function closePalette() {
      setQuery('')
      setActiveIndex(0)
      onClose?.()
    }

    function handleSelect(item: CommandItem) {
      item.onSelect?.()
      closePalette()
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
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

      if (event.key === 'Home') {
        event.preventDefault()
        setActiveIndex(0)
      }

      if (event.key === 'End') {
        event.preventDefault()
        setActiveIndex(filteredItems.length ? filteredItems.length - 1 : 0)
      }
    }

    if (!open || !portalTarget) return null

    return createPortal(
      <div
        ref={ref}
        className={cn('mr-modal', 'mr-command-palette', className)}
        data-open={open ? true : undefined}
        role="presentation"
        {...props}
      >
        <div
          className="mr-modal__backdrop"
          onClick={closePalette}
          aria-hidden="true"
        />
        <div
          ref={panelRef}
          className={cn(
            commandPaletteVariants(),
            'mr-modal__panel',
            'mr-command',
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          onKeyDown={handleKeyDown}
        >
          <div className="mr-command__layout">
            <header className="mr-command__header">
              <div className="mr-command__heading">
                <h3 className={cn('mr-title', 'mr-modal__title')} id={titleId}>
                  {title}
                </h3>
              </div>
              <InputBase
                as="input"
                ref={inputRef}
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

            <div className="mr-command__list" role="listbox" aria-label="Commandes">
              {filteredItems.length ? (
                filteredItems.map((item, index) => (
                  <button
                    key={item.value}
                    type="button"
                    role="option"
                    aria-selected={activeIndex === index}
                    className={cn(
                      'mr-command__item',
                      activeIndex === index && 'is-active',
                    )}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => handleSelect(item)}
                  >
                    <span className="mr-command__item-main">
                      {item.group ? (
                        <span className="mr-command__item-group">{item.group}</span>
                      ) : null}
                      <span className="mr-command__item-label">{item.label}</span>
                      {item.description ? (
                        <span className="mr-command__item-description">
                          {item.description}
                        </span>
                      ) : null}
                    </span>
                    {item.shortcut ? (
                      <span className="mr-command__shortcut">{item.shortcut}</span>
                    ) : null}
                  </button>
                ))
              ) : (
                <div className="mr-command__empty">{emptyLabel}</div>
              )}
            </div>
          </div>
        </div>
      </div>,
      portalTarget,
    )
  },
)
