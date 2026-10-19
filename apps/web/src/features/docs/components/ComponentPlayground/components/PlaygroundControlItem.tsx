import { Input } from '@monority/ui/input'
import { Select } from '@monority/ui/select'
import { Switch } from '@monority/ui/switch'
import type { ChangeEvent } from 'react'
import type { PlaygroundControl } from '../ComponentPlayground.types'

export interface PlaygroundControlItemProps {
    control: PlaygroundControl
    controlKey: string
    baseId: string
    value: unknown
    onChange: (ctrl: PlaygroundControl, key: string, value: unknown) => void
}

export function PlaygroundControlItem({
    control,
    controlKey,
    baseId,
    value,
    onChange,
}: PlaygroundControlItemProps) {
    const controlId = `${baseId}-${controlKey}`

    if (control.type === 'select') {
        const normalizedOptions = control.options.map((opt) =>
            typeof opt === 'string' ? { value: opt, label: opt } : opt
        )

        return (
            <div className="component-playground__control-item">
                <Select
                    id={controlId}
                    size="sm"
                    label={control.label}
                    hint={control.description}
                    options={normalizedOptions}
                    value={String(value ?? control.defaultValue ?? '')}
                    onChange={(e) => onChange(control, controlKey, e.target.value)}
                />
            </div>
        )
    }

    if (control.type === 'boolean') {
        return (
            <div className="component-playground__control-item component-playground__control-item--switch">
                <Switch
                    id={controlId}
                    size="sm"
                    label={control.label}
                    hint={control.description}
                    checked={Boolean(value)}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onChange(control, controlKey, e.target.checked)
                    }
                />
            </div>
        )
    }

    if (control.type === 'text') {
        return (
            <div className="component-playground__control-item">
                <Input
                    id={controlId}
                    size="sm"
                    label={control.label}
                    hint={control.description}
                    placeholder={control.placeholder}
                    value={String(value ?? '')}
                    onChange={(e) => onChange(control, controlKey, e.target.value)}
                />
            </div>
        )
    }

    if (control.type === 'number') {
        return (
            <div className="component-playground__control-item">
                <Input
                    id={controlId}
                    type="number"
                    size="sm"
                    label={control.label}
                    hint={control.description}
                    min={control.min}
                    max={control.max}
                    step={control.step}
                    value={String(value ?? control.defaultValue ?? 0)}
                    onChange={(e) =>
                        onChange(control, controlKey, Number.parseFloat(e.target.value) || 0)
                    }
                />
            </div>
        )
    }

    return null
}
