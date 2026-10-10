import type { ControlDefinition } from './playground-types'
import { ControlBoolean } from './controls/ControlBoolean'
import { ControlNumber } from './controls/ControlNumber'
import { ControlSelect } from './controls/ControlSelect'
import { ControlText } from './controls/ControlText'

export interface PlaygroundControlFieldProps {
    slug: string
    control: ControlDefinition
    value: unknown
    onChange: (value: unknown) => void
}

export function PlaygroundControlField({
    slug,
    control,
    value,
    onChange,
}: PlaygroundControlFieldProps) {
    const id = `pg-${slug}-${control.name}`
    const label = control.label ?? control.name

    if (control.type === 'select') {
        return (
            <ControlSelect
                id={id}
                label={label}
                value={typeof value === 'string' ? value : (control.options[0] ?? '')}
                options={control.options}
                onChange={onChange}
            />
        )
    }

    if (control.type === 'boolean') {
        return (
            <ControlBoolean
                id={id}
                label={label}
                checked={value === true}
                onChange={onChange}
            />
        )
    }

    if (control.type === 'number') {
        return (
            <ControlNumber
                id={id}
                label={label}
                value={typeof value === 'number' ? value : 0}
                min={control.min}
                max={control.max}
                onChange={onChange}
            />
        )
    }

    return (
        <ControlText
            id={id}
            label={label}
            value={typeof value === 'string' ? value : ''}
            placeholder={control.placeholder}
            onChange={onChange}
        />
    )
}
