import { DocPage, type DocPageData } from '../DocPage'
import {
  FieldBasicExample,
  FieldWithHintExample,
  FieldWithErrorExample,
  FieldRequiredExample,
  FieldStandaloneExample,
  FieldCompositionExample,
  FieldGroupExample,
  FieldSetExample,
} from './Field.examples'

const docData: DocPageData = {
  title: 'Field',
  description: "Building block for form fields ? wraps children with label, hint, and error markup.",
  importCode: "import { Field, FieldLabel, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLegend, FieldSeparator, FieldSet, FieldTitle } from '@monority/ui'",
  usageCode: `<Field label="Full name">
  <Input />
</Field>`,
  preview: () => <FieldBasicExample />,
  examples: [
    { title: 'With hint', content: <FieldWithHintExample />, code: `<Field label="Password" hint="Minimum 8 characters">
  <Input type="password" />
</Field>` },
    { title: 'With error', content: <FieldWithErrorExample />, code: `<Field label="Email" error="Please enter a valid email address">
  <Input defaultValue="invalid" aria-invalid />
</Field>` },
    { title: 'Required', content: <FieldRequiredExample />, code: `<Field label="Full name" required>
  <Input required />
</Field>` },
    { title: 'Standalone', content: <FieldStandaloneExample />, code: `<Field label="Standalone">
  <Input />
</Field>` },
    { title: 'Composition', content: <FieldCompositionExample />, code: `<div className="mr-field">
  <FieldLabel htmlFor="composed-input" required>Email address</FieldLabel>
  <FieldContent>
    <Input id="composed-input" type="email" />
  </FieldContent>
  <FieldDescription>We will never share your email.</FieldDescription>
  <FieldError>Invalid email format.</FieldError>
</div>` },
    { title: 'Group', content: <FieldGroupExample />, code: `<FieldGroup direction="row">
  <Field label="First name">
    <Input />
  </Field>
  <Field label="Last name">
    <Input />
  </Field>
</FieldGroup>` },
    { title: 'Fieldset', content: <FieldSetExample />, code: `<FieldSet>
  <FieldLegend required>Billing address</FieldLegend>
  <FieldTitle>Personal information</FieldTitle>
  <Field label="Street">
    <Input />
  </Field>
  <FieldSeparator />
  <Field label="City">
    <Input />
  </Field>
</FieldSet>` },
  ],
  props: [
    { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Field label.' },
    { name: 'hint', type: 'ReactNode', defaultValue: '-', description: 'Helpful description linked via aria-describedby.' },
    { name: 'error', type: 'ReactNode', defaultValue: '-', description: 'Error message with aria-invalid.' },
    { name: 'required', type: 'boolean', defaultValue: 'false', description: 'Required indicator.' },
    { name: 'htmlFor', type: 'string', defaultValue: '-', description: 'ID of the controlled input.' },
    { name: 'hintId', type: 'string', defaultValue: '-', description: 'Custom ID for hint element (auto-generated if omitted).' },
    { name: 'errorId', type: 'string', defaultValue: '-', description: 'Custom ID for error element (auto-generated if omitted).' },
    { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Input element.' },
  ],
  cssHooks: [
    '.mr-field', '.mr-field__label', '.mr-field__hint', '.mr-field__error',
    '.mr-field-group', '.mr-field-set', '.mr-field-set__legend', '.mr-field-set__title',
    '.mr-field__content', '.mr-field__separator',
    '[data-required]', '[data-invalid]',
  ],
  tokens: [
    '--mr-fg-base', '--mr-fg-muted', '--mr-danger',
    '--mr-text-sm', '--mr-space-*',
  ],
  a11y: [
    'Label uses htmlFor for association.',
    'Hint/error IDs feed aria-describedby.',
    'Errors set aria-invalid on controlled input.',
  ],
}

export function FieldDocs() {
  return <DocPage doc={docData} />
}
