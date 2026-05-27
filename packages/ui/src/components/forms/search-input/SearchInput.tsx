import { forwardRef, useCallback, useId, useState } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import { Field } from '@/components/forms/field/Field'
import type { SearchInputProps } from './SearchInput.types'

const searchInputVariants = cva({
  base: 'mr-search-input',
  variants: {
    size: {
      sm: 'mr-search-input--sm',
      md: 'mr-search-input--md',
      lg: 'mr-search-input--lg',
    },
  },
  defaultVariants: { size: 'md' },
})

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    {
      size,
      label,
      hint,
      error,
      id,
      className,
      inputClassName,
      disabled = false,
      required = false,
      value,
      defaultValue = '',
      onChange,
      onClear,
      ...props
    },
    ref,
  ) {
    const [internalValue, setInternalValue] = useState(defaultValue)
    const generatedId = useId()
    const inputId = id || generatedId
    const hintId = hint ? `${inputId}-hint` : undefined
    const errorId = error ? `${inputId}-error` : undefined
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
    const resolvedSize = size ?? 'md'
    const isInvalid = Boolean(error)
    const isControlled = value !== undefined
    const displayValue = isControlled ? value : internalValue

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) setInternalValue(event.target.value)
        onChange?.(event)
      },
      [isControlled, onChange],
    )

    const handleClear = useCallback(() => {
      if (!isControlled) setInternalValue('')
      onClear?.()
    }, [isControlled, onClear])

    return (
      <Field
        className={cn('mr-search-input-field', className)}
        htmlFor={inputId}
        label={label}
        hint={hint}
        error={error}
        required={required}
        hintId={hintId}
        errorId={errorId}
      >
        <div className="mr-search-input__wrapper">
          <span className="mr-search-input__icon" aria-hidden="true">🔍</span>
          <input
            ref={ref}
            id={inputId}
            type="search"
            className={cn(
              searchInputVariants({ size: resolvedSize }),
              disabled && 'mr-search-input--disabled',
              isInvalid && 'mr-search-input--error',
              inputClassName,
            )}
            value={value}
            defaultValue={value === undefined ? defaultValue : undefined}
            disabled={disabled}
            required={required}
            aria-invalid={isInvalid || undefined}
            aria-describedby={describedBy}
            data-size={resolvedSize}
            data-disabled={disabled ? true : undefined}
            data-invalid={isInvalid ? true : undefined}
            data-required={required ? true : undefined}
            onChange={handleChange}
            {...props}
          />
          {displayValue ? (
            <button
              type="button"
              className="mr-search-input__clear"
              aria-label="Clear search"
              onClick={handleClear}
              tabIndex={-1}
            >
              ✕
            </button>
          ) : null}
        </div>
      </Field>
    )
  },
)

export type { SearchInputProps, SearchInputSize } from './SearchInput.types'
