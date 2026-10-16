import type { ReactNode } from 'react'

export interface SelectControl {
    type: 'select'
    name: string
    label: string
    options: string[]
    defaultValue: string
    description?: string
}

export interface BooleanControl {
    type: 'boolean'
    name: string
    label: string
    defaultValue: boolean
    description?: string
}

export interface TextControl {
    type: 'text'
    name: string
    label: string
    defaultValue: string
    description?: string
}

export interface NumberControl {
    type: 'number'
    name: string
    label: string
    defaultValue: number
    min?: number
    max?: number
    step?: number
    description?: string
}

export type PlaygroundControl = SelectControl | BooleanControl | TextControl | NumberControl

export interface ComponentPlaygroundProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> {
    componentName: string
    controls: PlaygroundControl[]
    render: (props: T) => ReactNode
    importCode?: string
    getCode?: (props: T) => string
    initialValues?: Partial<T>
    className?: string
}
