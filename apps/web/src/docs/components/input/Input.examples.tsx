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
