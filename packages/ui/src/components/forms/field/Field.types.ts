import type { HTMLAttributes, LabelHTMLAttributes, ReactNode, Ref } from 'react'

export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    label?: ReactNode
    hint?: ReactNode
    error?: ReactNode
    required?: boolean
    htmlFor?: string
    labelId?: string
    hintId?: string
    errorId?: string
    className?: string
    children?: ReactNode
}

export interface FieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    ref?: Ref<HTMLLabelElement>
    required?: boolean
    children?: ReactNode
}

export interface FieldContentProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}

export interface FieldDescriptionProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>
    children?: ReactNode
}

export interface FieldErrorProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>
    children?: ReactNode
}

export interface FieldGroupProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    direction?: 'row' | 'column'
    children?: ReactNode
}

export interface FieldLegendProps extends HTMLAttributes<HTMLLegendElement> {
    ref?: Ref<HTMLLegendElement>
    required?: boolean
    children?: ReactNode
}

export interface FieldSeparatorProps extends HTMLAttributes<HTMLHRElement> {
    ref?: Ref<HTMLHRElement>
}

export interface FieldSetProps extends HTMLAttributes<HTMLFieldSetElement> {
    ref?: Ref<HTMLFieldSetElement>
    children?: ReactNode
}

export interface FieldTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    ref?: Ref<HTMLHeadingElement>
    as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    children?: ReactNode
}
