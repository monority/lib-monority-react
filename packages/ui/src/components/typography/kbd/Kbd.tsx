import { cn } from '@/lib/cn'
import type { KbdProps } from './Kbd.types'

export function Kbd({ children, size, keys, className, ref, ...props }: KbdProps) {
    if (keys) {
        return (
            <kbd ref={ref} className={cn('mr-kbd', className)} data-size={size} {...props}>
                {keys.map((key, i) => (
                    <span key={i}>
                        {i > 0 && <span className="mr-kbd__separator">+</span>}
                        <span className="mr-kbd__key">{key}</span>
                    </span>
                ))}
            </kbd>
        )
    }
    return (
        <kbd ref={ref} className={cn('mr-kbd', className)} data-size={size} {...props}>
            {children}
        </kbd>
    )
}
