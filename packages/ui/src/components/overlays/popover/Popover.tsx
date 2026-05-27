import { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { usePortalTarget } from '@/internal/use-portal-target'
import { cva } from '@/lib/variants'
import type { PopoverProps } from './Popover.types'

const popoverVariants = cva({
  base: 'mr-popover',
  variants: {
    align: {
      start: 'mr-popover--align-start',
      center: 'mr-popover--align-center',
      end: 'mr-popover--align-end',
    },
    side: {
      top: 'mr-popover--side-top',
      bottom: 'mr-popover--side-bottom',
      left: 'mr-popover--side-left',
      right: 'mr-popover--side-right',
    },
  },
  defaultVariants: { align: 'center', side: 'bottom' },
})

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  function Popover(
    { trigger, children, open: controlledOpen, defaultOpen = false, onOpenChange, align = 'center', side = 'bottom', className, contentClassName, ...props },
    ref,
  ) {
    const instanceId = useId(); const rootRef = useRef<HTMLDivElement>(null); const triggerElementRef = useRef<Element | null>(null); const contentRef = useRef<HTMLDivElement>(null)
    const isControlled = controlledOpen !== undefined; const [internalOpen, setInternalOpen] = useState(defaultOpen); const [position, setPosition] = useState({ top: 0, left: 0 })
    const isOpen = isControlled ? controlledOpen : internalOpen; const portalTarget = usePortalTarget()
    const setOpenState = useCallback((nextOpen: boolean) => { if (!isControlled) setInternalOpen(nextOpen); onOpenChange?.(nextOpen) }, [isControlled, onOpenChange])
    const updatePosition = useCallback(() => {
      const el = triggerElementRef.current ?? rootRef.current?.querySelector('[data-mr-popover-trigger="true"]')
      if (!el) return; const rect = el.getBoundingClientRect(); const gap = 10; const top = side === 'top' ? rect.top - gap : rect.bottom + gap
      let left = rect.left; if (align === 'center') left = rect.left + rect.width / 2; if (align === 'end') left = rect.right
      setPosition({ top, left })
    }, [align, side])

    useEffect(() => {
      if (!isOpen) return
      const frameId = window.requestAnimationFrame(updatePosition)
      function pd(e: MouseEvent) { if (!rootRef.current?.contains(e.target as Node) && !contentRef.current?.contains(e.target as Node)) setOpenState(false) }
      function kd(e: KeyboardEvent) { if (e.key === 'Escape') { setOpenState(false); (rootRef.current?.querySelector('[data-mr-popover-trigger="true"] button, [data-mr-popover-trigger="true"] a, [data-mr-popover-trigger="true"] [tabindex]') as HTMLElement)?.focus() } }
      function vc() { updatePosition() }
      document.addEventListener('mousedown', pd); document.addEventListener('keydown', kd); window.addEventListener('resize', vc); window.addEventListener('scroll', vc, true)
      return () => { window.cancelAnimationFrame(frameId); document.removeEventListener('mousedown', pd); document.removeEventListener('keydown', kd); window.removeEventListener('resize', vc); window.removeEventListener('scroll', vc, true) }
    }, [isOpen, setOpenState, updatePosition])

    useEffect(() => { if (isOpen) contentRef.current?.focus() }, [isOpen])

    return <div ref={ref} className={cn(popoverVariants({ align, side }), className)} data-open={isOpen ? true : undefined} data-align={align} data-side={side} {...props}>
      {typeof trigger === 'string' ? <button type="button" className="mr-popover__trigger" aria-expanded={isOpen} aria-controls={`${instanceId}-content`} onClick={(e) => { triggerElementRef.current = e.currentTarget; updatePosition(); setOpenState(!isOpen) }}>{trigger}</button>
      : <span className="mr-popover__anchor" data-mr-popover-trigger="true" aria-expanded={isOpen} aria-controls={`${instanceId}-content`} onClick={(e) => { triggerElementRef.current = (e.target as HTMLElement).closest('button, a, [tabindex]') ?? e.currentTarget; updatePosition(); setOpenState(!isOpen) }}>{trigger}</span>}
      {isOpen && portalTarget ? createPortal(<div ref={contentRef} id={`${instanceId}-content`} className={cn('mr-popover__content', `mr-popover__content--${side}`, `mr-popover__content--${align}`, contentClassName)} role="dialog" aria-modal="false" tabIndex={-1} style={{ top: `${position.top}px`, left: `${position.left}px` }}>{children}</div>, portalTarget) : null}
    </div>
  },
)
