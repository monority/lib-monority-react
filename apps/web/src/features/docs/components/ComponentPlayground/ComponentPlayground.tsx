import { useId, useMemo, useState, type ChangeEvent, type ReactNode } from 'react'
import { CodeViewer } from '@/shared/components/CodeViewer'
import { Button } from '@monority/ui/button'
import { Badge } from '@monority/ui/badge'
import { Select } from '@monority/ui/select'
import { Switch } from '@monority/ui/switch'
import { Input } from '@monority/ui/input'
import type { ComponentPlaygroundProps, PlaygroundControl } from './ComponentPlayground.types'
import './ComponentPlayground.css'

function getControlKey(ctrl: PlaygroundControl, index: number): string {
    return ctrl.name || ctrl.prop || `control_${index}`
}

function getDefaultValues<T extends Record<string, unknown>>(
    controls: PlaygroundControl[],
    initialValues?: Partial<T>
): T {
    const values: Record<string, unknown> = {}
    controls.forEach((ctrl, idx) => {
        const key = getControlKey(ctrl, idx)
        const fallback = ctrl.value !== undefined ? ctrl.value : ctrl.defaultValue
        values[key] = initialValues?.[key as keyof T] ?? fallback
    })
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

    controls.forEach((ctrl, idx) => {
        const key = getControlKey(ctrl, idx)
        const val = ctrl.value !== undefined ? ctrl.value : values[key]

        if (key === 'children') {
            if (typeof val === 'string' && val.length > 0) {
                childrenContent = val
            }
            return
        }

        if (ctrl.type === 'boolean') {
            if (val === true) {
                propsList.push(key)
            } else if (ctrl.defaultValue === true && val === false) {
                propsList.push(`${key}={false}`)
            }
        } else if (ctrl.type === 'select' || ctrl.type === 'text') {
            if (val !== undefined && val !== '' && val !== null) {
                propsList.push(`${key}="${val}"`)
            }
        } else if (ctrl.type === 'number') {
            if (val !== undefined && val !== null) {
                propsList.push(`${key}={${val}}`)
            }
        }
    })

    let jsx = ''
    if (propsList.length <= 2 && !childrenContent) {
        const propsStr = propsList.length > 0 ? ` ${propsList.join(' ')}` : ''
        jsx = `<${componentName}${propsStr} />`
    } else if (propsList.length <= 2 && childrenContent) {
        const propsStr = propsList.length > 0 ? ` ${propsList.join(' ')}` : ''
        jsx = `<${componentName}${propsStr}>${childrenContent}</${componentName}>`
    } else if (childrenContent) {
        const indentedProps = propsList.map((p) => `  ${p}`).join('\n')
        jsx = `<${componentName}\n${indentedProps}\n>\n  ${childrenContent}\n</${componentName}>`
    } else {
        const indentedProps = propsList.map((p) => `  ${p}`).join('\n')
        jsx = `<${componentName}\n${indentedProps}\n/>`
    }

    if (importCode) {
        return `${importCode}\n\n${jsx}`
    }
    return jsx
}

export function ComponentPlayground<T extends Record<string, unknown> = Record<string, unknown>>({
    componentName,
    title,
    description,
    controls = [],
    render,
    children,
    importCode,
    getCode,
    renderCode,
    codeSnippet,
    initialValues,
    className = '',
}: ComponentPlaygroundProps<T>) {
    const baseId = useId()
    const resolvedName = componentName || title || 'Component'
    const [values, setValues] = useState<T>(() => getDefaultValues<T>(controls, initialValues))

    const handleReset = () => {
        const defaults = getDefaultValues<T>(controls, initialValues)
        setValues(defaults)
        controls.forEach((ctrl, idx) => {
            const key = getControlKey(ctrl, idx)
            const fallback = ctrl.defaultValue
            if (ctrl.type === 'select' && ctrl.onChange && typeof fallback === 'string') {
                ctrl.onChange(fallback)
            } else if (ctrl.type === 'boolean' && ctrl.onChange && typeof fallback === 'boolean') {
                ctrl.onChange(fallback)
            } else if (ctrl.type === 'text' && ctrl.onChange && typeof fallback === 'string') {
                ctrl.onChange(fallback)
            } else if (ctrl.type === 'number' && ctrl.onChange && typeof fallback === 'number') {
                ctrl.onChange(fallback)
            }
        })
    }

    const handleValueChange = (ctrl: PlaygroundControl, key: string, value: unknown) => {
        setValues((prev) => ({
            ...prev,
            [key]: value,
        }))

        if (ctrl.type === 'select' && ctrl.onChange) {
            ctrl.onChange(String(value))
        } else if (ctrl.type === 'boolean' && ctrl.onChange) {
            ctrl.onChange(Boolean(value))
        } else if (ctrl.type === 'text' && ctrl.onChange) {
            ctrl.onChange(String(value))
        } else if (ctrl.type === 'number' && ctrl.onChange) {
            ctrl.onChange(Number(value))
        }
    }

    const code = useMemo(() => {
        if (codeSnippet) {
            return codeSnippet
        }
        if (renderCode) {
            return renderCode(values)
        }
        if (getCode) {
            return getCode(values)
        }
        return formatCode(resolvedName, controls, values, importCode)
    }, [codeSnippet, renderCode, getCode, resolvedName, controls, values, importCode])

    const stageContent: ReactNode = useMemo(() => {
        if (render) {
            return render(values)
        }
        if (typeof children === 'function') {
            return children(values)
        }
        return children ?? null
    }, [render, children, values])

    return (
        <div className={`component-playground ${className}`.trim()}>
            <div className="component-playground__header">
                <div className="component-playground__title-group">
                    <Badge variant="default" tone="accent" size="sm">
                        Playground
                    </Badge>
                    <span className="component-playground__component-name">{resolvedName}</span>
                </div>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    aria-label="Reset"
                    title="Reset"
                >
                    Reset
                </Button>
            </div>

            {description ? (
                <div className="component-playground__description">{description}</div>
            ) : null}

            <div className="component-playground__stage">
                <div className="component-playground__canvas">{stageContent}</div>
            </div>

            {controls.length > 0 && (
                <div className="component-playground__controls-panel">
                    <div className="component-playground__controls-header">
                        <span className="component-playground__controls-title">
                            Propriétés dynamiques
                        </span>
                    </div>
                    <div className="component-playground__controls-grid">
                        {controls.map((ctrl, idx) => {
                            const key = getControlKey(ctrl, idx)
                            const controlId = `${baseId}-${key}`
                            const currentVal = ctrl.value !== undefined ? ctrl.value : values[key]

                            if (ctrl.type === 'select') {
                                const normalizedOptions = ctrl.options.map((opt) =>
                                    typeof opt === 'string' ? { value: opt, label: opt } : opt
                                )

                                return (
                                    <div key={key} className="component-playground__control-item">
                                        <Select
                                            id={controlId}
                                            size="sm"
                                            label={ctrl.label}
                                            hint={ctrl.description}
                                            options={normalizedOptions}
                                            value={String(currentVal ?? ctrl.defaultValue ?? '')}
                                            onChange={(e) =>
                                                handleValueChange(ctrl, key, e.target.value)
                                            }
                                        />
                                    </div>
                                )
                            }

                            if (ctrl.type === 'boolean') {
                                return (
                                    <div
                                        key={key}
                                        className="component-playground__control-item component-playground__control-item--switch"
                                    >
                                        <Switch
                                            id={controlId}
                                            size="sm"
                                            label={ctrl.label}
                                            hint={ctrl.description}
                                            checked={Boolean(currentVal)}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                handleValueChange(ctrl, key, e.target.checked)
                                            }
                                        />
                                    </div>
                                )
                            }

                            if (ctrl.type === 'text') {
                                return (
                                    <div key={key} className="component-playground__control-item">
                                        <Input
                                            id={controlId}
                                            size="sm"
                                            label={ctrl.label}
                                            hint={ctrl.description}
                                            placeholder={ctrl.placeholder}
                                            value={String(currentVal ?? '')}
                                            onChange={(e) =>
                                                handleValueChange(ctrl, key, e.target.value)
                                            }
                                        />
                                    </div>
                                )
                            }

                            if (ctrl.type === 'number') {
                                return (
                                    <div key={key} className="component-playground__control-item">
                                        <Input
                                            id={controlId}
                                            type="number"
                                            size="sm"
                                            label={ctrl.label}
                                            hint={ctrl.description}
                                            min={ctrl.min}
                                            max={ctrl.max}
                                            step={ctrl.step}
                                            value={String(currentVal ?? ctrl.defaultValue ?? 0)}
                                            onChange={(e) =>
                                                handleValueChange(
                                                    ctrl,
                                                    key,
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
                <CodeViewer code={code} filename={`${resolvedName}.snippet.tsx`} />
            </div>
        </div>
    )
}
