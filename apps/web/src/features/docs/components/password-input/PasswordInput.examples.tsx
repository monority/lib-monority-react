import { PasswordInput } from '@monority/ui/password-input'

export function PasswordInputBasicPreview() {
    return (
        <div style={{ maxWidth: '320px' }}>
            <PasswordInput
                label="Password"
                hint="Must be at least 8 characters."
                placeholder="Enter password"
            />
        </div>
    )
}

export function PasswordInputSizesExample() {
    return (
        <div style={{ display: 'grid', gap: 'var(--mr-space-3)', maxWidth: '320px' }}>
            <PasswordInput label="Small size" size="sm" defaultValue="secret123" />
            <PasswordInput label="Medium size" size="md" defaultValue="secret123" />
            <PasswordInput label="Large size" size="lg" defaultValue="secret123" />
        </div>
    )
}

export function PasswordInputToggleExample() {
    return (
        <div style={{ display: 'grid', gap: 'var(--mr-space-3)', maxWidth: '320px' }}>
            <PasswordInput
                label="With toggle button"
                hint="Click the eye icon to reveal"
                showToggle={true}
                defaultValue="supersecret"
            />
            <PasswordInput
                label="Without toggle button"
                hint="Toggle is disabled"
                showToggle={false}
                defaultValue="supersecret"
            />
        </div>
    )
}

export function PasswordInputStatesExample() {
    return (
        <div style={{ display: 'grid', gap: 'var(--mr-space-3)', maxWidth: '320px' }}>
            <PasswordInput label="Disabled password" disabled defaultValue="disabledsecret" />
            <PasswordInput
                label="With error"
                error="Password must contain a special character"
                defaultValue="weakpass"
            />
        </div>
    )
}
