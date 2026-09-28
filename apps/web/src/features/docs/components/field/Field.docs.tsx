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
    description:
        'Building block for form controls that pairs inputs with labels, hints, and error messaging.',
    importCode: `import {
  Field,
  FieldLabel,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from '@monority/ui/field'
import { Input } from '@monority/ui/input'`,
    usageCode: `<Field label="Workspace name">
  <Input defaultValue="Monority" />
</Field>`,
    preview: () => <FieldBasicExample />,
    examples: [
        {
            title: 'With hint',
            content: <FieldWithHintExample />,
            code: `<Field label="Deployment alias" hint="Use lowercase letters, numbers, and hyphens.">
  <Input defaultValue="design-system" />
</Field>`,
        },
        {
            title: 'With error',
            content: <FieldWithErrorExample />,
            code: `<Field label="Support email" error="Enter an email address with a valid domain.">
  <Input defaultValue="support@" aria-invalid />
</Field>`,
        },
        {
            title: 'Required',
            content: <FieldRequiredExample />,
            code: `<Field label="Project owner" required>
  <Input defaultValue="Avery Stone" required />
</Field>`,
        },
        {
            title: 'Standalone',
            content: <FieldStandaloneExample />,
            code: `<Field label="Release channel">
  <Input defaultValue="stable" />
</Field>`,
        },
        {
            title: 'Composition',
            content: <FieldCompositionExample />,
            code: `<div className="mr-field">
  <FieldLabel htmlFor="composed-input" required>
    Billing email
  </FieldLabel>
  <FieldContent>
    <Input id="composed-input" type="email" defaultValue="billing@" aria-invalid />
  </FieldContent>
  <FieldDescription>Invoices and tax receipts are sent to this address.</FieldDescription>
  <FieldError>Enter a complete email address.</FieldError>
</div>`,
        },
        {
            title: 'Group',
            content: <FieldGroupExample />,
            code: `<FieldGroup direction="row">
  <Field label="First name">
    <Input defaultValue="Maya" />
  </Field>
  <Field label="Last name">
    <Input defaultValue="Chen" />
  </Field>
</FieldGroup>`,
        },
        {
            title: 'Fieldset',
            content: <FieldSetExample />,
            code: `<FieldSet>
  <FieldLegend required>Billing address</FieldLegend>
  <FieldTitle>Company details</FieldTitle>
  <Field label="Street">
    <Input defaultValue="24 Rue Lafayette" />
  </Field>
  <FieldSeparator />
  <Field label="City">
    <Input defaultValue="Paris" />
  </Field>
</FieldSet>`,
        },
    ],
    props: [
        { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Field label.' },
        {
            name: 'hint',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Helpful description linked via aria-describedby.',
        },
        {
            name: 'error',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Error message with aria-invalid.',
        },
        {
            name: 'required',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Required indicator.',
        },
        {
            name: 'htmlFor',
            type: 'string',
            defaultValue: '-',
            description: 'ID of the controlled input.',
        },
        {
            name: 'labelId',
            type: 'string',
            defaultValue: '-',
            description: 'Custom ID for label element.',
        },
        {
            name: 'hintId',
            type: 'string',
            defaultValue: '-',
            description: 'Custom ID for hint element (auto-generated if omitted).',
        },
        {
            name: 'errorId',
            type: 'string',
            defaultValue: '-',
            description: 'Custom ID for error element (auto-generated if omitted).',
        },
        { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Input element.' },
    ],
    cssHooks: [
        '.mr-field',
        '.mr-field__label',
        '.mr-field__hint',
        '.mr-field__error',
        '.mr-field-group',
        '.mr-field-set',
        '.mr-field-set__legend',
        '.mr-field-set__title',
        '.mr-field__content',
        '.mr-field__separator',
        '[data-required]',
        '[data-invalid]',
    ],
    tokens: ['--mr-fg-base', '--mr-fg-muted', '--mr-danger', '--mr-text-sm', '--mr-space-*'],
    a11y: [
        'Label forwards htmlFor to keep the control association explicit.',
        'Hint/error IDs feed aria-describedby.',
        'Errors set aria-invalid on controlled input.',
    ],
}

export function FieldDocs() {
    return <DocPage doc={docData} />
}
