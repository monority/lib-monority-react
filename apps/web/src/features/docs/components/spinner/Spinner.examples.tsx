import { Spinner } from '@monority/ui/spinner'
import { Stack } from '@monority/ui/stack'
import { Text } from '@monority/ui/text'

export function SpinnerBasicExample() {
    return <Spinner />
}

export function SpinnerSizesExample() {
    return (
        <Stack direction="horizontal" gap="lg" align="center">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
        </Stack>
    )
}

export function SpinnerTonesExample() {
    return (
        <Stack direction="horizontal" gap="lg" align="center">
            <Spinner tone="base" />
            <Spinner tone="muted" />
            <div
                style={{
                    background: 'var(--mr-bg-inverse)',
                    padding: 'var(--mr-space-3)',
                    borderRadius: 'var(--mr-radius-md)',
                }}
            >
                <Spinner tone="inverse" />
            </div>
        </Stack>
    )
}

export function SpinnerWithTextExample() {
    return (
        <Stack direction="horizontal" gap="sm" align="center">
            <Spinner size="sm" />
            <Text.Small>Publishing updated component docs</Text.Small>
        </Stack>
    )
}
