import { Button } from '@monority/ui/button'
import { Text } from '@monority/ui/text'
import { Tooltip } from '@monority/ui/tooltip'

export function TooltipBasicExample() {
    return (
        <Tooltip content="Inspect token details">
            <Button>Hover me</Button>
        </Tooltip>
    )
}

export function TooltipWithRichContentExample() {
    return (
        <Tooltip
            content={
                <div>
                    <Text.Strong>Token preview</Text.Strong>
                    <br />
                    Spacing values inherit from the core scale.
                </div>
            }
        >
            <Button variant="secondary">Rich content</Button>
        </Tooltip>
    )
}

export function TooltipOnIconButtonExample() {
    return (
        <Tooltip content="Delete item">
            <Button iconOnly aria-label="Delete" variant="danger">
                <span>{'\u2715'}</span>
            </Button>
        </Tooltip>
    )
}
