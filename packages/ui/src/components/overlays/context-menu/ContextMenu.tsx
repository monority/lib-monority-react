import { forwardRef, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { usePortalTarget } from '@/internal/use-portal-target'
import type { ContextMenuProps, ContextMenuItem } from './ContextMenu.types'

function isActionableItem(item: ContextMenuItem) { return item.type !== 'separator' && !item.disabled }

export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  function ContextMenu(
    { trigger, items = [], open: controlledOpen, defaultOpen = false, onOpenChange, className, contentClassName, ...props },
    ref,
  ) {
    const instanceId = useId()
    const rootRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const isControlled = controlledOpen !== undefined
    const [internalOpen, setInternalOpen] = useState(defaultOpen)
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const isOpen = isControlled ? controlledOpen : internalOpen
    const portalTarget = usePortalTarget()

    const setOpenState = useCallback((nextOpen: boolean) => {
      if (!isControlled) setInternalOpen(nextOpen)
      onOpenChange?.(nextOpen)
    }, [isControlled, onOpenChange])

    const actionableItems = useMemo(() => items.filter(isActionableItem), [items])

    function focusItem(direction = 1, targetValue?: string) {
      const menuItems = contentRef.current?.querySelectorAll('[role="menuitem"]')
      if (!menuItems?.length) return
      if (targetValue) {
        ;(Array.from(menuItems).find((item) => (item as HTMLElement).dataset.value === targetValue) as HTMLElement)?.focus()
        return
      }
      const activeIndex = Array.from(menuItems).findIndex((item) => item === document.activeElement)
      const nextIndex = activeIndex === -1 ? (direction > 0 ? 0 : menuItems.length - 1) : (activeIndex + direction + menuItems.length) % menuItems.length
      ;(menuItems[nextIndex] as HTMLElement)?.focus()
    }

    const handleContextMenu = useCallback((e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setPosition({ top: e.clientY, left: e.clientX })
      setOpenState(true)
    }, [setOpenState])

    useEffect(() => {
      if (!isOpen) return

      function handleClickOutside(e: MouseEvent) {
        if (!rootRef.current?.contains(e.target as Node) && !contentRef.current?.contains(e.target as Node)) {
          setOpenState(false)
        }
      }

      function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Escape') {
          setOpenState(false)
          ;(rootRef.current?.querySelector('[tabindex]') as HTMLElement)?.focus()
        }
      }

      function handleResize() {
        setOpenState(false)
      }

      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
      window.addEventListener('resize', handleResize)

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleKeyDown)
        window.removeEventListener('resize', handleResize)
      }
    }, [isOpen, setOpenState])

    useEffect(() => {
      if (isOpen) {
        focusItem(1, actionableItems[0]?.value)
      }
    }, [actionableItems, isOpen])

    useEffect(() => {
      if (isOpen) {
        const original = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = original }
      }
    }, [isOpen])

    return (
      <div
        ref={ref}
        className={cn('mr-context-menu', className)}
        data-open={isOpen ? true : undefined}
        {...props}
      >
        <div
          className="mr-context-menu__trigger"
          onContextMenu={handleContextMenu}
          tabIndex={0}
          role="button"
          aria-haspopup="menu"
          aria-expanded={isOpen}
        >
          {trigger}
        </div>

        {isOpen && portalTarget
          ? createPortal(
            <div
              ref={contentRef}
              id={`${instanceId}-content`}
              className={cn('mr-context-menu__content', contentClassName)}
              role="menu"
              aria-orientation="vertical"
              style={{ top: `${position.top}px`, left: `${position.left}px` }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') { e.preventDefault(); focusItem(1) }
                if (e.key === 'ArrowUp') { e.preventDefault(); focusItem(-1) }
                if (e.key === 'Home') { e.preventDefault(); focusItem(1, actionableItems[0]?.value) }
                if (e.key === 'End') { e.preventDefault(); focusItem(-1, actionableItems[actionableItems.length - 1]?.value) }
              }}
            >
              {items.map((item, index) =>
                item.type === 'separator'
                  ? <div key={`${instanceId}-sep-${index}`} className="mr-context-menu__separator" role="separator" />
                  : (
                    <button
                      key={item.value}
                      type="button"
                      role="menuitem"
                      data-value={item.value}
                      className={cn('mr-context-menu__item', item.danger && 'is-danger')}
                      disabled={item.disabled}
                      onClick={() => { item.onSelect?.(item.value); setOpenState(false) }}
                    >
                      {item.label}
                    </button>
                  )
              )}
            </div>,
            portalTarget,
          )
          : null}
      </div>
    )
  },
)
