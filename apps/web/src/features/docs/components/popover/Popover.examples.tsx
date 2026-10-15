import { Button } from '@monority/ui/button'
import { Field } from '@monority/ui/field'
import { Input } from '@monority/ui/input'
import { Popover } from '@monority/ui/popover'
import { Stack } from '@monority/ui/stack'
import { Text } from '@monority/ui/text'

export function PopoverBasicExample() {
    return (
        <Popover>
            <Popover.Trigger>
                <Button>Inspect token</Button>
            </Popover.Trigger>
            <Popover.Content>
                <Stack gap="xs">
                    <Text.Strong size="sm">Surface token</Text.Strong>
                    <Text tone="muted" size="sm">
                        Use elevated surfaces for contextual panels, menus, and transient editing
                        flows.
                    </Text>
                </Stack>
            </Popover.Content>
        </Popover>
    )
}

export function PopoverWithFormExample() {
    return (
        <Popover>
            <Popover.Trigger>
                <Button variant="secondary">Quick edit</Button>
            </Popover.Trigger>
            <Popover.Content>
                <Stack gap="sm" style={{ minWidth: 220 }}>
                    <Text.Strong size="sm">Rename view</Text.Strong>
                    <Field label="Name">
                        <Input placeholder="Quarterly health" />
                    </Field>
                    <Button size="sm">Save</Button>
                </Stack>
            </Popover.Content>
        </Popover>
    )
}

export function PopoverAlignmentExample() {
    return (
        <Stack direction="horizontal" gap="md">
            <Popover align="start">
                <Popover.Trigger>
                    <Button>Start</Button>
                </Popover.Trigger>
                <Popover.Content>
                    <Text tone="muted" size="sm">
                        Aligned to start edge.
                    </Text>
                </Popover.Content>
            </Popover>
            <Popover align="center">
                <Popover.Trigger>
                    <Button>Center</Button>
                </Popover.Trigger>
                <Popover.Content>
                    <Text tone="muted" size="sm">
                        Centered for compact callouts.
                    </Text>
                </Popover.Content>
            </Popover>
            <Popover align="end">
                <Popover.Trigger>
                    <Button>End</Button>
                </Popover.Trigger>
                <Popover.Content>
                    <Text tone="muted" size="sm">
                        Aligned to end edge.
                    </Text>
                </Popover.Content>
            </Popover>
        </Stack>
    )
}
