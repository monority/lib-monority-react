import { useId, useMemo, useState } from 'react'
import { CodeViewer } from '@/shared/components/CodeViewer'
import type { ComponentPlaygroundProps, PlaygroundControl } from './ComponentPlayground.types'
import './ComponentPlayground.css'

function getDefaultValues<T extends Record<string, unknown>>(
    controls: PlaygroundControl[],
    initialValues?: Partial<T>
): T {
    const values: Record<string, unknown> = {}
    for (const ctrl of controls) {
        values[ctrl.name] = initialValues?.[ctrl.name as keyof T] ?? ctrl.defaultValue
    }
    return values as T
}

function formatCode<T extends Record<string, unknown>>(
    componentName: string,
    controls: PlaygroundControl[],
    values: T,
    importCode?: string
): string {
    const propsList: string[] = []
    let childrenContent: string | null = null

    for (const ctrl of controls) {
        const val = values[ctrl.name]
        if (ctrl.name === 'children') {
            if (typeof val === 'string' && val.length > 0) {
                childrenContent = val
            }
            continue
        }

        if (ctrl.type === 'boolean') {
            if (val === true) {
                propsList.push(ctrl.name)
            }
        } else if (ctrl.type === 'select' || ctrl.type === 'text') {
            if (val !== undefined && val !== '' && val !== null) {
                propsList.push(`${ctrl.name}="${val}"`)
            }
        } else if (ctrl.type === 'number') {
            if (val !== undefined && val !== null) {
                propsList.push(`${ctrl.name}={${val}}`)
            }
        }
    }

    const propsStr = propsList.length > 0 ? ` ${propsList.join(' ')}` : ''
    let jsx = ''
    if (childrenContent) {
        jsx = `<${componentName}${propsStr}>\n  ${childrenContent}\n</${componentName}>`
    } else {
        jsx = `<${componentName}${propsStr} />`
    }

    if (importCode) {
        return `${importCode}\n\n${jsx}`
    }
    return jsx
}

export function ComponentPlayground<T extends Record<string, unknown> = Record<string, unknown>>({
    componentName,
    controls,
    render,
    importCode,
    getCode,
    initialValues,
    className = '',
}: ComponentPlaygroundProps<T>) {
    const baseId = useId()
    const [values, setValues] = useState<T>(() => getDefaultValues<T>(controls, initialValues))

    const handleReset = () => {
        setValues(getDefaultValues<T>(controls, initialValues))
    }

    const handleValueChange = (name: string, value: unknown) => {
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const code = useMemo(() => {
        if (getCode) {
            return getCode(values)
        }
        return formatCode(componentName, controls, values, importCode)
    }, [getCode, componentName, controls, values, importCode])

    return (
        <div className={`component-playground ${className}`.trim()}>
            <div className="component-playground__header">
                <div className="component-playground__title-group">
                    <span className="component-playground__badge">Playground</span>
                    <span className="component-playground__component-name">{componentName}</span>
                </div>
                <button
                    type="button"
                    onClick={handleReset}
                    className="component-playground__reset-btn"
                    title="Reinitialiser les proprietes"
                >
                    Reset
                </button>
            </div>

            <div className="component-playground__stage">
                <div className="component-playground__canvas">{render(values)}</div>
            </div>

            {controls.length > 0 && (
                <div className="component-playground__controls-panel">
                    <div className="component-playground__controls-header">
                        <span className="component-playground__controls-title">Proprietes</span>
                    </div>
                    <div className="component-playground__controls-grid">
                        {controls.map((ctrl) => {
                            const controlId = `${baseId}-${ctrl.name}`
                            const currentVal = values[ctrl.name]

                            if (ctrl.type === 'select') {
                                return (
                                    <div
                                        key={ctrl.name}
                                        className="component-playground__control-item"
                                    >
                                        <label
                                            htmlFor={controlId}
                                            className="component-playground__control-label"
                                        >
                                            {ctrl.label}
                                        </label>
                                        <select
                                            id={controlId}
                                            className="component-playground__select"
                                            value={String(currentVal ?? ctrl.defaultValue)}
                                            onChange={(e) =>
                                                handleValueChange(ctrl.name, e.target.value)
                                            }
                                        >
                                            {ctrl.options.map((opt) => (
                                                <option key={opt} value={opt}>
                                                    {opt}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )
                            }

                            if (ctrl.type === 'boolean') {
                                return (
                                    <div
                                        key={ctrl.name}
                                        className="component-playground__control-item"
                                    >
                                        <label className="component-playground__control-checkbox-label">
                                            <input
                                                id={controlId}
                                                type="checkbox"
                                                className="component-playground__checkbox"
                                                checked={Boolean(currentVal)}
                                                onChange={(e) =>
                                                    handleValueChange(ctrl.name, e.target.checked)
                                                }
                                            />
                                            <span>{ctrl.label}</span>
                                        </label>
                                    </div>
                                )
                            }

                            if (ctrl.type === 'text') {
                                return (
                                    <div
                                        key={ctrl.name}
                                        className="component-playground__control-item"
                                    >
                                        <label
                                            htmlFor={controlId}
                                            className="component-playground__control-label"
                                        >
                                            {ctrl.label}
                                        </label>
                                        <input
                                            id={controlId}
                                            type="text"
                                            className="component-playground__input"
                                            value={String(currentVal ?? '')}
                                            onChange={(e) =>
                                                handleValueChange(ctrl.name, e.target.value)
                                            }
                                        />
                                    </div>
                                )
                            }

                            if (ctrl.type === 'number') {
                                return (
                                    <div
                                        key={ctrl.name}
                                        className="component-playground__control-item"
                                    >
                                        <label
                                            htmlFor={controlId}
                                            className="component-playground__control-label"
                                        >
                                            {ctrl.label}
                                        </label>
                                        <input
                                            id={controlId}
                                            type="number"
                                            min={ctrl.min}
                                            max={ctrl.max}
                                            step={ctrl.step}
                                            className="component-playground__input"
                                            value={Number(currentVal ?? ctrl.defaultValue)}
                                            onChange={(e) =>
                                                handleValueChange(
                                                    ctrl.name,
                                                    parseFloat(e.target.value) || 0
                                                )
                                            }
                                        />
                                    </div>
                                )
                            }

                            return null
                        })}
                    </div>
                </div>
            )}

            <div className="component-playground__code">
                <CodeViewer code={code} filename={`${componentName}.snippet.tsx`} />
            </div>
        </div>
    )
}
