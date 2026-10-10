import { createContext, useContext } from 'react'
import { cn } from '@/lib/cn'
import type {
    TimelineContentProps,
    TimelineDateProps,
    TimelineDescriptionProps,
    TimelineItemProps,
    TimelinePointProps,
    TimelineProps,
    TimelineStatus,
    TimelineTitleProps,
} from './Timeline.types'

interface TimelineItemContextValue {
    status?: TimelineStatus
}

const TimelineItemContext = createContext<TimelineItemContextValue>({})

export function Timeline({
    ref,
    orientation = 'vertical',
    items,
    children,
    className,
    ...props
}: TimelineProps) {
    return (
        <ol
            ref={ref}
            className={cn('mr-timeline', className)}
            data-orientation={orientation}
            {...props}
        >
            {items
                ? items.map((item, index) => (
                      <TimelineItem key={item.id ?? index} status={item.status}>
                          <TimelinePoint status={item.status} />
                          <TimelineContent>
                              {item.date ? <TimelineDate>{item.date}</TimelineDate> : null}
                              <TimelineTitle>{item.title}</TimelineTitle>
                              {item.description ? (
                                  <TimelineDescription>{item.description}</TimelineDescription>
                              ) : null}
                          </TimelineContent>
                      </TimelineItem>
                  ))
                : children}
        </ol>
    )
}

function TimelineItem({
    ref,
    status = 'default',
    className,
    children,
    ...props
}: TimelineItemProps) {
    return (
        <TimelineItemContext.Provider value={{ status }}>
            <li
                ref={ref}
                className={cn('mr-timeline__item', className)}
                data-status={status}
                {...props}
            >
                {children}
            </li>
        </TimelineItemContext.Provider>
    )
}

function TimelinePoint({ ref, status, className, ...props }: TimelinePointProps) {
    const parent = useContext(TimelineItemContext)
    const resolvedStatus = status ?? parent.status ?? 'default'

    return (
        <span
            ref={ref}
            className={cn('mr-timeline__point', className)}
            data-status={resolvedStatus}
            aria-hidden="true"
            {...props}
        />
    )
}

function TimelineContent({ ref, className, children, ...props }: TimelineContentProps) {
    return (
        <div ref={ref} className={cn('mr-timeline__content', className)} {...props}>
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

Timeline.Item = TimelineItem
Timeline.Point = TimelinePoint
Timeline.Content = TimelineContent
Timeline.Date = TimelineDate
Timeline.Title = TimelineTitle
Timeline.Description = TimelineDescription

export {
    TimelineItem,
    TimelinePoint,
    TimelineContent,
    TimelineDate,
    TimelineTitle,
    TimelineDescription,
}
