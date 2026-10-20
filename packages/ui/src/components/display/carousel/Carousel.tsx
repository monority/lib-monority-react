import {
    IconChevronDown,
    IconChevronLeft,
    IconChevronRight,
    IconChevronUp,
    IconPause,
    IconPlay,
} from '@/icons'
import { cn } from '@/lib/cn'
import {
    Children,
    cloneElement,
    createContext,
    isValidElement,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import type {
    CarouselButtonProps,
    CarouselContentProps,
    CarouselCounterProps,
    CarouselDotsProps,
    CarouselItemProps,
    CarouselPlayPauseProps,
    CarouselProps,
} from './Carousel.types'

interface CarouselContextValue {
    current: number
    total: number
    setTotal: (total: number) => void
    goTo: (index: number) => void
    next: () => void
    prev: () => void
    loop: boolean
    orientation: 'horizontal' | 'vertical'
    slideClassName?: string
    isPaused: boolean
    togglePause: () => void
}

const CarouselContext = createContext<CarouselContextValue | null>(null)

export function CarouselContent({ ref, children, className, ...props }: CarouselContentProps) {
    const ctx = useContext(CarouselContext)
    const childArray = Children.toArray(children)
    const count = childArray.length

    useEffect(() => {
        if (ctx) {
            ctx.setTotal(count)
        }
    }, [ctx, count])

    const current = ctx?.current ?? 0
    const orientation = ctx?.orientation ?? 'horizontal'

    return (
        <div className="mr-carousel__viewport">
            <div
                ref={ref}
                className={cn('mr-carousel__track', className)}
                style={{
                    transform: `translate${orientation === 'horizontal' ? 'X' : 'Y'}(-${current * 100}%)`,
                }}
                {...props}
            >
                {childArray.map((child, index) => {
                    const isVisible = index === current
                    if (isValidElement(child)) {
                        return cloneElement(child, {
                            key: child.key ?? index,
                            'aria-hidden': !isVisible,
                            'aria-label': `Slide ${index + 1} of ${count}`,
                            index,
                        } as Record<string, unknown>)
                    }
                    return (
                        <div
                            key={index}
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`Slide ${index + 1} of ${count}`}
                            aria-hidden={!isVisible}
                            className={cn('mr-carousel__slide', ctx?.slideClassName)}
                        >
                            {child}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export function CarouselItem({ ref, children, className, index, ...props }: CarouselItemProps) {
    const ctx = useContext(CarouselContext)
    const current = ctx?.current ?? 0
    const isVisible = index !== undefined ? index === current : undefined

    return (
        <div
            ref={ref}
            role="group"
            aria-roledescription="slide"
            aria-hidden={isVisible !== undefined ? !isVisible : undefined}
            className={cn('mr-carousel__slide', ctx?.slideClassName, className)}
            {...props}
        >
            {children}
        </div>
    )
}

export function CarouselPrevious({
    ref,
    className,
    children,
    onClick,
    ...props
}: CarouselButtonProps) {
    const ctx = useContext(CarouselContext)
    if (!ctx) return null
    const { prev, loop, current, orientation } = ctx

    return (
        <button
            ref={ref}
            type="button"
            onClick={(e) => {
                onClick?.(e)
                prev()
            }}
            disabled={!loop && current === 0}
            className={cn('mr-carousel__arrow', className)}
            data-direction="prev"
            aria-label="Previous slide"
            {...props}
        >
            {children ??
                (orientation === 'vertical' ? (
                    <IconChevronUp size={18} />
                ) : (
                    <IconChevronLeft size={18} />
                ))}
        </button>
    )
}

export function CarouselNext({ ref, className, children, onClick, ...props }: CarouselButtonProps) {
    const ctx = useContext(CarouselContext)
    if (!ctx) return null
    const { next, loop, current, total, orientation } = ctx

    return (
        <button
            ref={ref}
            type="button"
            onClick={(e) => {
                onClick?.(e)
                next()
            }}
            disabled={!loop && current === total - 1}
            className={cn('mr-carousel__arrow', className)}
            data-direction="next"
            aria-label="Next slide"
            {...props}
        >
            {children ??
                (orientation === 'vertical' ? (
                    <IconChevronDown size={18} />
                ) : (
                    <IconChevronRight size={18} />
                ))}
        </button>
    )
}

export function CarouselDots({ ref, className, ...props }: CarouselDotsProps) {
    const ctx = useContext(CarouselContext)
    if (!ctx || ctx.total <= 1) return null
    const { total, current, goTo } = ctx

    return (
        <div
            ref={ref}
            className={cn('mr-carousel__dots', className)}
            role="tablist"
            aria-label="Slides"
            {...props}
        >
            {Array.from({ length: total }, (_, i) => (
                <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === current}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => goTo(i)}
                    className="mr-carousel__dot"
                    data-active={i === current ? 'true' : undefined}
                />
            ))}
        </div>
    )
}

export function CarouselCounter({ ref, className, format, ...props }: CarouselCounterProps) {
    const ctx = useContext(CarouselContext)
    if (!ctx || ctx.total <= 0) return null
    const { current, total } = ctx

    return (
        <div
            ref={ref}
            className={cn('mr-carousel__counter', className)}
            aria-live="polite"
            {...props}
        >
            {format ? format(current + 1, total) : `${current + 1} / ${total}`}
        </div>
    )
}

export function CarouselPlayPause({ ref, className, onClick, ...props }: CarouselPlayPauseProps) {
    const ctx = useContext(CarouselContext)
    if (!ctx) return null
    const { isPaused, togglePause } = ctx

    return (
        <button
            ref={ref}
            type="button"
            onClick={(e) => {
                onClick?.(e)
                togglePause()
            }}
            className={cn('mr-carousel__play-pause', className)}
            aria-label={isPaused ? 'Reprendre la lecture' : 'Mettre en pause'}
            aria-pressed={isPaused}
            {...props}
        >
            {isPaused ? <IconPlay size={14} /> : <IconPause size={14} />}
        </button>
    )
}

export function Carousel({
    slides,
    children,
    autoPlay = false,
    interval = 5000,
    showArrows = true,
    showDots = true,
    showCounter = false,
    loop = false,
    orientation = 'horizontal',
    arrowsPosition = 'inside',
    slideClassName,
    className,
    ref,
    ...props
}: CarouselProps) {
    const [current, setCurrent] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [totalState, setTotalState] = useState(slides ? slides.length : 0)
    const touchStartX = useRef<number | null>(null)
    const touchStartY = useRef<number | null>(null)
    const total = slides ? slides.length : totalState

    const goTo = useCallback(
        (index: number) => {
            if (total <= 0) return
            if (loop) {
                setCurrent(((index % total) + total) % total)
            } else {
                setCurrent(Math.max(0, Math.min(index, total - 1)))
            }
        },
        [loop, total]
    )

    const next = useCallback(() => goTo(current + 1), [current, goTo])
    const prev = useCallback(() => goTo(current - 1), [current, goTo])
    const togglePause = useCallback(() => setIsPaused((p) => !p), [])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        props.onKeyDown?.(e)
        if (e.defaultPrevented) return
        const target = e.target as HTMLElement
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return

        if (orientation === 'horizontal') {
            if (e.key === 'ArrowLeft') {
                e.preventDefault()
                prev()
            } else if (e.key === 'ArrowRight') {
                e.preventDefault()
                next()
            }
        } else {
            if (e.key === 'ArrowUp') {
                e.preventDefault()
                prev()
            } else if (e.key === 'ArrowDown') {
                e.preventDefault()
                next()
            }
        }
        if (e.key === 'Home') {
            e.preventDefault()
            goTo(0)
        } else if (e.key === 'End') {
            e.preventDefault()
            goTo(total - 1)
        }
    }

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        touchStartX.current = e.touches[0]?.clientX ?? null
        touchStartY.current = e.touches[0]?.clientY ?? null
    }

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        if (touchStartX.current === null || touchStartY.current === null) return
        const endX = e.changedTouches[0]?.clientX ?? touchStartX.current
        const endY = e.changedTouches[0]?.clientY ?? touchStartY.current
        const diffX = touchStartX.current - endX
        const diffY = touchStartY.current - endY
        const threshold = 40

        if (orientation === 'horizontal') {
            if (Math.abs(diffX) > threshold && Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX > 0) next()
                else prev()
            }
        } else {
            if (Math.abs(diffY) > threshold && Math.abs(diffY) > Math.abs(diffX)) {
                if (diffY > 0) next()
                else prev()
            }
        }
        touchStartX.current = null
        touchStartY.current = null
    }

    useEffect(() => {
        if (!autoPlay || isPaused || total <= 1) return
        const id = setInterval(next, interval)
        return () => clearInterval(id)
    }, [autoPlay, isPaused, interval, next, total])

    if (slides && slides.length === 0) return null

    const contextValue: CarouselContextValue = {
        current,
        total,
        setTotal: setTotalState,
        goTo,
        next,
        prev,
        loop,
        orientation,
        slideClassName,
        isPaused,
        togglePause,
    }

    return (
        <CarouselContext.Provider value={contextValue}>
            <div
                ref={ref}
                role="region"
                aria-roledescription="carousel"
                aria-label={props['aria-label'] ?? 'Image carousel'}
                tabIndex={props.tabIndex ?? 0}
                className={cn('mr-carousel', className)}
                data-orientation={orientation}
                data-arrows-position={arrowsPosition}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onKeyDown={handleKeyDown}
                {...props}
            >
                {slides !== undefined ? (
                    <>
                        <div className="mr-carousel__viewport">
                            <div
                                className="mr-carousel__track"
                                style={{
                                    transform: `translate${orientation === 'horizontal' ? 'X' : 'Y'}(-${current * 100}%)`,
                                }}
                            >
                                {slides.map((slide, i) => (
                                    <div
                                        key={i}
                                        role="group"
                                        aria-roledescription="slide"
                                        aria-label={`Slide ${i + 1} of ${total}`}
                                        aria-hidden={i !== current}
                                        className={cn('mr-carousel__slide', slideClassName)}
                                    >
                                        {slide}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {showArrows && total > 1 && (
                            <>
                                <CarouselPrevious />
                                <CarouselNext />
                            </>
                        )}

                        {showDots && !showCounter && !autoPlay && total > 1 && <CarouselDots />}

                        {(showCounter || (autoPlay && showDots) || (autoPlay && showCounter)) &&
                            total > 1 && (
                                <div className="mr-carousel__controls">
                                    {showDots && <CarouselDots />}
                                    {showCounter && <CarouselCounter />}
                                    {autoPlay && <CarouselPlayPause />}
                                </div>
                            )}
                    </>
                ) : (
                    children
                )}
            </div>
        </CarouselContext.Provider>
    )
}

Carousel.Content = CarouselContent
Carousel.Item = CarouselItem
Carousel.Previous = CarouselPrevious
Carousel.Next = CarouselNext
Carousel.Dots = CarouselDots
Carousel.Counter = CarouselCounter
Carousel.PlayPause = CarouselPlayPause

export type {
    CarouselProps,
    CarouselContentProps,
    CarouselItemProps,
    CarouselButtonProps,
    CarouselDotsProps,
    CarouselCounterProps,
    CarouselPlayPauseProps,
} from './Carousel.types'
