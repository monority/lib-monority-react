import { useControllableState } from '@/internal/use-controllable-state'
import { cn } from '@/lib/cn'
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useId,
    useLayoutEffect,
    useRef,
    useState,
} from 'react'
import type {
    SegmentedControlItemProps,
    SegmentedControlOption,
    SegmentedControlProps,
    SegmentedControlSize,
} from './SegmentedControl.types'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

interface SegmentedControlContextValue {
    value: string
    onChange: (val: string) => void
    size?: SegmentedControlSize
    disabled?: boolean
    name?: string
}

const SegmentedControlContext = createContext<SegmentedControlContextValue | null>(null)

export function SegmentedControlItem({
    ref,
    value: itemValue,
    disabled = false,
    className,
    children,
    ...props
}: SegmentedControlItemProps) {
    const context = useContext(SegmentedControlContext)
    const isSelected = context ? context.value === itemValue : false
    const isDisabled = (context?.disabled ?? false) || disabled

    return (
        <button
            ref={ref}
            type="button"
            role="radio"
            aria-checked={isSelected}
            data-selected={isSelected ? true : undefined}
            disabled={isDisabled}
            className={cn('mr-segmented-control__item', className)}
            onClick={() => {
                if (!isDisabled) {
                    context?.onChange(itemValue)
                }
            }}
            {...props}
        >
            {children}
        </button>
    )
}

interface IndicatorRect {
    left: number
    top: number
    width: number
    height: number
}

export function SegmentedControl({
    ref,
    options,
    value: controlledValue,
    defaultValue,
    onChange,
    size = 'md',
    fullWidth = false,
    disabled = false,
    name,
    children,
    className,
    ...props
}: SegmentedControlProps) {
    const generatedId = useId()
    const groupName = name ?? generatedId

    const initialDefault = defaultValue !== undefined ? defaultValue : (options?.[0]?.value ?? '')

    const [value, setValue] = useControllableState<string>({
        value: controlledValue,
        defaultValue: initialDefault,
        onChange,
    })

    const containerRef = useRef<HTMLDivElement | null>(null)
    const [indicatorRect, setIndicatorRect] = useState<IndicatorRect | null>(null)
    const [isReady, setIsReady] = useState(false)

    const setRefs = useCallback(
        (node: HTMLDivElement | null) => {
            containerRef.current = node
            if (typeof ref === 'function') {
                ref(node)
            } else if (ref && typeof ref === 'object' && 'current' in ref) {
                ;(ref as React.MutableRefObject<HTMLDivElement | null>).current = node
            }
        },
        [ref]
    )

    const updateIndicator = useCallback(() => {
        const container = containerRef.current
        if (!container) return

        const activeItem = container.querySelector<HTMLElement>(
            '.mr-segmented-control__item[data-selected="true"]'
        )
        if (!activeItem) {
            setIndicatorRect(null)
            return
        }

        const nextRect: IndicatorRect = {
            left: activeItem.offsetLeft,
            top: activeItem.offsetTop,
            width: activeItem.offsetWidth,
            height: activeItem.offsetHeight,
        }

        setIndicatorRect((prev) => {
            if (
                prev &&
                prev.left === nextRect.left &&
                prev.top === nextRect.top &&
                prev.width === nextRect.width &&
                prev.height === nextRect.height
            ) {
                return prev
            }
            return nextRect
        })
    }, [])

    useIsomorphicLayoutEffect(() => {
        updateIndicator()
    }, [value, size, fullWidth, updateIndicator])

    useEffect(() => {
        const raf = requestAnimationFrame(() => {
            setIsReady(true)
        })
        return () => cancelAnimationFrame(raf)
    }, [])

    useEffect(() => {
        const container = containerRef.current
        if (!container || typeof ResizeObserver === 'undefined') return

        const observer = new ResizeObserver(() => {
            updateIndicator()
        })
        observer.observe(container)

        return () => observer.disconnect()
    }, [updateIndicator])

    const contextValue: SegmentedControlContextValue = {
        value,
        onChange: setValue,
        size,
        disabled,
        name: groupName,
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!options || options.length === 0) return
        const enabledOptions = options.filter((o) => !o.disabled && !disabled)
        if (enabledOptions.length === 0) return

        const currentIndex = enabledOptions.findIndex((o) => o.value === value)

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault()
            const nextIndex = (currentIndex + 1) % enabledOptions.length
            setValue(enabledOptions[nextIndex]!.value)
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault()
            const prevIndex = (currentIndex - 1 + enabledOptions.length) % enabledOptions.length
            setValue(enabledOptions[prevIndex]!.value)
        } else if (e.key === 'Home') {
            e.preventDefault()
            setValue(enabledOptions[0]!.value)
        } else if (e.key === 'End') {
            e.preventDefault()
            setValue(enabledOptions[enabledOptions.length - 1]!.value)
        }
    }

    const indicatorStyle = indicatorRect
        ? {
              transform: `translate3d(${indicatorRect.left}px, ${indicatorRect.top}px, 0)`,
              width: `${indicatorRect.width}px`,
              height: `${indicatorRect.height}px`,
          }
        : undefined

    return (
        <SegmentedControlContext.Provider value={contextValue}>
            <div
                ref={setRefs}
                role="radiogroup"
                data-size={size}
                data-full-width={fullWidth ? true : undefined}
                data-disabled={disabled ? true : undefined}
                data-ready={isReady && indicatorRect !== null ? true : undefined}
                className={cn('mr-segmented-control', className)}
                onKeyDown={handleKeyDown}
                {...props}
            >
                {indicatorRect !== null && (
                    <span
                        className="mr-segmented-control__indicator"
                        aria-hidden="true"
                        style={indicatorStyle}
                    />
                )}
                {options
                    ? options.map((option: SegmentedControlOption) => (
                          <SegmentedControlItem
                              key={option.value}
                              value={option.value}
                              disabled={option.disabled}
                          >
                              {option.label}
                          </SegmentedControlItem>
                      ))
                    : children}
            </div>
        </SegmentedControlContext.Provider>
    )
}

SegmentedControl.Item = SegmentedControlItem

export type {
    SegmentedControlProps,
    SegmentedControlItemProps,
    SegmentedControlOption,
    SegmentedControlSize,
} from './SegmentedControl.types'
