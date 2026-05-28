import { Checkbox } from '@monority/ui'

export function CheckboxBasicExample() {
  return (
    <>
      <Checkbox label="Option 1" />
      <Checkbox label="Option 2" defaultChecked />
    </>
  )
}

export function CheckboxDisabledExample() {
  return (
    <>
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </>
  )
}

export function CheckboxWithErrorExample() {
  return (
    <Checkbox label="Accept terms" invalid description="You must accept the terms to continue" />
  )
}

export function CheckboxWithDescriptionExample() {
  return (
    <Checkbox
      label="Enable notifications"
      description="Receive push notifications for important updates"
      defaultChecked
    />
  )
}

export function CheckboxIndeterminateExample() {
  return (
    <Checkbox label="Select all (indeterminate)" indeterminate />
  )
}
