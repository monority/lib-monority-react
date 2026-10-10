import type { HTMLAttributes, OlHTMLAttributes, ReactNode, Ref } from 'react'

export type StepperOrientation = 'horizontal' | 'vertical'
export type StepStatus = 'completed' | 'active' | 'upcoming'

export interface StepItemData {
    id?: string | number
    title: string
    description?: ReactNode
    status?: StepStatus
}

export interface StepperProps extends OlHTMLAttributes<HTMLOListElement> {
    ref?: Ref<HTMLOListElement>
    activeStep?: number
    orientation?: StepperOrientation
    steps?: StepItemData[]
    children?: ReactNode
}

export interface StepperStepProps extends Omit<HTMLAttributes<HTMLLIElement>, 'title'> {
    ref?: Ref<HTMLLIElement>
    stepNumber?: number | string
    status?: StepStatus
    title?: ReactNode
    description?: ReactNode
    children?: ReactNode
}
