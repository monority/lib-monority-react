import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { Field } from '@/components/forms/field/Field'
import { usePortalTarget } from '@/internal/use-portal-target'
import type { InputHTMLAttributes } from 'react'

interface ComboboxItem { value: string; label: string; description?: string; keywords?: string }

interface ComboboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'onChange'> { label?: React.ReactNode; hint?: React.ReactNode; error?: React.ReactNode; id?: string; className?: string; items?: ComboboxItem[]; value?: string; defaultValue?: string; onChange?: (value: string) => void; placeholder?: string; emptyLabel?: string; required?: boolean }

export function Combobox({ label, hint, error, id, className, items = [], value, defaultValue = '', onChange, placeholder = 'Rechercher...', emptyLabel = 'Aucun resultat', required = false, ...props }: ComboboxProps) {
  const generatedId = useId()
  const inputId = id || generatedId
  const hintId = hint ? `${inputId}-hint` : undefined
  const errorId = error ? `${inputId}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
  const rootRef = useRef<HTMLDivElement>(null); const inputRef = useRef<HTMLInputElement>(null); const listRef = useRef<HTMLDivElement>(null)
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue); const [query, setQuery] = useState(''); const [open, setOpen] = useState(false); const [activeIndex, setActiveIndex] = useState(0)
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 })
  const selectedValue = isControlled ? value : internalValue; const portalTarget = usePortalTarget()
  const selectedItem = useMemo(() => items.find((item) => item.value === selectedValue) ?? null, [items, selectedValue])
  const filteredItems = useMemo(() => { const nq = query.trim().toLowerCase(); if (!nq) return items; return items.filter((item) => `${item.label} ${item.keywords ?? ''}`.toLowerCase().includes(nq)) }, [items, query])

  useEffect(() => {
    if (!open) return
    const frameId = window.requestAnimationFrame(() => { const r = inputRef.current?.getBoundingClientRect(); if (r) setPosition({ top: r.bottom + 10, left: r.left, width: r.width }) })
    function pd(e: MouseEvent) { if (!rootRef.current?.contains(e.target as Node) && !listRef.current?.contains(e.target as Node)) { setOpen(false); setQuery(''); setActiveIndex(0) } }
    function vc() { const r = inputRef.current?.getBoundingClientRect(); if (r) setPosition({ top: r.bottom + 10, left: r.left, width: r.width }) }
    document.addEventListener('mousedown', pd); window.addEventListener('resize', vc); window.addEventListener('scroll', vc, true)
    return () => { window.cancelAnimationFrame(frameId); document.removeEventListener('mousedown', pd); window.removeEventListener('resize', vc); window.removeEventListener('scroll', vc, true) }
  }, [open])

  function selectItem(item: ComboboxItem) { if (!isControlled) setInternalValue(item.value); onChange?.(item.value); setQuery(''); setOpen(false); setActiveIndex(0) }

  return <Field className={className} htmlFor={inputId} label={label} hint={hint} error={error} required={required} hintId={hintId} errorId={errorId}>
    <div ref={rootRef} className="ui-combobox">
      <input ref={inputRef} className={cn('ui-input', error ? 'ui-input--error' : undefined)} id={inputId} type="text" role="combobox" aria-expanded={open} aria-controls={`${inputId}-list`} aria-activedescendant={filteredItems[activeIndex] ? `${inputId}-item-${filteredItems[activeIndex].value}` : undefined} autoComplete="off" value={open ? query : (selectedItem?.label ?? selectedValue)} onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); setOpen(true) }} onFocus={() => { setQuery(''); setOpen(true) }} aria-label={typeof label === 'string' ? label : undefined} aria-invalid={Boolean(error)} aria-describedby={describedBy} required={required} {...props} />
      {open && portalTarget ? createPortal(<div ref={listRef} id={`${inputId}-list`} className="ui-combobox__list" role="listbox" style={{ position: 'fixed', top: `${position.top}px`, left: `${position.left}px`, width: `${position.width}px` }}>
        {filteredItems.length ? filteredItems.map((item, index) => (
          <button key={item.value} type="button" id={`${inputId}-item-${item.value}`} role="option" aria-selected={activeIndex === index} className={cn('ui-combobox__item', activeIndex === index && 'is-active')} onMouseEnter={() => setActiveIndex(index)} onClick={() => selectItem(item)}>
            <span className="ui-combobox__item-label">{item.label}</span>
            {item.description ? <span className="ui-combobox__item-description">{item.description}</span> : null}
          </button>
        )) : <div className="ui-combobox__empty">{emptyLabel}</div>}
      </div>, portalTarget) : null}
    </div>
  </Field>
}
