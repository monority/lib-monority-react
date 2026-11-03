import { SlidePanel, createSlideSubcomponents } from '@/internal/slide-panel/SlidePanel'
import type {
    DrawerBodyProps,
    DrawerCloseProps,
    DrawerDescriptionProps,
    DrawerFooterProps,
    DrawerHeaderProps,
    DrawerProps,
    DrawerTitleProps,
} from './Drawer.types'

const subcomponents = createSlideSubcomponents('mr-drawer', 'Close panel')

export function Drawer({
    ref,
    open,
    title,
    description,
    footer,
    children,
    side = 'right',
    onClose,
    className,
    ...props
}: DrawerProps) {
    return (
        <SlidePanel
            ref={ref}
            open={open}
            title={title}
            description={description}
            footer={footer}
            side={side}
            onClose={onClose}
            className={className}
            classPrefix="mr-drawer"
            closeLabel="Close panel"
            wrapBodyWhenNoHeader={false}
            {...props}
        >
            {children}
        </SlidePanel>
    )
}

export const DrawerHeader = subcomponents.Header as (props: DrawerHeaderProps) => React.ReactNode
export const DrawerTitle = subcomponents.Title as (props: DrawerTitleProps) => React.ReactNode
export const DrawerDescription = subcomponents.Description as (
    props: DrawerDescriptionProps
) => React.ReactNode
export const DrawerBody = subcomponents.Body as (props: DrawerBodyProps) => React.ReactNode
export const DrawerFooter = subcomponents.Footer as (props: DrawerFooterProps) => React.ReactNode
export const DrawerClose = subcomponents.Close as (props: DrawerCloseProps) => React.ReactNode

Drawer.Header = DrawerHeader
Drawer.Title = DrawerTitle
Drawer.Description = DrawerDescription
Drawer.Body = DrawerBody
Drawer.Footer = DrawerFooter
Drawer.Close = DrawerClose

export type {
    DrawerProps,
    DrawerSide,
    DrawerHeaderProps,
    DrawerTitleProps,
    DrawerDescriptionProps,
    DrawerBodyProps,
    DrawerFooterProps,
    DrawerCloseProps,
} from './Drawer.types'
