import type { ReactNode } from 'react'

export type ControlDefinition =
    | { name: string; type: 'select'; label?: string; options: readonly string[] }
    | { name: string; type: 'boolean'; label?: string }
    | { name: string; type: 'text'; label?: string; placeholder?: string }
    | { name: string; type: 'number'; label?: string; min?: number; max?: number }

export type PlaygroundProps = Record<string, unknown>

export interface PlaygroundDefinition {
    slug: string
    label: string
    docsPath: string
    importStatement: string
    controls: ControlDefinition[]
    defaultProps: PlaygroundProps
    render: (props: PlaygroundProps) => ReactNode
    generateCode: (props: PlaygroundProps) => string
}

export function formatPropValue(value: unknown): string {
    if (typeof value === 'string') return `"${value}"`
    if (typeof value === 'boolean') return value ? 'true' : 'false'
    if (typeof value === 'number') return String(value)
    return JSON.stringify(value)
}
