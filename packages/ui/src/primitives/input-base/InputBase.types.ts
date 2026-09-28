import type { ComponentPropsWithoutRef, ReactNode, Ref } from 'react'

export type InputBaseAs = 'input' | 'textarea' | 'select'

export type InputBaseSize = 'sm' | 'md' | 'lg'
export type InputBaseTone = 'neutral' | 'accent' | 'danger'

type InputBaseElement<T extends InputBaseAs> = T extends 'input'
    ? HTMLInputElement
    : T extends 'textarea'
      ? HTMLTextAreaElement
      : HTMLSelectElement

interface InputBaseOwnProps {
    size?: InputBaseSize
    tone?: InputBaseTone
    invalid?: boolean
    disabled?: boolean
    required?: boolean
    className?: string
    children?: ReactNode
    id?: string
}

/**
 * Props typées par élément : `as` discrimine l'union, si bien que `type`,
 * `rows`, `multiple`… ne sont acceptés que par l'élément correspondant.
 */
type InputBasePropsFor<T extends InputBaseAs> = InputBaseOwnProps &
    Omit<ComponentPropsWithoutRef<T>, keyof InputBaseOwnProps | 'as'> & {
        as: T
        ref?: Ref<InputBaseElement<T>>
    }

export type InputBaseProps = { [T in InputBaseAs]: InputBasePropsFor<T> }[InputBaseAs]
