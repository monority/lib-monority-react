import { useId, useMemo, useState, type ReactNode } from 'react'
import { CodeViewer } from '@/shared/components/CodeViewer'
import { PlaygroundHeader, PlaygroundStage, PlaygroundControls } from './components'
import { getDefaultValues, notifyControlResets, formatCode } from './utils'
import type { ComponentPlaygroundProps, PlaygroundControl } from './ComponentPlayground.types'
import './ComponentPlayground.css'

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
        notifyControlResets(controls)
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
            <PlaygroundHeader componentName={resolvedName} onReset={handleReset} />

            {description ? (
                <div className="component-playground__description">{description}</div>
            ) : null}

            <PlaygroundStage>{stageContent}</PlaygroundStage>

            <PlaygroundControls
                controls={controls}
                values={values}
                baseId={baseId}
                onChange={handleValueChange}
            />

            <div className="component-playground__code">
                <CodeViewer code={code} filename={`${resolvedName}.snippet.tsx`} />
            </div>
        </div>
    )
}
