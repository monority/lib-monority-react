import { forwardRef, useState, useRef, useEffect, useCallback } from 'react'
import { cn } from '@/lib/cn'
import type { NavigationMenuProps } from './NavigationMenu.types'

function getItemValue(label: string): string {
  return label.toLowerCase().replace(/\s+/g, '-')
}

export const NavigationMenu = forwardRef<HTMLElement, NavigationMenuProps>(
  function NavigationMenu(
    { items, defaultValue, value: controlledValue, onValueChange, className, ...props },
    ref,
  ) {
    const [activeValue, setActiveValue] = useState(defaultValue ?? '')
    const value = controlledValue ?? activeValue
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
    const indicatorRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

    const setValue = useCallback(
      (v: string) => {
        if (controlledValue === undefined) setActiveValue(v)
        onValueChange?.(v)
      },
      [controlledValue, onValueChange],
    )

    const updateIndicator = useCallback((el: HTMLButtonElement | null) => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const parentRect = el.closest('.mr-nav-menu__list')?.getBoundingClientRect()
      if (parentRect) {
        setIndicatorStyle({
          left: rect.left - parentRect.left,
          width: rect.width,
        })
      }
    }, [])

    const handleMouseEnter = useCallback(
      (itemValue: string, el: HTMLButtonElement | HTMLAnchorElement | null) => {
        clearTimeout(timeoutRef.current)
        if (el) updateIndicator(el as HTMLButtonElement)
        setValue(itemValue)
      },
      [setValue, updateIndicator],
    )

    const handleMouseLeave = useCallback(() => {
      timeoutRef.current = setTimeout(() => {
        setValue('')
        setIndicatorStyle({ left: 0, width: 0 })
      }, 150)
    }, [setValue])

    useEffect(() => {
      return () => clearTimeout(timeoutRef.current)
    }, [])

    return (
      <nav
        ref={ref}
        className={cn('mr-nav-menu', className)}
        role="navigation"
        aria-label="Main navigation"
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div className="mr-nav-menu__list">
          {items.map((item) => {
            const itemValue = getItemValue(item.label)
            const hasSubItems = item.items && item.items.length > 0
            const isActive = value === itemValue

            return (
              <div
                key={itemValue}
                className={cn(
                  'mr-nav-menu__item',
                  isActive && 'mr-nav-menu__item--active',
                  item.disabled && 'mr-nav-menu__item--disabled',
                )}
                data-active={isActive || undefined}
                data-disabled={item.disabled || undefined}
                onMouseOver={(e) => {
                  // Only trigger when entering from outside this item
                  const related = e.relatedTarget as Node | null
                  const itemEl = e.currentTarget
                  if (related && itemEl.contains(related)) return
                  const trigger = itemEl.querySelector(
                    '.mr-nav-menu__trigger, .mr-nav-menu__link',
                  ) as HTMLButtonElement | HTMLAnchorElement | null
                  handleMouseEnter(itemValue, trigger)
                }}
              >
                {hasSubItems ? (
                  <>
                    <button
                      type="button"
                      className="mr-nav-menu__trigger"
                      disabled={item.disabled}
                      role="menuitem"
                      aria-haspopup="true"
                      aria-expanded={isActive}
                    >
                      {item.icon && <span className="mr-nav-menu__icon">{item.icon}</span>}
                      {item.label}
                      <svg
                        className="mr-nav-menu__chevron"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 4.5L6 7.5L9 4.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {isActive && (
                      <div className="mr-nav-menu__content" role="menu">
                        <div className="mr-nav-menu__sub-list">
                          {item.items!.map((sub) => (
                            <a
                              key={sub.label}
                              href={sub.href || '#'}
                              className="mr-nav-menu__sub-item"
                              role="menuitem"
                            >
                              {sub.icon && (
                                <span className="mr-nav-menu__sub-icon">{sub.icon}</span>
                              )}
                              <div className="mr-nav-menu__sub-text">
                                <span className="mr-nav-menu__sub-label">{sub.label}</span>
                                {sub.description && (
                                  <span className="mr-nav-menu__sub-desc">{sub.description}</span>
                                )}
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={item.href || '#'}
                    className={cn(
                      'mr-nav-menu__link',
                      item.disabled && 'mr-nav-menu__link--disabled',
                    )}
                    aria-disabled={item.disabled || undefined}
                    tabIndex={item.disabled ? -1 : 0}
                  >
                    {item.icon && <span className="mr-nav-menu__icon">{item.icon}</span>}
                    {item.label}
                  </a>
                )}
              </div>
            )
          })}

          {/* Indicator bar */}
          <div
            ref={indicatorRef}
            className="mr-nav-menu__indicator"
            style={{
              transform: `translateX(${indicatorStyle.left}px)`,
              width: `${indicatorStyle.width}px`,
              opacity: value ? 1 : 0,
            }}
          />
        </div>
      </nav>
    )
  },
)

export type { NavigationMenuProps, NavigationItem, NavigationSubItem } from './NavigationMenu.types'
