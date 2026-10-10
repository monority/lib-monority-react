import { useState, type KeyboardEvent } from 'react'
import { cn } from '@/lib/cn'
import type { RatingProps } from './Rating.types'

function StarIcon({ filled }: { filled: boolean }) {
    return (
        <svg
            className="mr-rating__icon"
            viewBox="0 0 24 24"
            fill={filled ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    )
}

export function Rating({
    ref,
    value,
    defaultValue = 0,
    max = 5,
    readOnly = false,
    disabled = false,
    size = 'md',
    onChange,
    name,
    className,
    ...props
}: RatingProps) {
    const [internalValue, setInternalValue] = useState(defaultValue)
    const [hoverValue, setHoverValue] = useState<number | null>(null)

    const isControlled = value !== undefined
    const resolvedValue = isControlled ? value : internalValue

    function handleSelect(starIndex: number) {
        if (readOnly || disabled) return
        const nextValue = resolvedValue === starIndex ? 0 : starIndex
        if (!isControlled) {
            setInternalValue(nextValue)
        }
        onChange?.(nextValue)
    }

    function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, starIndex: number) {
        if (readOnly || disabled) return

        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
            e.preventDefault()
            const next = Math.min(starIndex + 1, max)
            handleSelect(next)
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
            e.preventDefault()
            const next = Math.max(starIndex - 1, 0)
            handleSelect(next)
        }
    }

    const displayedValue = hoverValue !== null ? hoverValue : resolvedValue

    return (
        <div
            ref={ref}
            className={cn('mr-rating', className)}
            role="radiogroup"
            aria-label={props['aria-label'] ?? `Evaluation sur ${max}`}
            data-disabled={disabled ? '' : undefined}
            data-readonly={readOnly ? '' : undefined}
            data-size={size}
            {...props}
        >
            {Array.from({ length: max }, (_, index) => {
                const starIndex = index + 1
                const isFilled = starIndex <= displayedValue
                const isChecked = starIndex === resolvedValue

                if (readOnly) {
                    return (
                        <span
                            key={starIndex}
                            className="mr-rating__item"
                            data-active={isFilled ? '' : undefined}
                            aria-hidden="true"
                        >
                            <StarIcon filled={isFilled} />
                        </span>
                    )
                }

                return (
                    <button
                        key={starIndex}
                        type="button"
                        role="radio"
                        aria-checked={isChecked}
                        aria-label={`${starIndex} etoile${starIndex > 1 ? 's' : ''} sur ${max}`}
                        disabled={disabled}
                        tabIndex={isChecked || (resolvedValue === 0 && starIndex === 1) ? 0 : -1}
                        className="mr-rating__item"
                        data-active={isFilled ? '' : undefined}
                        data-hover={hoverValue !== null && starIndex <= hoverValue ? '' : undefined}
                        onClick={() => handleSelect(starIndex)}
                        onMouseEnter={() => !disabled && setHoverValue(starIndex)}
                        onMouseLeave={() => !disabled && setHoverValue(null)}
                        onKeyDown={(e) => handleKeyDown(e, starIndex)}
                    >
                        <StarIcon filled={isFilled} />
                    </button>
                )
            })}
        </div>
    )
}
