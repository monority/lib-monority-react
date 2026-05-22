import { useId, useState } from 'react'
import { cn } from '@/lib/cn'

interface AccordionItem { value?: string; label: React.ReactNode; content: React.ReactNode }
interface AccordionProps { items?: AccordionItem[]; defaultValue?: string | string[]; value?: string | string[]; onChange?: (value: string | string[] | null) => void; allowMultiple?: boolean; collapsible?: boolean; className?: string }

export function Accordion({ items = [], defaultValue, value, onChange, allowMultiple = false, collapsible = true, className }: AccordionProps) {
  const gid = useId(); const controlled = value !== undefined; const [iv, setIv] = useState<string | string[] | null>(() => { if (allowMultiple) return Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : []; return typeof defaultValue === 'string' ? defaultValue : null })
  const cv = controlled ? value : iv
  const isOpen = (v: string): boolean => { if (allowMultiple) return Array.isArray(cv) && cv.includes(v); return cv === v }
  const up = (nv: string | string[] | null) => { if (!controlled) setIv(nv); onChange?.(nv) }
  const toggle = (v: string) => { if (allowMultiple) { const vals = Array.isArray(cv) ? cv : []; up(vals.includes(v) ? vals.filter((x) => x !== v) : [...vals, v]); return } up(cv === v ? (collapsible ? null : v) : v) }
  return <div className={cn('ui-accordion', className)}>{items.map((item, index) => { const iv = item.value ?? `${gid}-item-${index}`; const tid = `${gid}-trigger-${index}`; const pid = `${gid}-panel-${index}`; const open = isOpen(iv)
    return <div key={iv} className={cn('ui-accordion__item', open && 'is-open')}><h3 className="ui-accordion__heading"><button id={tid} type="button" className="ui-accordion__trigger" aria-expanded={open} aria-controls={pid} onClick={() => toggle(iv)}><span className="ui-accordion__label">{item.label}</span><span className="ui-accordion__icon" aria-hidden="true">+</span></button></h3><div id={pid} role="region" aria-labelledby={tid} className="ui-accordion__panel" hidden={!open}><div className="ui-accordion__content">{item.content}</div></div></div> })}</div>
}
