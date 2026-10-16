import type { PlaygroundControl } from '../ComponentPlayground.types'
import { getControlKey } from '../utils/controlDefaults'
import { PlaygroundControlItem } from './PlaygroundControlItem'

export interface PlaygroundControlsProps {
    controls: PlaygroundControl[]
    values: Record<string, unknown>
    baseId: string
    onChange: (ctrl: PlaygroundControl, key: string, value: unknown) => void
    title?: string
}

export function PlaygroundControls({
    controls,
    values,
    baseId,
    onChange,
    title = 'Propriétés dynamiques',
}: PlaygroundControlsProps) {
    if (controls.length === 0) {
        return null
    }

    return (
        <div className="component-playground__controls-panel">
            <div className="component-playground__controls-header">
                <span className="component-playground__controls-title">{title}</span>
            </div>
            <div className="component-playground__controls-grid">
                {controls.map((ctrl, idx) => {
                    const key = getControlKey(ctrl, idx)
                    const val = ctrl.value !== undefined ? ctrl.value : values[key]
                    return (
                        <PlaygroundControlItem
                            key={key}
                            control={ctrl}
                            controlKey={key}
                            baseId={baseId}
                            value={val}
                            onChange={onChange}
                        />
                    )
                })}
            </div>
        </div>
    )
}
