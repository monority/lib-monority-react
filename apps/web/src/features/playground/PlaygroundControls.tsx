import type { ControlDefinition, PlaygroundProps } from './playground-types'
import { ControlBoolean } from './controls/ControlBoolean'
import { ControlNumber } from './controls/ControlNumber'
import { ControlSelect } from './controls/ControlSelect'
import { ControlText } from './controls/ControlText'

interface PlaygroundControlsProps {
    slug: string
    controls: ControlDefinition[]
    values: PlaygroundProps
    onChange: (name: string, value: unknown) => void
    onReset: () => void
}

export function PlaygroundControls({
    slug,
    controls,
    values,
    onChange,
    onReset,
}: PlaygroundControlsProps) {
    return (
        <section className="pg-controls" aria-label="Controls">
            <div className="pg-controls__header">
                <p className="pg-preview__kicker">Controls</p>
                <button type="button" className="pg-code__copy" onClick={onReset}>
                    Reset
                </button>
            </div>
            <div className="pg-controls__grid">
                {controls.map((control) => {
                    const id = `pg-${slug}-${control.name}`
                    const label = control.label ?? control.name
                    const current = values[control.name]

                    if (control.type === 'select') {
                        return (
                            <ControlSelect
                                key={control.name}
                                id={id}
                                label={label}
                                value={
                                    typeof current === 'string'
                                        ? current
                                        : (control.options[0] ?? '')
                                }
                                options={control.options}
                                onChange={(value) => onChange(control.name, value)}
                            />
                        )
                    }

                    if (control.type === 'boolean') {
                        return (
                            <ControlBoolean
                                key={control.name}
                                id={id}
                                label={label}
                                checked={current === true}
                                onChange={(value) => onChange(control.name, value)}
                            />
                        )
                    }

                    if (control.type === 'number') {
                        return (
                            <ControlNumber
                                key={control.name}
                                id={id}
                                label={label}
                                value={typeof current === 'number' ? current : 0}
                                min={control.min}
                                max={control.max}
                                onChange={(value) => onChange(control.name, value)}
                            />
                        )
                    }

                    return (
                        <ControlText
                            key={control.name}
                            id={id}
                            label={label}
                            value={typeof current === 'string' ? current : ''}
                            placeholder={control.placeholder}
                            onChange={(value) => onChange(control.name, value)}
                        />
                    )
                })}
            </div>
        </section>
    )
}
