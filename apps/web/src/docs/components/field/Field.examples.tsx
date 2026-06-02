import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldTitle,
} from '@monority/ui/field'
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
        <div className="mr-field">
            <FieldLabel htmlFor="composed-input" required>
                Billing email
            </FieldLabel>
            <FieldContent>
                <Input id="composed-input" type="email" defaultValue="billing@" aria-invalid />
            </FieldContent>
            <FieldDescription>Invoices and tax receipts are sent to this address.</FieldDescription>
            <FieldError>Enter a complete email address.</FieldError>
        </div>
    )
}

export function FieldGroupExample() {
    return (
        <FieldGroup direction="row">
            <Field label="First name" className="flex-1">
                <Input defaultValue="Maya" />
            </Field>
            <Field label="Last name" className="flex-1">
                <Input defaultValue="Chen" />
            </Field>
        </FieldGroup>
    )
}

export function FieldSetExample() {
    return (
        <FieldSet>
            <FieldLegend required>Billing address</FieldLegend>
            <FieldTitle>Company details</FieldTitle>
            <Field label="Street">
                <Input defaultValue="24 Rue Lafayette" />
            </Field>
            <FieldSeparator />
            <Field label="City">
                <Input defaultValue="Paris" />
            </Field>
        </FieldSet>
    )
}
