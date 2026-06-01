import { forwardRef, useState, useRef, useEffect, useCallback } from 'react'
import { cn } from '@/lib/cn'
import type { MenubarProps, MenuItem } from './Menubar.types'

export const Menubar = forwardRef<HTMLDivElement, MenubarProps>(
  function Menubar({ items, defaultActive, className, ...props }, ref) {
    const [activeMenu, setActiveMenu] = useState<string | null>(defaultActive ?? null)
    const menubarRef = useRef<HTMLDivElement>(null)

    const handleClickOutside = useCallback((e: MouseEvent) => {
      if (menubarRef.current && !menubarRef.current.contains(e.target as Node)) {
        setActiveMenu(null)
      }
    }, [])

    const handleEscape = useCallback((e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null)
      }
    }, [])

    useEffect(() => {
      if (activeMenu) {
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEscape)
      }
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleEscape)
      }
    }, [activeMenu, handleClickOutside, handleEscape])

    const toggleMenu = (label: string) => {
      setActiveMenu((prev) => (prev === label ? null : label))
    }

    const handleItemClick = (menuLabel: string, item: MenuItem) => {
      if (item.disabled) return
      item.onClick?.()
      setActiveMenu(null)
    }

    return (
      <div
        ref={(node) => {
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
          ;(menubarRef as React.MutableRefObject<HTMLDivElement | null>).current = node
        }}
        role="menubar"
        className={cn('mr-menubar', className)}
        {...props}
      >
        {items.map((menu) => {
          const isOpen = activeMenu === menu.label
          return (
            <div
              key={menu.label}
              className={cn('mr-menubar__menu-wrapper', isOpen && 'mr-menubar__menu-wrapper--active')}
              data-active={isOpen || undefined}
            >
              <button
                type="button"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={isOpen}
                disabled={menu.disabled}
                className="mr-menubar__trigger"
                onClick={() => !menu.disabled && toggleMenu(menu.label)}
              >
                {menu.label}
              </button>
              {isOpen && (
                <div className="mr-menubar__menu" role="menu" aria-label={menu.label}>
                  {menu.items.map((item, i) => {
                    if (item.separator) {
                      return <div key={`sep-${i}`} className="mr-menubar__separator" role="separator" />
                    }
                    return (
                      <button
                        key={i}
                        type="button"
                        role="menuitem"
                        disabled={item.disabled}
                        onClick={() => handleItemClick(menu.label, item)}
                        className={cn(
                          'mr-menubar__item',
                          item.variant === 'danger' && 'mr-menubar__item--danger',
                          item.disabled && 'mr-menubar__item--disabled',
                        )}
                      >
                        {item.icon && <span className="mr-menubar__item-icon">{item.icon}</span>}
                        <span className="mr-menubar__item-label">{item.label}</span>
                        {item.shortcut && <span className="mr-menubar__shortcut">{item.shortcut}</span>}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  },
)

export type { MenubarProps, MenubarMenu, MenuItem } from './Menubar.types'
