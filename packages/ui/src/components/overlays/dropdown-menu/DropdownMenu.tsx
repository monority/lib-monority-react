import { forwardRef, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { OVERLAY_OFFSET } from '@/lib/constants'
import { usePortalTarget } from '@/internal/use-portal-target'
import { cva } from '@/lib/variants'
import type { DropdownMenuProps, DropdownMenuItem } from './DropdownMenu.types'

const dropdownMenuVariants = cva({
  base: 'mr-dropdown',
  variants: {
    align: {
      start: 'mr-dropdown--align-start',
      center: 'mr-dropdown--align-center',
      end: 'mr-dropdown--align-end',
    },
    side: {
      top: 'mr-dropdown--side-top',
      bottom: 'mr-dropdown--side-bottom',
      left: 'mr-dropdown--side-left',
      right: 'mr-dropdown--side-right',
    },
  },
  defaultVariants: { align: 'start', side: 'bottom' },
})

function isActionableItem(item: DropdownMenuItem) { return item.type !== 'separator' && !item.disabled }

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  function DropdownMenu(
    { trigger, items = [], open: controlledOpen, defaultOpen = false, onOpenChange, align = 'end', side = 'bottom', className, contentClassName, ...props },
    ref,
  ) {
    const instanceId = useId(); const rootRef = useRef<HTMLDivElement>(null); const triggerElementRef = useRef<Element | null>(null); const contentRef = useRef<HTMLDivElement>(null)
    const isControlled = controlledOpen !== undefined; const [internalOpen, setInternalOpen] = useState(defaultOpen); const [position, setPosition] = useState({ top: 0, left: 0 })
    const isOpen = isControlled ? controlledOpen : internalOpen; const portalTarget = usePortalTarget()
    // Never paint at the (0,0) initial position: hidden until measured.
    const [positioned, setPositioned] = useState(false)
    const setOpenState = useCallback((nextOpen: boolean) => { if (!isControlled) setInternalOpen(nextOpen); onOpenChange?.(nextOpen) }, [isControlled, onOpenChange])
    const actionableItems = useMemo(() => items.filter(isActionableItem), [items])
    const updatePosition = useCallback(() => {
      const el = triggerElementRef.current ?? rootRef.current?.querySelector('[data-mr-dropdown-trigger="true"]')
      if (!el) return; const rect = el.getBoundingClientRect(); const gap = OVERLAY_OFFSET; const top = side === 'top' ? rect.top - gap : rect.bottom + gap
      let left = rect.left; if (align === 'center') left = rect.left + rect.width / 2; if (align === 'end') left = rect.right
      setPosition({ top, left })
      setPositioned(true)
    }, [align, side])
    function focusItem(direction = 1, targetValue?: string) {
      const menuItems = contentRef.current?.querySelectorAll('[role="menuitem"]')
      if (!menuItems?.length) return
      if (targetValue) { (Array.from(menuItems).find((item) => (item as HTMLElement).dataset.value === targetValue) as HTMLElement)?.focus(); return }
      const activeIndex = Array.from(menuItems).findIndex((item) => item === document.activeElement)
      const nextIndex = activeIndex === -1 ? (direction > 0 ? 0 : menuItems.length - 1) : (activeIndex + direction + menuItems.length) % menuItems.length
      ;(menuItems[nextIndex] as HTMLElement)?.focus()
    }
    useEffect(() => {
      if (!isOpen) { setPositioned(false); return }
      const frameId = window.requestAnimationFrame(updatePosition)
      function pd(e: MouseEvent) { if (!rootRef.current?.contains(e.target as Node) && !contentRef.current?.contains(e.target as Node)) setOpenState(false) }
      function kd(e: KeyboardEvent) { if (e.key === 'Escape') { setOpenState(false); (rootRef.current?.querySelector('[data-mr-dropdown-trigger="true"] button, [data-mr-dropdown-trigger="true"] a, [data-mr-dropdown-trigger="true"] [tabindex]') as HTMLElement)?.focus() } }
      function vc() { updatePosition() }
      document.addEventListener('mousedown', pd); document.addEventListener('keydown', kd); window.addEventListener('resize', vc); window.addEventListener('scroll', vc, true)
      return () => { window.cancelAnimationFrame(frameId); document.removeEventListener('mousedown', pd); document.removeEventListener('keydown', kd); window.removeEventListener('resize', vc); window.removeEventListener('scroll', vc, true) }
    }, [isOpen, setOpenState, updatePosition])
    useEffect(() => { if (isOpen) focusItem(1, actionableItems[0]?.value) }, [actionableItems, isOpen])
    return <div ref={ref} className={cn(dropdownMenuVariants({ align, side }), className)} data-open={isOpen ? true : undefined} data-align={align} data-side={side} {...props}>
      {typeof trigger === 'string' ? <button type="button" className="mr-dropdown__trigger" data-mr-dropdown-trigger="true" aria-expanded={isOpen} aria-controls={`${instanceId}-content`} aria-haspopup="menu" onClick={(e) => { triggerElementRef.current = e.currentTarget; updatePosition(); setOpenState(!isOpen) }} onKeyDown={(e) => { if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); updatePosition(); setOpenState(true) } }}>{trigger}</button>
      : <span className="mr-dropdown__anchor" data-mr-dropdown-trigger="true" aria-expanded={isOpen} aria-controls={`${instanceId}-content`} aria-haspopup="menu" onClick={(e) => { triggerElementRef.current = (e.target as HTMLElement).closest('button, a, [tabindex]') ?? e.currentTarget; updatePosition(); setOpenState(!isOpen) }} onKeyDown={(e) => { if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); updatePosition(); setOpenState(true) } }}>{trigger}</span>}
      {isOpen && portalTarget ? createPortal(<div ref={contentRef} id={`${instanceId}-content`} className={cn('mr-dropdown__content', `mr-dropdown__content--${side}`, `mr-dropdown__content--${align}`, contentClassName)} role="menu" aria-orientation="vertical" style={{ top: `${position.top}px`, left: `${position.left}px`, visibility: positioned ? undefined : 'hidden' }} onKeyDown={(e) => { if (e.key === 'ArrowDown') { e.preventDefault(); focusItem(1) } if (e.key === 'ArrowUp') { e.preventDefault(); focusItem(-1) } if (e.key === 'Home') { e.preventDefault(); focusItem(1, actionableItems[0]?.value) } if (e.key === 'End') { e.preventDefault(); focusItem(-1, actionableItems[actionableItems.length - 1]?.value) } }}>
        {items.map((item, index) => item.type === 'separator' ? <div key={`${instanceId}-sep-${index}`} className="mr-dropdown__separator" role="separator" /> : <button key={item.value} type="button" role="menuitem" data-value={item.value} className={cn('mr-dropdown__item', item.danger && 'is-danger')} disabled={item.disabled} onClick={() => { item.onSelect?.(item.value); setOpenState(false) }}>{item.label}</button>)}
      </div>, portalTarget) : null}
    </div>
  },
)
