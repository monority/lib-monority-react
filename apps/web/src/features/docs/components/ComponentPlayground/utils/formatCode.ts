import type { PlaygroundControl } from '../ComponentPlayground.types'
import { getControlKey } from './controlDefaults'

/**
 * Formats a live JSX code snippet based on the current playground properties.
 */
export function formatCode<T extends Record<string, unknown>>(
    componentName: string,
    controls: PlaygroundControl[],
    values: T,
    importCode?: string
): string {
    const propsList: string[] = []
    let childrenContent: string | null = null

    let idx = 0
    for (const ctrl of controls) {
        const key = getControlKey(ctrl, idx)
        const val = ctrl.value !== undefined ? ctrl.value : values[key]

        if (key === 'children') {
            if (typeof val === 'string' && val.length > 0) {
                childrenContent = val
            }
            idx++
            continue
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
        idx++
    }

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
