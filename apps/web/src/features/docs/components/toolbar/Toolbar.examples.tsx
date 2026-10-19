import { Button } from '@monority/ui/button'
import { Separator } from '@monority/ui/separator'
import { Text } from '@monority/ui/text'
import { Toolbar } from '@monority/ui/toolbar'

export function ToolbarBasicExample() {
    return (
        <Toolbar>
            <Text.Small>3 selected</Text.Small>
            <Button size="sm">Apply changes</Button>
        </Toolbar>
    )
}

export function ToolbarWithButtonsExample() {
    return (
        <Toolbar>
            <Button size="sm">Save</Button>
            <Button size="sm" variant="secondary">
                Cancel
            </Button>
            <Button size="sm" variant="ghost">
                More
            </Button>
        </Toolbar>
    )
}

export function ToolbarWithDividerExample() {
    return (
        <Toolbar>
            <Button size="sm" variant="ghost">
                Bold
            </Button>
            <Button size="sm" variant="ghost">
                Italic
            </Button>
            <Separator orientation="vertical" style={{ height: 20 }} />
            <Button size="sm" variant="ghost">
                Align left
            </Button>
            <Button size="sm" variant="ghost">
                Align center
            </Button>
        </Toolbar>
    )
}
