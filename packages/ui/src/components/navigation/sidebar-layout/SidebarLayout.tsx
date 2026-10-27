import { cn } from '@/lib/cn'
import { createContext, useContext, useState } from 'react'
import type {
    SidebarLayoutContentProps,
    SidebarLayoutHeaderProps,
    SidebarLayoutMainProps,
    SidebarLayoutProps,
    SidebarLayoutSidebarProps,
    SidebarLayoutToggleProps,
} from './SidebarLayout.types'

interface SidebarLayoutContextValue {
    isOpen: boolean
    handleToggle: () => void
    collapsible: boolean
}

const SidebarLayoutContext = createContext<SidebarLayoutContextValue | null>(null)

export function useSidebarLayoutContext() {
    return useContext(SidebarLayoutContext)
}

function SidebarLayoutSidebar({ ref, className, children, ...props }: SidebarLayoutSidebarProps) {
    return (
        <aside ref={ref} className={cn('mr-sidebar-layout__sidebar', className)} {...props}>
            {children}
        </aside>
    )
}

function SidebarLayoutMain({ ref, className, children, ...props }: SidebarLayoutMainProps) {
    return (
        <div ref={ref} className={cn('mr-sidebar-layout__main', className)} {...props}>
            {children}
        </div>
    )
}

function SidebarLayoutHeader({ ref, className, children, ...props }: SidebarLayoutHeaderProps) {
    return (
        <div ref={ref} className={cn('mr-sidebar-layout__header', className)} {...props}>
            {children}
        </div>
    )
}

function SidebarLayoutContent({ ref, className, children, ...props }: SidebarLayoutContentProps) {
    return (
        <div ref={ref} className={cn('mr-sidebar-layout__content', className)} {...props}>
            {children}
        </div>
    )
}

function SidebarLayoutToggle({
    ref,
    className,
    children,
    onClick,
    ...props
}: SidebarLayoutToggleProps) {
    const ctx = useContext(SidebarLayoutContext)
    const isOpen = ctx ? ctx.isOpen : true

    return (
        <button
            ref={ref}
            type="button"
            className={cn('mr-sidebar-layout__toggle', className)}
            aria-label={isOpen ? 'Fermer la barre latérale' : 'Ouvrir la barre latérale'}
            aria-expanded={isOpen}
            onClick={(e) => {
                ctx?.handleToggle()
                onClick?.(e)
            }}
            {...props}
        >
            {children ?? (
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
            )}
        </button>
    )
}

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

    const handleToggle = () => {
        const next = !isOpen
        if (!isControlled) setInternalOpen(next)
        onOpenChange?.(next)
    }

    const contextValue: SidebarLayoutContextValue = {
        isOpen,
        handleToggle,
        collapsible,
    }

    return (
        <SidebarLayoutContext.Provider value={contextValue}>
            <div
                ref={ref}
                className={cn('mr-sidebar-layout', className)}
                data-sidebar-width={sidebarWidth}
                data-collapsed={collapsible && !isOpen ? 'true' : undefined}
                data-collapsible={collapsible ? 'true' : undefined}
                {...props}
            >
                {sidebar !== undefined || header !== undefined ? (
                    <>
                        <SidebarLayoutSidebar>{sidebar}</SidebarLayoutSidebar>
                        <SidebarLayoutMain>
                            {header || collapsible ? (
                                <SidebarLayoutHeader>
                                    {collapsible ? <SidebarLayoutToggle /> : null}
                                    {header}
                                </SidebarLayoutHeader>
                            ) : null}
                            <SidebarLayoutContent>{children}</SidebarLayoutContent>
                        </SidebarLayoutMain>
                    </>
                ) : (
                    children
                )}
            </div>
        </SidebarLayoutContext.Provider>
    )
}

SidebarLayout.Sidebar = SidebarLayoutSidebar
SidebarLayout.Main = SidebarLayoutMain
SidebarLayout.Header = SidebarLayoutHeader
SidebarLayout.Content = SidebarLayoutContent
SidebarLayout.Toggle = SidebarLayoutToggle

export {
    SidebarLayoutSidebar,
    SidebarLayoutMain,
    SidebarLayoutHeader,
    SidebarLayoutContent,
    SidebarLayoutToggle,
}

export type {
    SidebarLayoutProps,
    SidebarWidth,
    SidebarLayoutSidebarProps,
    SidebarLayoutMainProps,
    SidebarLayoutHeaderProps,
    SidebarLayoutContentProps,
    SidebarLayoutToggleProps,
} from './SidebarLayout.types'
