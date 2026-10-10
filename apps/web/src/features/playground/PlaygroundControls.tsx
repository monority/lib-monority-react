import type { ControlDefinition, PlaygroundProps } from './playground-types'
import { PlaygroundControlField } from './PlaygroundControlField'

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
                {controls.map((control) => (
                    <PlaygroundControlField
                        key={control.name}
                        slug={slug}
                        control={control}
                        value={values[control.name]}
                        onChange={(value) => onChange(control.name, value)}
                    />
                ))}
            </div>
        </section>
    )
}
