import { forwardRef, useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/cn'
import type { CarouselProps } from './Carousel.types'

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  function Carousel({
    slides,
    autoPlay = false,
    interval = 5000,
    showArrows = true,
    showDots = true,
    loop = false,
    orientation = 'horizontal',
    slideClassName,
    className,
    ...props
  }, ref) {
    const [current, setCurrent] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const total = slides.length

    const goTo = useCallback(
      (index: number) => {
        if (loop) {
          setCurrent(((index % total) + total) % total)
        } else {
          setCurrent(Math.max(0, Math.min(index, total - 1)))
        }
      },
      [loop, total],
    )

    const next = useCallback(() => goTo(current + 1), [current, goTo])
    const prev = useCallback(() => goTo(current - 1), [current, goTo])

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
        className={cn('mr-carousel', `mr-carousel--${orientation}`, className)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        {...props}
      >
        <div className="mr-carousel__viewport">
          <div
            className={cn(
              'mr-carousel__track',
              `mr-carousel__track--${orientation}`,
            )}
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
              className="mr-carousel__arrow mr-carousel__arrow--prev"
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              disabled={!loop && current === total - 1}
              className="mr-carousel__arrow mr-carousel__arrow--next"
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
                className={cn(
                  'mr-carousel__dot',
                  i === current && 'mr-carousel__dot--active',
                )}
              />
            ))}
          </div>
        )}
      </div>
    )
  },
)
