import type { ReactNode } from 'react'

export type SelectOption = string | { value: string; label: string }

export interface BaseControl {
    label: string
    name?: string
    prop?: string
    description?: string
}

export interface SelectControl extends BaseControl {
    type: 'select'
    options: SelectOption[]
    defaultValue?: string
    value?: string
    onChange?: (val: string) => void
}

export interface BooleanControl extends BaseControl {
    type: 'boolean'
    defaultValue?: boolean
    value?: boolean
    onChange?: (val: boolean) => void
}

export interface TextControl extends BaseControl {
    type: 'text'
    defaultValue?: string
    value?: string
    placeholder?: string
    onChange?: (val: string) => void
}

export interface NumberControl extends BaseControl {
    type: 'number'
    defaultValue?: number
    value?: number
    min?: number
    max?: number
    step?: number
    onChange?: (val: number) => void
}

export type PlaygroundControl = SelectControl | BooleanControl | TextControl | NumberControl

export interface DocPlaygroundConfig<T extends Record<string, unknown> = Record<string, unknown>> {
    controls: PlaygroundControl[]
    render: (props: T) => ReactNode
    getCode?: (props: T) => string
    initialValues?: Partial<T>
}

export interface ComponentPlaygroundProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> {
    componentName?: string
    title?: string
    description?: string
    controls?: PlaygroundControl[]
    render?: (props: T) => ReactNode
    children?: ReactNode | ((props: T) => ReactNode)
    importCode?: string
    getCode?: (props: T) => string
    renderCode?: (props: T) => string
    codeSnippet?: string
    initialValues?: Partial<T>
    className?: string
}
