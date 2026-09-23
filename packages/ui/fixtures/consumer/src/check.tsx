import { useState } from 'react'
import {
    Accordion,
    Avatar,
    Badge,
    Button,
    Callout,
    Card,
    Checkbox,
    Input,
    Progress,
    Select,
    Slider,
    Switch,
    Textarea,
    Toast,
    ToastProvider,
    Tooltip,
    useToast,
} from '@monority/ui'
import { NumberInput } from '@monority/ui/number-input'
import { PageHeader } from '@monority/ui/page-header'
import { Tabs } from '@monority/ui/tabs'
import { Modal } from '@monority/ui/modal'
import { Banner } from '@monority/ui/banner'
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
            <Input label="Email" defaultValue="team@company.com" />
            <Textarea label="Mission" rows={3} />
            <Select label="Country" defaultValue="">
                <option value="">Select</option>
                <option value="fr">France</option>
            </Select>
            <Switch label="Digest" defaultChecked />
            <Badge variant="success">Synced</Badge>
            <Callout title="Note" tone="info">
                Billing inherits from the parent account.
            </Callout>
            <Banner tone="info" title="Maintenance">
                Service may be briefly unavailable.
            </Banner>
            <Card>
                <span>Step 26 families resolve from the barrel.</span>
            </Card>
            <Tabs
                items={[
                    { value: 'a', label: 'Alpha' },
                    { value: 'b', label: 'Beta', disabled: true },
                ]}
                defaultValue="a"
            />
            <Modal open={false} title="Review" onClose={() => {}}>
                <p>Closed by default.</p>
            </Modal>
        </ToastProvider>
    )
}
