import { RadioGroup, Field } from '@monority/ui'

export function RadioGroupBasicExample() {
  return (
    <RadioGroup
      label="Options"
      defaultValue="md"
      items={[
        { value: 'sm', label: 'Small' },
        { value: 'md', label: 'Medium' },
        { value: 'lg', label: 'Large', disabled: true },
      ]}
    />
  )
}

export function RadioGroupInvalidExample() {
  return (
    <Field label="Plan" error="Please select a plan">
      <RadioGroup
        invalid
        defaultValue=""
        items={[
          { value: 'free', label: 'Free' },
          { value: 'pro', label: 'Pro' },
          { value: 'enterprise', label: 'Enterprise' },
        ]}
      />
    </Field>
  )
}

export function RadioGroupWithDescriptionExample() {
  return (
    <RadioGroup
      label="Notification preference"
      defaultValue="mention"
      items={[
        { value: 'all', label: 'All notifications', description: 'Receive everything' },
        { value: 'mention', label: 'Mentions only', description: 'Only when someone mentions you' },
        { value: 'none', label: 'None', description: 'Opt out of all notifications' },
      ]}
    />
  )
}

export function RadioGroupChoiceCardExample() {
  return (
    <RadioGroup
      label="Billing plan"
      size="lg"
      defaultValue="pro"
      items={[
        { value: 'basic', label: 'Basic', description: 'Up to 10 projects' },
        { value: 'pro', label: 'Pro', description: 'Unlimited projects' },
        { value: 'enterprise', label: 'Enterprise', description: 'Custom solutions' },
      ]}
    />
  )
}

export function RadioGroupFieldsetExample() {
  return (
    <Field label="Theme preference">
      <RadioGroup
        defaultValue="system"
        items={[
          { value: 'light', label: 'Light mode' },
          { value: 'dark', label: 'Dark mode' },
          { value: 'system', label: 'System default' },
        ]}
      />
    </Field>
  )
}
