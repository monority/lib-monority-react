import { useId } from 'react'
import { cn } from '@/lib/cn'

export function Checkbox({ label, id, className, ...props }) {
    const generatedId = useId()
    const checkboxId = id || generatedId

    return (
        <label className={cn('ui-checkbox', className)} htmlFor={checkboxId}>
            <input className="ui-checkbox__input" id={checkboxId} type="checkbox" {...props} />
            <span className="ui-checkbox__control" aria-hidden="true" />
            {label ? <span className="ui-checkbox__label">{label}</span> : null}
        </label>
    )
}
