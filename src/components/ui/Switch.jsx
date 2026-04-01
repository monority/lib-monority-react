import { useId } from 'react'
import { cn } from '@/lib/cn'

export function Switch({ label, id, className, ...props }) {
    const generatedId = useId()
    const switchId = id || generatedId

    return (
        <label className={cn('ui-switch', className)} htmlFor={switchId}>
            <input className="ui-switch__input" id={switchId} type="checkbox" {...props} />
            <span className="ui-switch__control" aria-hidden="true">
                <span className="ui-switch__thumb" />
            </span>
            {label ? <span className="ui-switch__label">{label}</span> : null}
        </label>
    )
}
