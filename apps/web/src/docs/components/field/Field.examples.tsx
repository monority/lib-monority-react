import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet, FieldTitle, Input } from '@monority/ui'

export function FieldBasicExample() {
  return (
    <Field label="Username">
      <Input />
    </Field>
  )
}

export function FieldWithHintExample() {
  return (
    <Field label="Password" hint="Minimum 8 characters">
      <Input type="password" />
    </Field>
  )
}

export function FieldWithErrorExample() {
  return (
    <Field label="Email" error="Please enter a valid email address">
      <Input defaultValue="invalid" aria-invalid />
    </Field>
  )
}

export function FieldRequiredExample() {
  return (
    <Field label="Full name" required>
      <Input required />
    </Field>
  )
}

export function FieldStandaloneExample() {
  return (
    <Field label="Standalone">
      <Input />
    </Field>
  )
}

export function FieldCompositionExample() {
  return (
    <div className="mr-field">
      <FieldLabel htmlFor="composed-input" required>Email address</FieldLabel>
      <FieldContent>
        <Input id="composed-input" type="email" />
      </FieldContent>
      <FieldDescription>We'll never share your email.</FieldDescription>
      <FieldError>Invalid email format.</FieldError>
    </div>
  )
}

export function FieldGroupExample() {
  return (
    <FieldGroup direction="row">
      <Field label="First name" className="flex-1">
        <Input />
      </Field>
      <Field label="Last name" className="flex-1">
        <Input />
      </Field>
    </FieldGroup>
  )
}

export function FieldSetExample() {
  return (
    <FieldSet>
      <FieldLegend required>Billing address</FieldLegend>
      <FieldTitle>Personal information</FieldTitle>
      <Field label="Street">
        <Input />
      </Field>
      <FieldSeparator />
      <Field label="City">
        <Input />
      </Field>
    </FieldSet>
  )
}
