import type { Ref, SVGProps } from 'react'

export interface IconProps extends SVGProps<SVGSVGElement> {
    ref?: Ref<SVGSVGElement>
    size?: number | string
    strokeWidth?: number | string
    className?: string
}
