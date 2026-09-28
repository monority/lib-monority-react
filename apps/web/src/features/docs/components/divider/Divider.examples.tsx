import { Divider } from '@monority/ui/divider'

export function DividerBasicExample() {
    return (
        <div style={{ width: 320 }}>
            <Divider />
        </div>
    )
}

export function DividerWithLabelExample() {
    return (
        <div style={{ maxWidth: 360 }}>
            <p style={{ margin: 0 }}>Sign in with SSO</p>
            <Divider label="or" />
            <p style={{ margin: 0, color: 'var(--mr-fg-muted)' }}>
                Continue with email and password
            </p>
        </div>
    )
}

export function DividerVerticalExample() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', height: 40 }}>
            <span>Overview</span>
            <Divider orientation="vertical" />
            <span>Activity</span>
            <Divider orientation="vertical" />
            <span>Settings</span>
        </div>
    )
}
