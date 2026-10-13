import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { cn } from '@monority/ui'

export interface MoodboardLayoutProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}

export interface MoodboardLayoutSidebarProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
    children?: ReactNode
}

export interface MoodboardLayoutPreviewProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}

export function MoodboardLayout({ ref, className, children, ...props }: MoodboardLayoutProps) {
    return (
        <div
            ref={ref}
            className={cn('moodboard-page', className)}
            data-testid="moodboard-page"
            {...props}
        >
            {children}
        </div>
    )
}

function MoodboardLayoutSidebar({
    ref,
    className,
    children,
    ...props
}: MoodboardLayoutSidebarProps) {
    return (
        <aside
            ref={ref}
            className={cn('moodboard-sidebar', className)}
            aria-label="Design configuration"
            {...props}
        >
            {children}
        </aside>
    )
}

function MoodboardLayoutPreview({
    ref,
    className,
    children,
    ...props
}: MoodboardLayoutPreviewProps) {
    return (
        <main
            ref={ref}
            className={cn('moodboard-preview', className)}
            data-testid="moodboard-preview"
            {...props}
        >
            {children}
        </main>
    )
}

MoodboardLayout.Sidebar = MoodboardLayoutSidebar
MoodboardLayout.Preview = MoodboardLayoutPreview
