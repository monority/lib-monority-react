import { Field } from '@monority/ui'

export function FieldBasicExample() {
  return (
    <Field label="Username">
      <input className="mr-input" />
    </Field>
  )
}

export function FieldWithHintExample() {
  return (
    <Field label="Password" hint="Minimum 8 characters">
      <input className="mr-input" type="password" />
    </Field>
  )
}

export function FieldWithErrorExample() {
  return (
    <Field label="Email" error="Please enter a valid email address">
      <input className="mr-input" defaultValue="invalid" aria-invalid />
    </Field>
  )
}

export function FieldRequiredExample() {
  return (
    <Field label="Full name" required>
      <input className="mr-input" required />
    </Field>
  )
}

export function FieldStandaloneExample() {
  return (
    <Field label="Standalone">
      <input className="mr-input" />
    </Field>
  )
}
