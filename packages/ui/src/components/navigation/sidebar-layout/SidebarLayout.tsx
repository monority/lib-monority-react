import { useCallback, useState } from 'react'
import { cn } from '@/lib/cn'
import type { SidebarLayoutProps } from './SidebarLayout.types'

export function SidebarLayout({
    ref,
    sidebar,
    header,
    children,
    sidebarWidth = 'md',
    collapsible = false,
    open: controlledOpen,
    defaultOpen = true,
    onOpenChange,
    className,
    ...props
}: SidebarLayoutProps) {
    const isControlled = controlledOpen !== undefined
    const [internalOpen, setInternalOpen] = useState(defaultOpen)
    const isOpen = isControlled ? controlledOpen : internalOpen

    const handleToggle = useCallback(() => {
        const next = !isOpen
        if (!isControlled) setInternalOpen(next)
        onOpenChange?.(next)
    }, [isControlled, isOpen, onOpenChange])

    return (
        <div
            ref={ref}
            className={cn('mr-sidebar-layout', className)}
            data-sidebar-width={sidebarWidth}
            data-collapsed={collapsible && !isOpen ? 'true' : undefined}
            data-collapsible={collapsible ? 'true' : undefined}
            {...props}
        >
            <aside className="mr-sidebar-layout__sidebar">{sidebar}</aside>
            <div className="mr-sidebar-layout__main">
                {header || collapsible ? (
                    <div className="mr-sidebar-layout__header">
                        {collapsible ? (
                            <button
                                type="button"
                                className="mr-sidebar-layout__toggle"
                                aria-label={
                                    isOpen ? 'Fermer la barre latérale' : 'Ouvrir la barre latérale'
                                }
                                aria-expanded={isOpen}
                                onClick={handleToggle}
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <rect width="18" height="18" x="3" y="3" rx="2" />
                                    <path d="M9 3v18" />
                                </svg>
                            </button>
                        ) : null}
                        {header}
                    </div>
                ) : null}
                <div className="mr-sidebar-layout__content">{children}</div>
            </div>
        </div>
    )
}

export type { SidebarLayoutProps, SidebarWidth } from './SidebarLayout.types'
