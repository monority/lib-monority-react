import { Stack } from '@monority/ui/stack'
import { Text } from '@monority/ui/text'

const sample =
    'Use text styles to balance metadata, body copy, and emphasis without breaking visual rhythm.'

export function TextBasicExample() {
    return (
        <Stack gap="sm">
            <Text as="p" size="sm" tone="muted">
                Smaller muted text works well for release dates, helper copy, and low-priority
                product metadata.
            </Text>
            <Text as="p" size="md" tone="base">
                Base body text should carry the core explanation for a page, panel, or settings
                section without feeling heavy.
            </Text>
            <Text as="p" size="lg" tone="strong">
                Stronger large text is useful for short statements that need a little more presence
                inside a dense interface.
            </Text>
        </Stack>
    )
}

export function TextSizesExample() {
    return (
        <Stack gap="xs">
            <Text size="sm">{sample}</Text>
            <Text size="md">{sample}</Text>
            <Text size="lg">{sample}</Text>
        </Stack>
    )
}

export function TextTonesExample() {
    return (
        <Stack gap="xs">
            <Text tone="muted">{sample}</Text>
            <Text tone="base">{sample}</Text>
            <Text tone="strong">{sample}</Text>
        </Stack>
    )
}

export function TextAsExample() {
    return (
        <Stack gap="xs">
            <Text as="p" tone="muted">
                Rendered as &lt;p&gt; for paragraph copy inside content sections.
            </Text>
            <Text as="span" tone="base">
                Rendered as &lt;span&gt; for inline labels and metadata.
            </Text>
            <Text as="div" tone="strong">
                Rendered as &lt;div&gt; when the text needs block layout control.
            </Text>
        </Stack>
    )
}
