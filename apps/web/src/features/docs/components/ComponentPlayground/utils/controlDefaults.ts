import type { PlaygroundControl } from '../ComponentPlayground.types'

/**
 * Returns a stable unique key for a control (name, prop, or fallback index).
 */
export function getControlKey(ctrl: PlaygroundControl, index: number): string {
    return ctrl.name || ctrl.prop || `control_${index}`
}

/**
 * Extracts default values from controls, respecting initial overrides.
 */
export function getDefaultValues<T extends Record<string, unknown>>(
    controls: PlaygroundControl[],
    initialValues?: Partial<T>
): T {
    const values: Record<string, unknown> = {}
    let idx = 0
    for (const ctrl of controls) {
        const key = getControlKey(ctrl, idx)
        const fallback = ctrl.value !== undefined ? ctrl.value : ctrl.defaultValue
        values[key] = initialValues?.[key as keyof T] ?? fallback
        idx++
    }
    return values as T
}

/**
 * Dispatches reset callbacks for controlled items when reset is triggered.
 */
export function notifyControlResets(
    controls: PlaygroundControl[],
    initialDefaults?: Record<string, unknown>
): void {
    let idx = 0
    for (const ctrl of controls) {
        const key = getControlKey(ctrl, idx)
        const fallback =
            ctrl.defaultValue !== undefined ? ctrl.defaultValue : initialDefaults?.[key]
        if (ctrl.type === 'select' && ctrl.onChange && typeof fallback === 'string') {
            ctrl.onChange(fallback)
        } else if (ctrl.type === 'boolean' && ctrl.onChange && typeof fallback === 'boolean') {
            ctrl.onChange(fallback)
        } else if (ctrl.type === 'text' && ctrl.onChange && typeof fallback === 'string') {
            ctrl.onChange(fallback)
        } else if (ctrl.type === 'number' && ctrl.onChange && typeof fallback === 'number') {
            ctrl.onChange(fallback)
        }
        idx++
    }
}
