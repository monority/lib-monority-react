import { useId } from 'react'
import { cn } from '@/lib/cn'

interface TabItem { value: string; label: string }
interface TabsProps { items: TabItem[]; value: string; onChange: (value: string) => void; className?: string; ariaLabel?: string }

export function Tabs({ items, value, onChange, className, ariaLabel = 'Tabs' }: TabsProps) {
  const instanceId = useId()
  function getNextIndex(ci: number, d: number) { return (ci + d + items.length) % items.length }
  function kd(e: React.KeyboardEvent, i: number) {
    if (!items.length) return
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); onChange(items[getNextIndex(i, 1)].value) }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); onChange(items[getNextIndex(i, -1)].value) }
    if (e.key === 'Home') { e.preventDefault(); onChange(items[0].value) }
    if (e.key === 'End') { e.preventDefault(); onChange(items[items.length - 1].value) }
  }
  return <div className={cn('ui-tabs', className)} role="tablist" aria-label={ariaLabel}>
    {items.map((item, index) => {
      const isActive = item.value === value; const tabId = `${instanceId}-tab-${index}`; const panelId = `${instanceId}-panel-${index}`
      return <button key={item.value} id={tabId} type="button" className={cn('ui-tabs__tab', isActive && 'is-active')} role="tab" aria-selected={isActive} aria-controls={panelId} tabIndex={isActive ? 0 : -1} onClick={() => onChange(item.value)} onKeyDown={(e) => kd(e, index)}>{item.label}</button>
    })}
  </div>
}
