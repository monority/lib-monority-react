import { Button } from '@monority/ui/button'
import { Card } from '@monority/ui/card'
import { Field } from '@monority/ui/field'
import { Input } from '@monority/ui/input'
import { NumberInput } from '@monority/ui/number-input'
import { Select } from '@monority/ui/select'
import { Slider } from '@monority/ui/slider'
import { Stack } from '@monority/ui/stack'
import { Switch } from '@monority/ui/switch'
import { Textarea } from '@monority/ui/textarea'

export function FieldBasicExample() {
    return (
        <Field label="Workspace name">
            <Input defaultValue="Monority" />
        </Field>
    )
}

export function FieldWithHintExample() {
    return (
        <Field label="Deployment alias" hint="Use lowercase letters, numbers, and hyphens.">
            <Input defaultValue="design-system" />
        </Field>
    )
}

export function FieldWithErrorExample() {
    return (
        <Field label="Support email" error="Enter an email address with a valid domain.">
            <Input defaultValue="support@" aria-invalid />
        </Field>
    )
}

export function FieldRequiredExample() {
    return (
        <Field label="Project owner" required>
            <Input defaultValue="Avery Stone" required />
        </Field>
    )
}

export function FieldStandaloneExample() {
    return (
        <Field label="Release channel">
            <Input defaultValue="stable" />
        </Field>
    )
}

export function FieldWithSelectExample() {
    return (
        <Field
            label="Space role"
            hint="Determines the level of access to deployments and secrets."
            required
        >
            <Select defaultValue="developer">
                <Select.Option value="owner">Owner (full access)</Select.Option>
                <Select.Option value="admin">Administrator</Select.Option>
                <Select.Option value="developer">Developer</Select.Option>
                <Select.Option value="viewer">Viewer (read only)</Select.Option>
            </Select>
        </Field>
    )
}

export function FieldWithTextareaExample() {
    return (
        <Field
            label="Service description"
            hint="Describe the goals of this component and its functional scope."
        >
            <Textarea
                rows={3}
                placeholder="Microservice managing profiles and OAuth2 authorizations..."
            />
        </Field>
    )
}

export function FieldWithNumberInputExample() {
    return (
        <Field
            label="Minimum instances"
            hint="Number of active instances kept in high availability."
            required
        >
            <NumberInput defaultValue={3} min={1} max={16} />
        </Field>
    )
}

export function FieldWithSliderExample() {
    return (
        <Field
            label="CPU saturation alert threshold"
            hint="Triggers an automatic notification as soon as usage exceeds this threshold."
        >
            <Slider defaultValue={75} min={10} max={100} step={5} />
        </Field>
    )
}

export function FieldWithSwitchExample() {
    return (
        <Field
            label="Continuous deployment"
            hint="Automatically applies every validated commit on the production branch."
        >
            <Switch label="Enable continuous deployment" defaultChecked />
        </Field>
    )
}

export function FieldCompositionExample() {
    return (
        <Field>
            <Field.Label htmlFor="composed-input" required>
                Billing email
            </Field.Label>
            <Field.Content>
                <Input id="composed-input" type="email" defaultValue="billing@" aria-invalid />
            </Field.Content>
            <Field.Description>
                Invoices and tax receipts are sent to this address.
            </Field.Description>
            <Field.Error>Enter a complete email address.</Field.Error>
        </Field>
    )
}

export function FieldGroupExample() {
    return (
        <Field.Group direction="row">
            <Field label="First name" className="flex-1">
                <Input defaultValue="Maya" />
            </Field>
            <Field label="Last name" className="flex-1">
                <Input defaultValue="Chen" />
            </Field>
        </Field.Group>
    )
}

export function FieldSetExample() {
    return (
        <Field.Set>
            <Field.Legend required>Billing address</Field.Legend>
            <Field.Title>Company details</Field.Title>
            <Field label="Street">
                <Input defaultValue="24 Rue Lafayette" />
            </Field>
            <Field.Separator />
            <Field label="City">
                <Input defaultValue="Paris" />
            </Field>
        </Field.Set>
    )
}

export function FieldCompleteFormExample() {
    return (
        <Card data-padding="lg">
            <Card.Header>
                <Card.Title>Service configuration</Card.Title>
                <Card.Description>
                    A form orchestrated with the Field component combining various input controls.
                </Card.Description>
            </Card.Header>
            <Card.Content>
                <Stack gap="md">
                    <Field
                        label="Application identifier"
                        hint="Unique technical name in lowercase."
                        required
                    >
                        <Input defaultValue="auth-gateway-service" />
                    </Field>

                    <Field.Group direction="row">
                        <Field label="Environment" required className="flex-1">
                            <Select defaultValue="staging">
                                <Select.Option value="production">Production</Select.Option>
                                <Select.Option value="staging">Staging</Select.Option>
                                <Select.Option value="development">Development</Select.Option>
                            </Select>
                        </Field>

                        <Field label="Replicas" required className="flex-1">
                            <NumberInput defaultValue={2} min={1} max={8} />
                        </Field>
                    </Field.Group>

                    <Field
                        label="Log retention policy"
                        hint="Specify the retention period and archiving rules."
                    >
                        <Textarea
                            rows={2}
                            defaultValue="30-day retention on cold S3 storage with KMS encryption."
                        />
                    </Field>

                    <Field
                        label="Enhanced security"
                        hint="Requires a dual cryptographic signature for every delivery."
                    >
                        <Switch label="Enable mandatory image signing" defaultChecked />
                    </Field>
                </Stack>
            </Card.Content>
            <Card.Footer>
                <Stack direction="horizontal" gap="sm">
                    <Button variant="primary">Save settings</Button>
                    <Button variant="secondary">Cancel</Button>
                </Stack>
            </Card.Footer>
        </Card>
    )
}
