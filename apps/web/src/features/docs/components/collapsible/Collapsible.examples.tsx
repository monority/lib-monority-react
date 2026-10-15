import { useState } from 'react'
import { Button } from '@monority/ui/button'
import { Collapsible } from '@monority/ui/collapsible'
import { Stack } from '@monority/ui/stack'
import { Text } from '@monority/ui/text'

export function CollapsibleBasicExample() {
    return (
        <Collapsible defaultOpen>
            <Collapsible.Trigger>Release notes summary</Collapsible.Trigger>
            <Collapsible.Content>
                <Text>
                    This release tightens dashboard surfaces, reduces decorative backgrounds, and
                    updates docs imports so lazy routes resolve through component subpaths.
                </Text>
            </Collapsible.Content>
        </Collapsible>
    )
}

export function CollapsibleDefaultOpenExample() {
    return (
        <Collapsible defaultOpen>
            <Collapsible.Trigger>Migration checklist</Collapsible.Trigger>
            <Collapsible.Content>
                <Stack gap="xs">
                    <Text.Small tone="muted">Update shared surfaces and border tokens.</Text.Small>
                    <Text.Small tone="muted">
                        Review display primitives in compact layouts.
                    </Text.Small>
                    <Text.Small tone="muted">
                        Refresh docs examples after runtime imports are stable.
                    </Text.Small>
                </Stack>
            </Collapsible.Content>
        </Collapsible>
    )
}

export function CollapsibleControlledExample() {
    const [open, setOpen] = useState(false)

    return (
        <Stack gap="sm">
            <Collapsible open={open} onOpenChange={setOpen}>
                <Collapsible.Trigger>Controlled delivery notes</Collapsible.Trigger>
                <Collapsible.Content>
                    <Text>
                        Controlled mode is useful when the panel follows a route, validation step,
                        or saved preference instead of owning local state.
                    </Text>
                </Collapsible.Content>
            </Collapsible>
            <Stack direction="horizontal">
                <Button size="sm" variant="secondary" onClick={() => setOpen(!open)}>
                    {open ? 'Hide details' : 'Show details'}
                </Button>
            </Stack>
        </Stack>
    )
}

export function CollapsibleSizesExample() {
    return (
        <Stack gap="md">
            <Collapsible size="sm">
                <Collapsible.Trigger>Compact note</Collapsible.Trigger>
                <Collapsible.Content>
                    <Text size="sm">Use small for terse supporting details in dense panels.</Text>
                </Collapsible.Content>
            </Collapsible>
            <Collapsible size="md" defaultOpen>
                <Collapsible.Trigger>Default note</Collapsible.Trigger>
                <Collapsible.Content>
                    <Text>
                        Medium fits most inline explanations, settings notes, and docs callouts.
                    </Text>
                </Collapsible.Content>
            </Collapsible>
            <Collapsible size="lg">
                <Collapsible.Trigger>Expanded narrative</Collapsible.Trigger>
                <Collapsible.Content>
                    <Text size="lg">
                        Large works when the panel carries multiple sentences or status-heavy
                        instructions that need more breathing room.
                    </Text>
                </Collapsible.Content>
            </Collapsible>
        </Stack>
    )
}
