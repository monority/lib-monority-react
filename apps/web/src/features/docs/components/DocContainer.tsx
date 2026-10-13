import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface DocContainerProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children: ReactNode
    size?: 'default' | 'wide'
}

export function DocContainer({
    ref,
    children,
    size = 'default',
    className = '',
    ...props
}: DocContainerProps) {
    return (
        <div
            ref={ref}
            className={`docs-container docs-container--${size} ${className}`.trim()}
            {...props}
        >
            {children}
        </div>
    )
}
