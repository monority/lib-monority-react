import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { usePortalTarget } from '@/internal/use-portal-target'

type PopoverAlign = 'start' | 'center' | 'end'; type PopoverSide = 'top' | 'bottom' | 'left' | 'right'

interface PopoverProps { trigger: React.ReactNode | string; children: React.ReactNode; open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void; align?: PopoverAlign; side?: PopoverSide; className?: string; contentClassName?: string }

export function Popover({ trigger, children, open, defaultOpen = false, onOpenChange, align = 'start', side = 'bottom', className, contentClassName }: PopoverProps) {
  const instanceId = useId(); const rootRef = useRef<HTMLDivElement>(null); const triggerElementRef = useRef<Element | null>(null); const contentRef = useRef<HTMLDivElement>(null)
  const isControlled = open !== undefined; const [internalOpen, setInternalOpen] = useState(defaultOpen); const [position, setPosition] = useState({ top: 0, left: 0 })
  const isOpen = isControlled ? open : internalOpen; const portalTarget = usePortalTarget()
  const setOpenState = useCallback((nextOpen: boolean) => { if (!isControlled) setInternalOpen(nextOpen); onOpenChange?.(nextOpen) }, [isControlled, onOpenChange])
  const updatePosition = useCallback(() => {
    const el = triggerElementRef.current ?? rootRef.current?.querySelector('[data-ui-popover-trigger="true"]')
    if (!el) return; const rect = el.getBoundingClientRect(); const gap = 10; const top = side === 'top' ? rect.top - gap : rect.bottom + gap
    let left = rect.left; if (align === 'center') left = rect.left + rect.width / 2; if (align === 'end') left = rect.right
    setPosition({ top, left })
  }, [align, side])

  useEffect(() => {
    if (!isOpen) return
    const frameId = window.requestAnimationFrame(updatePosition)
    function pd(e: MouseEvent) { if (!rootRef.current?.contains(e.target as Node) && !contentRef.current?.contains(e.target as Node)) setOpenState(false) }
    function kd(e: KeyboardEvent) { if (e.key === 'Escape') { setOpenState(false); (rootRef.current?.querySelector('[data-ui-popover-trigger="true"] button, [data-ui-popover-trigger="true"] a, [data-ui-popover-trigger="true"] [tabindex]') as HTMLElement)?.focus() } }
    function vc() { updatePosition() }
    document.addEventListener('mousedown', pd); document.addEventListener('keydown', kd); window.addEventListener('resize', vc); window.addEventListener('scroll', vc, true)
    return () => { window.cancelAnimationFrame(frameId); document.removeEventListener('mousedown', pd); document.removeEventListener('keydown', kd); window.removeEventListener('resize', vc); window.removeEventListener('scroll', vc, true) }
  }, [isOpen, setOpenState, updatePosition])

  useEffect(() => { if (isOpen) contentRef.current?.focus() }, [isOpen])

  return <div ref={rootRef} className={cn('ui-popover', className)}>
    {typeof trigger === 'string' ? <button type="button" className="ui-popover__trigger" aria-expanded={isOpen} aria-controls={`${instanceId}-content`} onClick={(e) => { triggerElementRef.current = e.currentTarget; updatePosition(); setOpenState(!isOpen) }}>{trigger}</button>
    : <span className="ui-popover__anchor" data-ui-popover-trigger="true" aria-expanded={isOpen} aria-controls={`${instanceId}-content`} onClick={(e) => { triggerElementRef.current = (e.target as HTMLElement).closest('button, a, [tabindex]') ?? e.currentTarget; updatePosition(); setOpenState(!isOpen) }}>{trigger}</span>}
    {isOpen && portalTarget ? createPortal(<div ref={contentRef} id={`${instanceId}-content`} className={cn('ui-popover__content', `ui-popover__content--${side}`, `ui-popover__content--${align}`, contentClassName)} role="dialog" aria-modal="false" tabIndex={-1} style={{ top: `${position.top}px`, left: `${position.left}px` }}>{children}</div>, portalTarget) : null}
  </div>
}
