import { useId, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { useBodyScrollLock } from '@/internal/use-body-scroll-lock'
import { useFocusTrap } from '@/internal/use-focus-trap'
import { usePortalTarget } from '@/internal/use-portal-target'

interface CommandItem { value: string; label: string; description?: string; keywords?: string; group?: string; shortcut?: string; onSelect?: () => void }
interface CommandPaletteProps { open: boolean; onClose?: () => void; items?: CommandItem[]; title?: string; placeholder?: string; emptyLabel?: string }

export function CommandPalette({ open, onClose, items = [], title = 'Command palette', placeholder = 'Rechercher une action...', emptyLabel = 'Aucun resultat.' }: CommandPaletteProps) {
  const titleId = useId(); const panelRef = useRef<HTMLDivElement>(null); const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState(''); const [activeIndex, setActiveIndex] = useState(0); const portalTarget = usePortalTarget()
  useBodyScrollLock(open); useFocusTrap({ active: open, containerRef: panelRef, initialFocusRef: inputRef, onEscape: () => closePalette() })
  const filteredItems = useMemo(() => { const nq = query.trim().toLowerCase(); if (!nq) return items; return items.filter((item) => [item.label, item.keywords, item.group].filter(Boolean).join(' ').toLowerCase().includes(nq)) }, [items, query])
  function closePalette() { setQuery(''); setActiveIndex(0); onClose?.() }
  if (!open || !portalTarget) return null
  const activeItem = filteredItems[activeIndex]
  function handleSelect(item: CommandItem) { item.onSelect?.(); closePalette() }
  return createPortal(<div className="ui-modal" role="presentation"><div className="ui-modal__backdrop" onClick={closePalette} aria-hidden="true" /><div ref={panelRef} className={cn('ui-modal__panel', 'ui-command')} role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1} onKeyDown={(e) => { if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex((c) => filteredItems.length ? (c + 1) % filteredItems.length : 0) } if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex((c) => filteredItems.length ? (c - 1 + filteredItems.length) % filteredItems.length : 0) } if (e.key === 'Enter' && activeItem) { e.preventDefault(); handleSelect(activeItem) } }}>
    <div className="stack-m"><header className="stack-s"><h3 className={cn('ui-title', 'ui-modal__title')} id={titleId}>{title}</h3><input ref={inputRef} className="ui-input ui-command__input" type="text" value={query} onChange={(e) => { setQuery(e.target.value); setActiveIndex(0) }} placeholder={placeholder} /></header>
    <div className="ui-command__list" role="listbox" aria-label="Commandes">{filteredItems.length ? filteredItems.map((item, index) => (<button key={item.value} type="button" role="option" aria-selected={activeIndex === index} className={cn('ui-command__item', activeIndex === index && 'is-active')} onMouseEnter={() => setActiveIndex(index)} onClick={() => handleSelect(item)}><span className="ui-command__item-main"><span className="ui-command__item-label">{item.label}</span>{item.description ? <span className="ui-command__item-description">{item.description}</span> : null}</span>{item.shortcut ? <span className="ui-command__shortcut">{item.shortcut}</span> : null}</button>)) : <div className="ui-command__empty">{emptyLabel}</div>}</div></div>
  </div></div>, portalTarget)
}
