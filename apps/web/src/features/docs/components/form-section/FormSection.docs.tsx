import { DocPage, type DocPageData } from '../DocPage'
import {
    FormSectionBasicExample,
    FormSectionWithoutActionsExample,
    FormSectionWithMetaExample,
} from './FormSection.examples'

const docData: DocPageData = {
    title: 'FormSection',
    description:
        'A grouped form panel with header context, optional metadata, and a dedicated action row.',
    importCode: "import { FormSection } from '@monority/ui/form-section'",
    usageCode: `<FormSection
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
</FormSection>`,
    preview: () => <FormSectionBasicExample />,
    examples: [
        {
            title: 'Without actions',
            content: <FormSectionWithoutActionsExample />,
            code: `<FormSection
  title="Environment"
  description="Reference values inherited from workspace configuration."
>
  <Input label="Registry" value="npmjs.org" disabled />
</FormSection>`,
        },
        {
            title: 'With meta',
            content: <FormSectionWithMetaExample />,
            code: `<FormSection
  title="Billing contact"
  description="Choose who receives invoices and renewal reminders."
  meta={<Badge variant="secondary">Required</Badge>}
  actions={<Button variant="secondary">Update contact</Button>}
>
  <Input label="Contact name" placeholder="Jane Doe" />
</FormSection>`,
        },
    ],
    props: [
        {
            name: 'title',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Section title.',
        },
        {
            name: 'description',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Section description.',
        },
        {
            name: 'meta',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Metadata rendered alongside the header.',
        },
        {
            name: 'actions',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Action row rendered below the form content.',
        },
        {
            name: 'children',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Form fields.',
        },
    ],
    cssHooks: [
        '.mr-form-section',
        '.mr-form-section__header',
        '.mr-form-section__header-text',
        '.mr-form-section__header-title',
        '.mr-form-section__header-description',
        '.mr-form-section__header-meta',
        '.mr-form-section__body',
        '.mr-form-section__footer',
        '[data-mr-form-section]',
        '[data-has-actions]',
    ],
    tokens: ['--mr-space-4', '--mr-space-5', '--mr-border-subtle', '--mr-bg-raised'],
    a11y: [
        'Title renders as h3 for proper heading hierarchy.',
        'Grouped actions stay in a consistent footer region.',
        'Keyboard behavior relies on native form controls inside the section.',
    ],
}

export function FormSectionDocs() {
    return <DocPage doc={docData} />
}
