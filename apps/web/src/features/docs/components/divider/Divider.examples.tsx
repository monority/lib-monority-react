import { Divider } from '@monority/ui/divider'
import { Text } from '@monority/ui/text'

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
            <Text>Sign in with SSO</Text>
            <Divider label="or" />
            <Text.Muted>Continue with email and password</Text.Muted>
        </div>
    )
}

export function DividerVerticalExample() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', height: 40 }}>
            <Text.Span>Overview</Text.Span>
            <Divider orientation="vertical" />
            <Text.Span>Activity</Text.Span>
            <Divider orientation="vertical" />
            <Text.Span>Settings</Text.Span>
        </div>
    )
}
