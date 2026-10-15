import { Field } from '@monority/ui/field'
import { Input } from '@monority/ui/input'

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
