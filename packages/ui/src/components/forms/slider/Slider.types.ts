import type { InputHTMLAttributes, ReactNode, Ref } from 'react'

export type SliderTone = 'neutral' | 'accent' | 'danger'
export type SliderSize = 'sm' | 'md' | 'lg'

export interface SliderProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        'type' | 'size' | 'value' | 'defaultValue' | 'onChange'
    > {
    ref?: Ref<HTMLInputElement>
    tone?: SliderTone
    size?: SliderSize
    label?: ReactNode
    hint?: ReactNode
    error?: ReactNode
    className?: string
    inputClassName?: string
    /** Explicit invalid state. Also implied by `error`. */
    invalid?: boolean
    showValue?: boolean
    /** Whether this slider is a dual-thumb range slider. */
    range?: boolean
    /** Numeric slider value when controlled. Can be a tuple [min, max] when range is true. */
    value?: number | [number, number]
    /** Initial value when uncontrolled. */
    defaultValue?: number | [number, number]
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    /** Called with the numeric slider value on every change. */
    onValueChange?: ((value: number) => void) | ((value: [number, number]) => void)
}
