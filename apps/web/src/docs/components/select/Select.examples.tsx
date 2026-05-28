import { Select } from '@monority/ui'

export function SelectBasicExample() {
  return (
    <Select label="Country">
      <option value="">Select an option...</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
    </Select>
  )
}

export function SelectWithHintExample() {
  return (
    <Select label="Timezone" hint="Select your local timezone">
      <option value="">Choose...</option>
      <option value="utc">UTC</option>
      <option value="est">EST</option>
      <option value="pst">PST</option>
    </Select>
  )
}

export function SelectInvalidExample() {
  return (
    <Select label="Category" error="Please select a category">
      <option value="">Select...</option>
      <option value="a">Category A</option>
      <option value="b">Category B</option>
    </Select>
  )
}

export function SelectDisabledExample() {
  return (
    <Select label="Disabled" disabled>
      <option>Cannot interact</option>
    </Select>
  )
}

export function SelectRequiredExample() {
  return (
    <Select label="Required field" required>
      <option value="">Select...</option>
      <option value="1">Option 1</option>
    </Select>
  )
}

export function SelectSizesExample() {
  return (
    <div style={{ display: 'flex', gap: 'var(--mr-space-3)', alignItems: 'start', flexWrap: 'wrap' }}>
      <Select label="Small" size="sm">
        <option>Small</option>
      </Select>
      <Select label="Medium" size="md">
        <option>Medium</option>
      </Select>
      <Select label="Large" size="lg">
        <option>Large</option>
      </Select>
    </div>
  )
}
