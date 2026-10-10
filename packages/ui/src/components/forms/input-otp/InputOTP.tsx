import {
    createContext,
    useContext,
    useId,
    useRef,
    useState,
    type ChangeEvent,
    type ClipboardEvent,
    type FocusEvent,
    type KeyboardEvent,
} from 'react'
import { cn } from '@/lib/cn'
import type {
    InputOTPGroupProps,
    InputOTPProps,
    InputOTPSeparatorProps,
    InputOTPSlotProps,
} from './InputOTP.types'

interface InputOTPContextValue {
    value: string
    maxLength: number
    focused: boolean
    disabled: boolean
}

const InputOTPContext = createContext<InputOTPContextValue | null>(null)

function useInputOTPContext() {
    const ctx = useContext(InputOTPContext)
    if (!ctx) {
        throw new Error('InputOTP compound components must be rendered inside an InputOTP.')
    }
    return ctx
}

export function InputOTP({
    ref,
    value,
    defaultValue,
    maxLength = 6,
    onChange,
    onComplete,
    disabled = false,
    autoFocus = false,
    pattern = '^[0-9]*$',
    inputMode = 'numeric',
    className,
    children,
    ...props
}: InputOTPProps) {
    const id = useId()
    const inputRef = useRef<HTMLInputElement>(null)
    const [internalValue, setInternalValue] = useState(defaultValue ?? '')
    const [focused, setFocused] = useState(false)

    const isControlled = value !== undefined
    const resolvedValue = isControlled ? value : internalValue

    function updateValue(nextVal: string) {
        let sanitized = nextVal
        if (pattern) {
            const regex = new RegExp(pattern)
            sanitized = nextVal
                .split('')
                .filter((char) => regex.test(char))
                .join('')
        }
        sanitized = sanitized.slice(0, maxLength)

        if (!isControlled) {
            setInternalValue(sanitized)
        }
        onChange?.(sanitized)

        if (sanitized.length === maxLength) {
            onComplete?.(sanitized)
        }
    }

    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        updateValue((e.currentTarget as HTMLInputElement).value)
    }

    function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text')
        updateValue(pastedData)
    }

    function handleFocus(e: FocusEvent<HTMLInputElement>) {
        setFocused(true)
    }

    function handleBlur(e: FocusEvent<HTMLInputElement>) {
        setFocused(false)
    }

    function handleClick() {
        if (!disabled) {
            inputRef.current?.focus()
        }
    }

    return (
        <InputOTPContext.Provider
            value={{
                value: resolvedValue,
                maxLength,
                focused,
                disabled,
            }}
        >
            <div
                ref={ref}
                className={cn('mr-input-otp', className)}
                data-disabled={disabled ? '' : undefined}
                onClick={handleClick}
                {...props}
            >
                <input
                    ref={inputRef}
                    id={id}
                    type="text"
                    inputMode={inputMode}
                    autoComplete="one-time-code"
                    autoFocus={autoFocus}
                    disabled={disabled}
                    maxLength={maxLength}
                    value={resolvedValue}
                    onChange={handleChange}
                    onInput={handleChange}
                    onPaste={handlePaste}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="mr-input-otp__native-input"
                    aria-label="Code de verification"
                />
                {children ? (
                    children
                ) : (
                    // Rendu par defaut si aucun enfant specifique n'est fourni
                    <DefaultOTPLayout maxLength={maxLength} />
                )}
            </div>
        </InputOTPContext.Provider>
    )
}

function DefaultOTPLayout({ maxLength }: { maxLength: number }) {
    if (maxLength === 6) {
        return (
            <>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </>
        )
    }

    return (
        <InputOTPGroup>
            {Array.from({ length: maxLength }, (_, i) => (
                <InputOTPSlot key={i} index={i} />
            ))}
        </InputOTPGroup>
    )
}

function InputOTPGroup({ ref, className, children, ...props }: InputOTPGroupProps) {
    return (
        <div ref={ref} className={cn('mr-input-otp__group', className)} {...props}>
            {children}
        </div>
    )
}

function InputOTPSlot({ ref, index, className, ...props }: InputOTPSlotProps) {
    const { value, maxLength, focused, disabled } = useInputOTPContext()

    const char = value[index]
    const isFilled = char !== undefined && char !== ''
    // Le curseur actif est sur le premier slot vide, ou sur le dernier slot si complet
    const isActive =
        focused &&
        !disabled &&
        (index === value.length || (index === maxLength - 1 && value.length === maxLength))

    return (
        <div
            ref={ref}
            className={cn('mr-input-otp__slot', className)}
            data-active={isActive ? '' : undefined}
            data-filled={isFilled ? '' : undefined}
            {...props}
        >
            {char ?? ''}
            {isActive ? <div className="mr-input-otp__caret" aria-hidden="true" /> : null}
        </div>
    )
}

function InputOTPSeparator({ ref, className, children = '-', ...props }: InputOTPSeparatorProps) {
    return (
        <div
            ref={ref}
            className={cn('mr-input-otp__separator', className)}
            aria-hidden="true"
            {...props}
        >
            {children}
        </div>
    )
}

InputOTP.Group = InputOTPGroup
InputOTP.Slot = InputOTPSlot
InputOTP.Separator = InputOTPSeparator

export { InputOTPGroup, InputOTPSlot, InputOTPSeparator }
