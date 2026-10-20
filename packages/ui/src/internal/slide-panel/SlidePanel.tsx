import { Button } from '@/components/actions/button/Button'
import { useBodyScrollLock } from '@/internal/use-body-scroll-lock'
import { useFocusTrap } from '@/internal/use-focus-trap'
import { usePortalTarget } from '@/internal/use-portal-target'
import { usePresence } from '@/internal/use-presence'
import { cn } from '@/lib/cn'
import { type HTMLAttributes, type ReactNode, type Ref, useId, useRef } from 'react'
import { createPortal } from 'react-dom'

export type SlidePanelSide = 'left' | 'right' | 'top' | 'bottom'

export interface SlidePanelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    ref?: Ref<HTMLDivElement>
    open: boolean
    title?: ReactNode
    description?: ReactNode
    footer?: ReactNode
    children: ReactNode
    side?: SlidePanelSide
    onClose: () => void
    classPrefix: string
    closeLabel?: string
    wrapBodyWhenNoHeader?: boolean
    panelClassName?: string
}

export interface SlideSubcomponentsProps {
    Header: (props: HTMLAttributes<HTMLElement> & { ref?: Ref<HTMLElement> }) => ReactNode
    Title: (
        props: HTMLAttributes<HTMLHeadingElement> & { ref?: Ref<HTMLHeadingElement> }
    ) => ReactNode
    Description: (
        props: HTMLAttributes<HTMLParagraphElement> & { ref?: Ref<HTMLParagraphElement> }
    ) => ReactNode
    Body: (props: HTMLAttributes<HTMLDivElement> & { ref?: Ref<HTMLDivElement> }) => ReactNode
    Footer: (props: HTMLAttributes<HTMLElement> & { ref?: Ref<HTMLElement> }) => ReactNode
    Close: (
        props: HTMLAttributes<HTMLButtonElement> & {
            ref?: Ref<HTMLButtonElement>
            onClose?: () => void
        }
    ) => ReactNode
}

/**
 * SlidePanel est la primitive interne partagée pour les panneaux coulissants
 * (Drawer et Sheet). Elle gère le portail, le voile de fond, le verrouillage de défilement,
 * le focus-trap accessible et le cycle de vie de fermeture animée via usePresence.
 */
export function SlidePanel({
    ref,
    open,
    title,
    description,
    footer,
    children,
    side = 'right',
    onClose,
    className,
    classPrefix,
    closeLabel = 'Fermer',
    wrapBodyWhenNoHeader = false,
    panelClassName,
    ...props
}: SlidePanelProps) {
    const generatedId = useId()
    const titleId = `${generatedId}-title`
    const descriptionId = `${generatedId}-description`
    const panelRef = useRef<HTMLDivElement>(null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)
    const {
        isMounted,
        isClosing,
        presenceProps,
        ref: presenceRef,
    } = usePresence(open, {
        durationMs: 200,
    })

    useBodyScrollLock(open && !isClosing)
    useFocusTrap({
        active: open && !isClosing,
        containerRef: panelRef,
        initialFocusRef: closeButtonRef,
        onEscape: onClose,
    })
    const portalTarget = usePortalTarget()

    function setPanelNode(node: HTMLDivElement | null) {
        panelRef.current = node
        presenceRef(node)

        if (!ref) return
        if (typeof ref === 'function') {
            ref(node)
            return
        }

        if ('current' in ref) {
            ;(ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }
    }

    if (!isMounted || !portalTarget) return null

    const hasHeader = Boolean(title || description)
    const shouldWrapBody = wrapBodyWhenNoHeader || hasHeader || Boolean(footer)

    return createPortal(
        <div
            className={cn(`${classPrefix}__backdrop`, className)}
            data-open={open ? true : undefined}
            data-side={side}
            {...presenceProps}
            {...props}
        >
            <div
                className={`${classPrefix}__backdrop-surface`}
                aria-hidden="true"
                data-state={presenceProps['data-state']}
                onClick={onClose}
            />
            <div
                ref={setPanelNode}
                className={cn(classPrefix, `${classPrefix}__panel`, panelClassName)}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? titleId : undefined}
                aria-describedby={description ? descriptionId : undefined}
                data-side={side}
                data-open={open ? true : undefined}
                {...presenceProps}
                tabIndex={-1}
                onClick={(e) => e.stopPropagation()}
            >
                {hasHeader ? (
                    <header className={`${classPrefix}__header`}>
                        <div className={`${classPrefix}__heading`}>
                            {title ? (
                                <h3 id={titleId} className={`${classPrefix}__title`}>
                                    {title}
                                </h3>
                            ) : null}
                            {description ? (
                                <p id={descriptionId} className={`${classPrefix}__description`}>
                                    {description}
                                </p>
                            ) : null}
                        </div>
                        <Button
                            ref={closeButtonRef}
                            className={`${classPrefix}__close`}
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            aria-label={closeLabel}
                        >
                            Fermer
                        </Button>
                    </header>
                ) : null}
                {shouldWrapBody ? (
                    <div className={`${classPrefix}__body`}>{children}</div>
                ) : (
                    children
                )}
                {footer ? <footer className={`${classPrefix}__footer`}>{footer}</footer> : null}
            </div>
        </div>,
        portalTarget
    )
}

/**
 * Crée les sous-composants composés (Header, Title, Description, Body, Footer, Close)
 * avec le préfixe BEM spécifié.
 */
export function createSlideSubcomponents(
    prefix: string,
    defaultCloseLabel: string
): SlideSubcomponentsProps {
    function Header({
        ref,
        className,
        children,
        ...props
    }: HTMLAttributes<HTMLElement> & { ref?: Ref<HTMLElement> }) {
        return (
            <header ref={ref} className={cn(`${prefix}__header`, className)} {...props}>
                {children}
            </header>
        )
    }

    function Title({
        ref,
        className,
        children,
        ...props
    }: HTMLAttributes<HTMLHeadingElement> & { ref?: Ref<HTMLHeadingElement> }) {
        return (
            <h3 ref={ref} className={cn(`${prefix}__title`, className)} {...props}>
                {children}
            </h3>
        )
    }

    function Description({
        ref,
        className,
        children,
        ...props
    }: HTMLAttributes<HTMLParagraphElement> & { ref?: Ref<HTMLParagraphElement> }) {
        return (
            <p ref={ref} className={cn(`${prefix}__description`, className)} {...props}>
                {children}
            </p>
        )
    }

    function Body({
        ref,
        className,
        children,
        ...props
    }: HTMLAttributes<HTMLDivElement> & { ref?: Ref<HTMLDivElement> }) {
        return (
            <div ref={ref} className={cn(`${prefix}__body`, className)} {...props}>
                {children}
            </div>
        )
    }

    function Footer({
        ref,
        className,
        children,
        ...props
    }: HTMLAttributes<HTMLElement> & { ref?: Ref<HTMLElement> }) {
        return (
            <footer ref={ref} className={cn(`${prefix}__footer`, className)} {...props}>
                {children}
            </footer>
        )
    }

    function Close({
        ref,
        className,
        children = defaultCloseLabel,
        onClose,
        ...props
    }: HTMLAttributes<HTMLButtonElement> & { ref?: Ref<HTMLButtonElement>; onClose?: () => void }) {
        return (
            <Button
                ref={ref}
                variant="ghost"
                size="sm"
                className={cn(`${prefix}__close`, className)}
                onClick={onClose}
                aria-label={defaultCloseLabel}
                {...props}
            >
                {children}
            </Button>
        )
    }

    return { Header, Title, Description, Body, Footer, Close }
}
