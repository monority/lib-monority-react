import { cn } from '@/lib/cn'
import { createContext, useContext } from 'react'
import type {
    TimelineContentProps,
    TimelineDateProps,
    TimelineDescriptionProps,
    TimelineExtraProps,
    TimelineHeaderProps,
    TimelineItemProps,
    TimelineLineStyle,
    TimelineOrientation,
    TimelinePointProps,
    TimelineProps,
    TimelineSize,
    TimelineStatus,
    TimelineTitleProps,
} from './Timeline.types'

interface TimelineContextValue {
    orientation: TimelineOrientation
    size: TimelineSize
    lineStyle: TimelineLineStyle
}

const TimelineContext = createContext<TimelineContextValue>({
    orientation: 'vertical',
    size: 'md',
    lineStyle: 'solid',
})

interface TimelineItemContextValue {
    status?: TimelineStatus
    lineStyle?: TimelineLineStyle
    size?: TimelineSize
}

const TimelineItemContext = createContext<TimelineItemContextValue>({})

export function Timeline({
    ref,
    orientation = 'vertical',
    size = 'md',
    lineStyle = 'solid',
    items,
    children,
    className,
    ...props
}: TimelineProps) {
    return (
        <TimelineContext.Provider value={{ orientation, size, lineStyle }}>
            <ol
                ref={ref}
                className={cn('mr-timeline', className)}
                data-orientation={orientation}
                data-size={size}
                data-line-style={lineStyle}
                {...props}
            >
                {items
                    ? items.map((item, index) => (
                          <TimelineItem
                              key={item.id ?? index}
                              status={item.status}
                              lineStyle={item.lineStyle}
                          >
                              <TimelinePoint status={item.status} icon={item.icon} />
                              <TimelineContent>
                                  <TimelineHeader>
                                      <div className="mr-timeline__heading-group">
                                          <TimelineTitle>{item.title}</TimelineTitle>
                                          {item.date ? (
                                              <TimelineDate>{item.date}</TimelineDate>
                                          ) : null}
                                      </div>
                                      {item.extra ? (
                                          <TimelineExtra>{item.extra}</TimelineExtra>
                                      ) : null}
                                  </TimelineHeader>
                                  {item.description ? (
                                      <TimelineDescription>{item.description}</TimelineDescription>
                                  ) : null}
                              </TimelineContent>
                          </TimelineItem>
                      ))
                    : children}
            </ol>
        </TimelineContext.Provider>
    )
}

function TimelineItem({
    ref,
    status = 'default',
    lineStyle,
    size,
    interactive = false,
    className,
    children,
    onClick,
    onKeyDown,
    tabIndex,
    ...props
}: TimelineItemProps) {
    const parent = useContext(TimelineContext)
    const resolvedLineStyle = lineStyle ?? parent.lineStyle
    const resolvedSize = size ?? parent.size
    const isInteractive = interactive || Boolean(onClick)

    const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
        onKeyDown?.(event)
        if (isInteractive && onClick && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault()
            onClick(event as unknown as React.MouseEvent<HTMLLIElement>)
        }
    }

    return (
        <TimelineItemContext.Provider
            value={{ status, lineStyle: resolvedLineStyle, size: resolvedSize }}
        >
            <li
                ref={ref}
                className={cn('mr-timeline__item', className)}
                data-status={status}
                data-line-style={resolvedLineStyle}
                data-size={resolvedSize}
                data-interactive={isInteractive ? 'true' : undefined}
                role={isInteractive ? 'button' : undefined}
                tabIndex={isInteractive ? (tabIndex ?? 0) : tabIndex}
                onClick={onClick}
                onKeyDown={isInteractive ? handleKeyDown : onKeyDown}
                {...props}
            >
                {children}
            </li>
        </TimelineItemContext.Provider>
    )
}

function TimelinePoint({
    ref,
    status,
    variant = 'solid',
    size,
    icon,
    className,
    children,
    ...props
}: TimelinePointProps) {
    const timeline = useContext(TimelineContext)
    const item = useContext(TimelineItemContext)
    const resolvedStatus = status ?? item.status ?? 'default'
    const resolvedSize = size ?? item.size ?? timeline.size ?? 'md'
    const content = icon ?? children
    const hasIcon = Boolean(content)

    return (
        <span
            ref={ref}
            className={cn('mr-timeline__point', className)}
            data-status={resolvedStatus}
            data-variant={variant}
            data-size={resolvedSize}
            data-has-icon={hasIcon ? 'true' : undefined}
            aria-hidden="true"
            {...props}
        >
            {content}
        </span>
    )
}

function TimelineContent({ ref, className, children, ...props }: TimelineContentProps) {
    return (
        <div ref={ref} className={cn('mr-timeline__content', className)} {...props}>
            {children}
        </div>
    )
}

function TimelineHeader({ ref, className, children, ...props }: TimelineHeaderProps) {
    return (
        <div ref={ref} className={cn('mr-timeline__header', className)} {...props}>
            {children}
        </div>
    )
}

function TimelineDate({ ref, className, children, ...props }: TimelineDateProps) {
    return (
        <time ref={ref} className={cn('mr-timeline__date', className)} {...props}>
            {children}
        </time>
    )
}

function TimelineTitle({ ref, className, children, ...props }: TimelineTitleProps) {
    return (
        <h4 ref={ref} className={cn('mr-timeline__title', className)} {...props}>
            {children}
        </h4>
    )
}

function TimelineDescription({ ref, className, children, ...props }: TimelineDescriptionProps) {
    return (
        <p ref={ref} className={cn('mr-timeline__description', className)} {...props}>
            {children}
        </p>
    )
}

function TimelineExtra({ ref, className, children, ...props }: TimelineExtraProps) {
    return (
        <div ref={ref} className={cn('mr-timeline__extra', className)} {...props}>
            {children}
        </div>
    )
}

Timeline.Item = TimelineItem
Timeline.Point = TimelinePoint
Timeline.Content = TimelineContent
Timeline.Header = TimelineHeader
Timeline.Date = TimelineDate
Timeline.Title = TimelineTitle
Timeline.Description = TimelineDescription
Timeline.Extra = TimelineExtra

export {
    TimelineItem,
    TimelinePoint,
    TimelineContent,
    TimelineHeader,
    TimelineDate,
    TimelineTitle,
    TimelineDescription,
    TimelineExtra,
}
