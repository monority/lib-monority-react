import { FormSection } from '@monority/ui'
import { Input } from '@monority/ui/input'
import { Button } from '@monority/ui/button'

export function FormSectionBasicExample() {
  return (
    <FormSection
      title="Profile Information"
      description="Update your personal details below."
      actions={<Button>Save Changes</Button>}
    >
      <Input label="Full name" placeholder="Jane Doe" />
      <Input label="Email" type="email" placeholder="jane@company.com" />
    </FormSection>
  )
}

export function FormSectionWithoutActionsExample() {
  return (
    <FormSection
      title="Read-only Info"
      description="This section cannot be edited."
    >
      <Input label="Username" value="johndoe" disabled />
    </FormSection>
  )
}

export function FormSectionWithMetaExample() {
  return (
    <FormSection
      title="Billing"
      description="Manage your payment details."
      meta={<span style={{ fontSize: '0.75rem', color: 'var(--mr-fg-muted)' }}>Last updated 2 days ago</span>}
      actions={<Button variant="secondary">Update</Button>}
    >
      <Input label="Card number" placeholder="**** **** **** 4242" />
    </FormSection>
  )
}
