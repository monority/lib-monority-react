import { useState } from 'react'
import { cn } from '@/lib/cn'
import { FormControl, useFormControl } from '@/primitives/form-control'
import { InputBase } from '@/primitives/input-base'
import { Field } from '@/components/forms/field/Field'
import type { SliderProps } from './Slider.types'

export function Slider({
    ref,
    tone,
    size,
    label,
    hint,
    error,
    id,
    className,
    inputClassName,
    style,
    range = false,
    value,
    defaultValue = range ? [25, 75] : 50,
    min = 0,
    max = 100,
    step = 1,
    showValue = true,
    disabled = false,
    required = false,
    invalid = false,
    onChange,
    onValueChange,
    ...props
}: SliderProps) {
    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = useState(defaultValue)
    const isInvalid = invalid || Boolean(error)
    const currentVal = isControlled ? value : internalValue
    const resolvedTone = tone ?? 'neutral'

    const numMin = typeof min === 'number' ? min : Number(min ?? 0)
    const numMax = typeof max === 'number' ? max : Number(max ?? 100)

    if (range) {
        const rangeVal: [number, number] = Array.isArray(currentVal)
            ? [currentVal[0], currentVal[1]]
            : [numMin, typeof currentVal === 'number' ? currentVal : numMax]

        const lowerPercent =
            numMax > numMin
                ? Math.min(100, Math.max(0, ((rangeVal[0] - numMin) / (numMax - numMin)) * 100))
                : 0
        const upperPercent =
            numMax > numMin
                ? Math.min(100, Math.max(0, ((rangeVal[1] - numMin) / (numMax - numMin)) * 100))
                : 100

        const handleLowerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const nextLower = Math.min(Number(e.target.value), rangeVal[1])
            const nextTuple: [number, number] = [nextLower, rangeVal[1]]
            if (!isControlled) setInternalValue(nextTuple)
            if (onValueChange) (onValueChange as (val: [number, number]) => void)(nextTuple)
            onChange?.(e)
        }

        const handleUpperChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const nextUpper = Math.max(Number(e.target.value), rangeVal[0])
            const nextTuple: [number, number] = [rangeVal[0], nextUpper]
            if (!isControlled) setInternalValue(nextTuple)
            if (onValueChange) (onValueChange as (val: [number, number]) => void)(nextTuple)
            onChange?.(e)
        }

        return (
            <FormControl
                id={id}
                size={size}
                tone={resolvedTone}
                hint={!!hint}
                error={!!error}
                disabled={disabled}
                required={required}
                invalid={isInvalid}
            >
                <Field
                    className={cn('mr-slider-field', className)}
                    label={label}
                    hint={hint}
                    error={error}
                >
                    <div className="mr-slider__row">
                        <div
                            className="mr-slider-range-container"
                            style={{
                                ...style,
                                ['--mr-slider-lower' as string]: `${lowerPercent}%`,
                                ['--mr-slider-upper' as string]: `${upperPercent}%`,
                            }}
                        >
                            <InputBase
                                as="input"
                                type="range"
                                ref={ref}
                                aria-label="Minimum"
                                className={cn(
                                    'mr-slider mr-slider--range mr-slider--lower',
                                    inputClassName
                                )}
                                min={min}
                                max={max}
                                step={step}
                                value={rangeVal[0]}
                                onChange={handleLowerChange}
                                disabled={disabled}
                                {...props}
                            />
                            <InputBase
                                as="input"
                                type="range"
                                aria-label="Maximum"
                                className={cn(
                                    'mr-slider mr-slider--range mr-slider--upper',
                                    inputClassName
                                )}
                                min={min}
                                max={max}
                                step={step}
                                value={rangeVal[1]}
                                onChange={handleUpperChange}
                                disabled={disabled}
                                {...props}
                            />
                        </div>
                        {showValue ? (
                            <output className="mr-slider__value" htmlFor={id || undefined}>
                                {`${rangeVal[0]} – ${rangeVal[1]}`}
                            </output>
                        ) : null}
                    </div>
                </Field>
            </FormControl>
        )
    }

    const numValue = typeof currentVal === 'number' ? currentVal : Number(currentVal ?? numMin)
    const progressPercent =
        numMax > numMin
            ? Math.min(100, Math.max(0, ((numValue - numMin) / (numMax - numMin)) * 100))
            : 0

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const nextValue = Number(event.target.value)
        if (!isControlled) setInternalValue(nextValue)
        if (onValueChange) (onValueChange as (val: number) => void)(nextValue)
        onChange?.(event)
    }

    return (
        <FormControl
            id={id}
            size={size}
            tone={resolvedTone}
            hint={!!hint}
            error={!!error}
            disabled={disabled}
            required={required}
            invalid={isInvalid}
        >
            <Field
                className={cn('mr-slider-field', className)}
                label={label}
                hint={hint}
                error={error}
            >
                <div className="mr-slider__row">
                    <InputBase
                        as="input"
                        type="range"
                        ref={ref}
                        className={cn('mr-slider', inputClassName)}
                        style={{
                            ...style,
                            ['--mr-slider-progress' as string]: `${progressPercent}%`,
                        }}
                        min={min}
                        max={max}
                        step={step}
                        value={typeof value === 'number' ? value : undefined}
                        defaultValue={
                            value === undefined
                                ? typeof defaultValue === 'number'
                                    ? defaultValue
                                    : 50
                                : undefined
                        }
                        onChange={handleChange}
                        {...props}
                    />
                    {showValue ? (
                        <output className="mr-slider__value" htmlFor={id || undefined}>
                            {numValue}
                        </output>
                    ) : null}
                </div>
            </Field>
        </FormControl>
    )
}

export type { SliderProps, SliderSize, SliderTone } from './Slider.types'
