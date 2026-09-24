import { Input } from '@monority/ui/input'
import { NumberInput } from '@monority/ui/number-input'
import { PasswordInput } from '@monority/ui/password-input'

export function InputBasicExample() {
    return <Input label="Email" hint="Use your work email." placeholder="you@company.com" />
}

export function InputSearchExample() {
    return (
        <div style={{ position: 'relative' }}>
            <Input label="Search" placeholder="Search..." type="search" />
        </div>
    )
}

export function InputNumberExample() {
    return <NumberInput label="Quantity" min={0} max={100} step={1} />
}

export function InputPasswordExample() {
    return <PasswordInput label="Password" hint="8+ characters" />
}

export function InputFamilySizesExample() {
    return (
        <div style={{ display: 'grid', gap: 'var(--mr-space-4)' }}>
            <div style={{ display: 'flex', gap: 'var(--mr-space-3)', flexWrap: 'wrap' }}>
                <Input label="Input small" size="sm" />
                <Input label="Input medium" size="md" />
                <Input label="Input large" size="lg" />
            </div>
            <div style={{ display: 'flex', gap: 'var(--mr-space-3)', flexWrap: 'wrap' }}>
                <NumberInput label="Number small" size="sm" />
                <NumberInput label="Number medium" size="md" />
                <NumberInput label="Number large" size="lg" />
            </div>
            <div style={{ display: 'flex', gap: 'var(--mr-space-3)', flexWrap: 'wrap' }}>
                <PasswordInput label="Password small" size="sm" />
                <PasswordInput label="Password medium" size="md" />
                <PasswordInput label="Password large" size="lg" />
            </div>
        </div>
    )
}
