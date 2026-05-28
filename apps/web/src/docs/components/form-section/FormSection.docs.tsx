import { DocPage, type DocPageData } from '../DocPage'
import {
  FormSectionBasicExample,
  FormSectionWithoutActionsExample,
  FormSectionWithMetaExample,
} from './FormSection.examples'

const docData: DocPageData = {
  title: 'FormSection',
  description: "Form section grouping using Card with title, description, meta, and actions.",
  importCode: "import { FormSection } from '@monority/ui'",
  usageCode: `<FormSection
  title="Profile"
  description="Update your personal information."
>
  <Input label="Full name" />
</FormSection>`,
  preview: () => <FormSectionBasicExample />,
  examples: [
    { title: 'Without actions', content: <FormSectionWithoutActionsExample /> },
    { title: 'With meta', content: <FormSectionWithMetaExample /> },
  ],
  props: [
    { name: 'title', type: `ReactNode`, defaultValue: "-", description: "Section title." },
    { name: 'description', type: `ReactNode`, defaultValue: "-", description: "Section description." },
    { name: 'meta', type: `ReactNode`, defaultValue: "-", description: "Metadata rendered next to title." },
    { name: 'actions', type: `ReactNode`, defaultValue: "-", description: "Action buttons in the header." },
    { name: 'children', type: `ReactNode`, defaultValue: "-", description: "Form fields." }
  ],
  cssHooks: [
    '.mr-form-section', '.mr-form-section__header', '.mr-form-section__header-text',
    '.mr-form-section__header-meta', '.mr-form-section__header-end', '.mr-form-section__header-actions',
    '.mr-form-section__body', '.mr-form-section__actions',
    '[data-mr-form-section]'
  ],
  tokens: [
    '--mr-space-1', '--mr-space-3', '--mr-space-4', '--mr-space-6'
  ],
  a11y: [
    'Title renders as h3 for proper heading hierarchy.',
    'Card wrapper provides visual grouping for related form fields.',
    'No special keyboard interaction — relies on native form element semantics.'
  ],
}

export function FormSectionDocs() {
  return <DocPage doc={docData} />
}
