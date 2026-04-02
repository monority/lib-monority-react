import { useId, useState } from 'react'
import { Field } from './Field'

export function RadioGroup({
    label,
    hint,
    error,
    id,
    className,
    items = [],
    value,
    defaultValue,
    onChange,
    required = false,
    name,
}) {
    const generatedId = useId()
    const groupId = id || generatedId
    const groupName = name || `${groupId}-name`
    const hintId = hint ? `${groupId}-hint` : undefined
    const errorId = error ? `${groupId}-error` : undefined
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = useState(defaultValue ?? '')
    const selectedValue = isControlled ? value : internalValue

    function handleChange(nextValue) {
        if (!isControlled) {
            setInternalValue(nextValue)
        }

        onChange?.(nextValue)
    }

    return (
        <Field
            className={className}
            label={label}
            hint={hint}
            error={error}
            required={required}
            hintId={hintId}
            errorId={errorId}
        >
            <div
                className="ui-radio-group"
                role="radiogroup"
                aria-invalid={Boolean(error)}
                aria-describedby={describedBy}
            >
                {items.map((item) => {
                    const itemId = `${groupId}-${item.value}`
                    const checked = selectedValue === item.value

                    return (
                        <label key={item.value} className="ui-radio" htmlFor={itemId}>
                            <input
                                className="ui-radio__input"
                                id={itemId}
                                name={groupName}
                                type="radio"
                                value={item.value}
                                checked={checked}
                                required={required}
                                onChange={() => handleChange(item.value)}
                                disabled={item.disabled}
                            />
                            <span className="ui-radio__control" aria-hidden="true">
                                <span className="ui-radio__dot" />
                            </span>
                            <span className="ui-radio__body">
                                <span className="ui-radio__label">{item.label}</span>
                                {item.description ? (
                                    <span className="ui-radio__description">{item.description}</span>
                                ) : null}
                            </span>
                        </label>
                    )
                })}
            </div>
        </Field>
    )
}
