import { Button } from '@monority/ui/button'
import { Field } from '@monority/ui/field'
import { Input } from '@monority/ui/input'
import { Popover } from '@monority/ui/popover'
import { Stack } from '@monority/ui/stack'
import { Text } from '@monority/ui/text'

export function PopoverBasicExample() {
    return (
        <Popover trigger={<Button>Inspect token</Button>}>
            <Stack gap="xs">
                <Text.Strong size="sm">Surface token</Text.Strong>
                <Text tone="muted" size="sm">
                    Use elevated surfaces for contextual panels, menus, and transient editing flows.
                </Text>
            </Stack>
        </Popover>
    )
}

export function PopoverWithFormExample() {
    return (
        <Popover trigger={<Button variant="secondary">Quick edit</Button>}>
            <Stack gap="sm" style={{ minWidth: 220 }}>
                <Text.Strong size="sm">Rename view</Text.Strong>
                <Field label="Name">
                    <Input placeholder="Quarterly health" />
                </Field>
                <Button size="sm">Save</Button>
            </Stack>
        </Popover>
    )
}

export function PopoverAlignmentExample() {
    return (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Popover trigger={<Button>Start</Button>} align="start">
                <Text tone="muted" size="sm">
                    Aligned to start edge.
                </Text>
            </Popover>
            <Popover trigger={<Button>Center</Button>} align="center">
                <Text tone="muted" size="sm">
                    Centered for compact callouts.
                </Text>
            </Popover>
            <Popover trigger={<Button>End</Button>} align="end">
                <Text tone="muted" size="sm">
                    Aligned to end edge.
                </Text>
            </Popover>
        </div>
    )
}
