import { useState } from 'react'
import {
    Accordion,
    Avatar,
    Button,
    Checkbox,
    Progress,
    Slider,
    Toast,
    ToastProvider,
    Tooltip,
    useToast,
} from '@monority/ui'
import { NumberInput } from '@monority/ui/number-input'
import { PageHeader } from '@monority/ui/page-header'
import '@monority/ui/styles.css'

// Root import: every Step 06/07 stabilized symbol must be present.
export function RootImports() {
    const [checked, setChecked] = useState(false)
    const [value, setValue] = useState(60)
    const { pushToast } = useToast()
    return (
        <ToastProvider>
            <Button onClick={() => pushToast({ title: 'Hello' })}>Push</Button>
            <Checkbox
                label="Accept"
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
            />
            <Slider label="Volume" value={value} onValueChange={setValue} invalid />
            <Progress value={68} label={<span>Migration</span>} />
            <Tooltip content="Details">
                <button type="button">Trigger</button>
            </Tooltip>
            <Toast title="Saved" tone="success" />
            <Avatar name="Maya Chen" size="lg" />
            <Accordion
                items={[{ value: 'a', title: 'Section', content: 'Body' }]}
                defaultValue="a"
                size="lg"
                collapsible
            />
            <NumberInput label="Qty" />
            <PageHeader title="Title" />
        </ToastProvider>
    )
}
