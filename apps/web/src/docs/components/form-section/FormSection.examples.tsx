import { Badge } from '@monority/ui/badge'
import { Button } from '@/components/actions/button/Button'
import { FormSection } from '@monority/ui/form-section'
import { Input } from '@monority/ui/input'
import { Textarea } from '@monority/ui/textarea'

export function FormSectionBasicExample() {
    return (
        <FormSection
            title="Project details"
            description="Set the name and summary used across docs, releases, and internal references."
            actions={<Button>Save changes</Button>}
        >
            <Input label="Project name" placeholder="Monority Core" />
            <Textarea
                label="Summary"
                placeholder="Short description for changelogs and overview pages."
                rows={4}
            />
        </FormSection>
    )
}

export function FormSectionWithoutActionsExample() {
    return (
        <FormSection
            title="Environment"
            description="Reference values inherited from workspace configuration."
        >
            <Input label="Registry" value="npmjs.org" disabled />
            <Input label="Package scope" value="@monority" disabled />
        </FormSection>
    )
}

export function FormSectionWithMetaExample() {
    return (
        <FormSection
            title="Billing contact"
            description="Choose who receives invoices and renewal reminders."
            meta={<Badge variant="default">Required</Badge>}
            actions={<Button variant="secondary">Update contact</Button>}
        >
            <Input label="Contact name" placeholder="Jane Doe" />
            <Input label="Email" type="email" placeholder="billing@company.com" />
        </FormSection>
    )
}
