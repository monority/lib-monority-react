import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import type { CarouselProps } from './Carousel.types'

export function Carousel({
    slides,
    autoPlay = false,
    interval = 5000,
    showArrows = true,
    showDots = true,
    loop = false,
    orientation = 'horizontal',
    slideClassName,
    className,
    ref,
    ...props
}: CarouselProps) {
    const [current, setCurrent] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const touchStartX = useRef<number | null>(null)
    const touchStartY = useRef<number | null>(null)
    const total = slides.length

    const goTo = useCallback(
        (index: number) => {
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

    if (total === 0) return null

    return (
        <div
            ref={ref}
            role="region"
            aria-roledescription="carousel"
            aria-label="Image carousel"
            className={cn('mr-carousel', className)}
            data-orientation={orientation}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            {...props}
        >
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
                    <button
                        type="button"
                        onClick={prev}
                        disabled={!loop && current === 0}
                        className="mr-carousel__arrow"
                        aria-label="Previous slide"
                    >
                        ‹
                    </button>
                    <button
                        type="button"
                        onClick={next}
                        disabled={!loop && current === total - 1}
                        className="mr-carousel__arrow"
                        aria-label="Next slide"
                    >
                        ›
                    </button>
                </>
            )}

            {showDots && total > 1 && (
                <div className="mr-carousel__dots" role="tablist" aria-label="Slides">
                    {slides.map((_, i) => (
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
            )}
        </div>
    )
}

export type { CarouselProps } from './Carousel.types'
