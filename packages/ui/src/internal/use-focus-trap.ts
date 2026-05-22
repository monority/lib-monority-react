import { type RefObject, useEffect } from 'react'
import { canUseDOM, focusableSelector } from './dom'

interface UseFocusTrapOptions {
  active: boolean
  containerRef: RefObject<Element | null>
  initialFocusRef?: RefObject<HTMLElement | null>
  onEscape?: () => void
}

export function useFocusTrap({ active, containerRef, initialFocusRef, onEscape }: UseFocusTrapOptions) {
  useEffect(() => {
    if (!active || !canUseDOM()) return
    const previouslyFocusedElement = document.activeElement as HTMLElement | null
    const frameId = window.requestAnimationFrame(() => {
      initialFocusRef?.current?.focus()
      ;(containerRef.current as HTMLElement | null)?.focus()
    })
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') { event.preventDefault(); onEscape?.(); return }
      if (event.key !== 'Tab') return
      const els = [...(containerRef.current?.querySelectorAll(focusableSelector) ?? [])]
        .filter((el) => (el as HTMLElement).offsetParent !== null || el === document.activeElement)
      if (!els.length) { event.preventDefault(); (containerRef.current as HTMLElement)?.focus(); return }
      const first = els[0] as HTMLElement; const last = els[els.length - 1] as HTMLElement
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => { window.cancelAnimationFrame(frameId); document.removeEventListener('keydown', handleKeyDown); previouslyFocusedElement?.focus() }
  }, [active, containerRef, initialFocusRef, onEscape])
}
