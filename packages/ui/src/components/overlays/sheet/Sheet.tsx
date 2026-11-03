import { SlidePanel, createSlideSubcomponents } from '@/internal/slide-panel/SlidePanel'
import type {
    SheetBodyProps,
    SheetCloseProps,
    SheetDescriptionProps,
    SheetFooterProps,
    SheetHeaderProps,
    SheetProps,
    SheetTitleProps,
} from './Sheet.types'

const subcomponents = createSlideSubcomponents('mr-sheet', 'Close panel')

export function Sheet({
    ref,
    open,
    title,
    description,
    children,
    side = 'right',
    footer,
    onClose,
    className,
    ...props
}: SheetProps) {
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
            classPrefix="mr-sheet"
            closeLabel="Close panel"
            wrapBodyWhenNoHeader={true}
            {...props}
        >
            {children}
        </SlidePanel>
    )
}

export const SheetHeader = subcomponents.Header as (props: SheetHeaderProps) => React.ReactNode
export const SheetTitle = subcomponents.Title as (props: SheetTitleProps) => React.ReactNode
export const SheetDescription = subcomponents.Description as (
    props: SheetDescriptionProps
) => React.ReactNode
export const SheetBody = subcomponents.Body as (props: SheetBodyProps) => React.ReactNode
export const SheetFooter = subcomponents.Footer as (props: SheetFooterProps) => React.ReactNode
export const SheetClose = subcomponents.Close as (props: SheetCloseProps) => React.ReactNode

Sheet.Header = SheetHeader
Sheet.Title = SheetTitle
Sheet.Description = SheetDescription
Sheet.Body = SheetBody
Sheet.Footer = SheetFooter
Sheet.Close = SheetClose

export type {
    SheetProps,
    SheetSide,
    SheetHeaderProps,
    SheetTitleProps,
    SheetDescriptionProps,
    SheetBodyProps,
    SheetFooterProps,
    SheetCloseProps,
} from './Sheet.types'
