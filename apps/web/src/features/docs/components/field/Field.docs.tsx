import { Field } from '@monority/ui/field'
import { Input } from '@monority/ui/input'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { fieldI18n } from './Field.messages'
import {
    FieldCompleteFormExample,
    FieldCompositionExample,
    FieldGroupExample,
    FieldRequiredExample,
    FieldSetExample,
    FieldStandaloneExample,
    FieldWithErrorExample,
    FieldWithHintExample,
    FieldWithNumberInputExample,
    FieldWithSelectExample,
    FieldWithSliderExample,
    FieldWithSwitchExample,
    FieldWithTextareaExample,
} from './Field.examples'

function FieldPlayground() {
    return (
        <ComponentPlayground
            title="Field"
            description="Configure form field metadata: label, hint, required asterisk, and error message."
            controls={[
                {
                    type: 'text',
                    prop: 'label',
                    label: 'Label (label)',
                    defaultValue: 'Project name',
                },
                {
                    type: 'boolean',
                    prop: 'required',
                    label: 'Required field (required)',
                    defaultValue: true,
                },
                {
                    type: 'text',
                    prop: 'hint',
                    label: 'Hint (hint)',
                    defaultValue: 'Use a unique lowercase identifier.',
                },
                {
                    type: 'select',
                    prop: 'state',
                    label: 'Validation state',
                    defaultValue: 'default',
                    options: [
                        { value: 'default', label: 'Normal / Valid' },
                        { value: 'error', label: 'Input error' },
                    ],
                },
            ]}
            renderCode={(props) => {
                const hasError = props.state === 'error'
                return `<Field
  label="${props.label}"${props.required ? '\n  required' : ''}${props.hint ? `\n  hint="${props.hint}"` : ''}${hasError ? '\n  error="This project name is already taken."' : ''}
>
  <Input
    defaultValue="lib-monority"${hasError ? '\n    invalid' : ''}
  />
</Field>`
            }}
        >
            {(props) => {
                const hasError = props.state === 'error'
                return (
                    <div style={{ width: '100%', maxWidth: 440 }}>
                        <Field
                            label={props.label as string}
                            required={props.required as boolean}
                            hint={props.hint ? (props.hint as string) : undefined}
                            error={hasError ? 'This project name is already taken.' : undefined}
                        >
                            <Input defaultValue="lib-monority" invalid={hasError} />
                        </Field>
                    </div>
                )
            }}
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'Field',
    description:
        'Building block for form controls that pairs inputs with labels, hints, and error messaging.',
    importCode: `import { Field } from '@monority/ui/field'
import { Input } from '@monority/ui/input'`,
    usageCode: `<Field label="Workspace name">
  <Input defaultValue="Monority" />
</Field>`,
    preview: () => <FieldPlayground />,
    examples: [
        {
            title: 'With Select',
            content: <FieldWithSelectExample />,
            code: `<Field label="Space role" hint="Determines the level of access to deployments and secrets." required>
  <Select defaultValue="developer">
    <Select.Option value="owner">Owner (full access)</Select.Option>
    <Select.Option value="admin">Administrator</Select.Option>
    <Select.Option value="developer">Developer</Select.Option>
    <Select.Option value="viewer">Viewer (read only)</Select.Option>
  </Select>
</Field>`,
        },
        {
            title: 'With Textarea',
            content: <FieldWithTextareaExample />,
            code: `<Field label="Service description" hint="Describe the goals of this component and its functional scope.">
  <Textarea rows={3} placeholder="Microservice managing profiles and OAuth2 authorizations..." />
</Field>`,
        },
        {
            title: 'With NumberInput',
            content: <FieldWithNumberInputExample />,
            code: `<Field label="Minimum instances" hint="Number of active instances kept in high availability." required>
  <NumberInput defaultValue={3} min={1} max={16} />
</Field>`,
        },
        {
            title: 'With Slider',
            content: <FieldWithSliderExample />,
            code: `<Field label="CPU saturation alert threshold" hint="Triggers an automatic notification as soon as usage exceeds this threshold.">
  <Slider defaultValue={[75]} min={10} max={100} step={5} />
</Field>`,
        },
        {
            title: 'With Switch',
            content: <FieldWithSwitchExample />,
            code: `<Field label="Continuous deployment" hint="Automatically applies every validated commit on the production branch.">
  <Switch label="Enable continuous deployment" defaultChecked />
</Field>`,
        },
        {
            title: 'Complete multi-component form',
            content: <FieldCompleteFormExample />,
            code: `<Card data-padding="lg">
  <Card.Header>
    <Card.Title>Service configuration</Card.Title>
  </Card.Header>
  <Card.Content>
    <Stack gap="md">
      <Field label="Identifier" hint="Unique name" required>
        <Input defaultValue="auth-gateway-service" />
      </Field>
      <Field.Group direction="row">
        <Field label="Environment" required className="flex-1">
          <Select defaultValue="staging">...</Select>
        </Field>
        <Field label="Replicas" required className="flex-1">
          <NumberInput defaultValue={2} min={1} max={8} />
        </Field>
      </Field.Group>
      <Field label="Log retention">
        <Textarea rows={2} defaultValue="..." />
      </Field>
      <Field label="Security">
        <Switch label="Mandatory signature" defaultChecked />
      </Field>
    </Stack>
  </Card.Content>
</Card>`,
        },
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
            code: `<Field>
  <Field.Label htmlFor="composed-input" required>
    Billing email
  </Field.Label>
  <Field.Content>
    <Input id="composed-input" type="email" defaultValue="billing@" aria-invalid />
  </Field.Content>
  <Field.Description>Invoices and tax receipts are sent to this address.</Field.Description>
  <Field.Error>Enter a complete email address.</Field.Error>
</Field>`,
        },
        {
            title: 'Group',
            content: <FieldGroupExample />,
            code: `<Field.Group direction="row">
  <Field label="First name">
    <Input defaultValue="Maya" />
  </Field>
  <Field label="Last name">
    <Input defaultValue="Chen" />
  </Field>
</Field.Group>`,
        },
        {
            title: 'Fieldset',
            content: <FieldSetExample />,
            code: `<Field.Set>
  <Field.Legend required>Billing address</Field.Legend>
  <Field.Title>Company details</Field.Title>
  <Field label="Street">
    <Input defaultValue="24 Rue Lafayette" />
  </Field>
  <Field.Separator />
  <Field label="City">
    <Input defaultValue="Paris" />
  </Field>
</Field.Set>`,
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
    tokens: [
        '--mr-text-primary',
        '--mr-text-secondary',
        '--mr-danger',
        '--mr-font-size-sm',
        '--mr-space-*',
    ],
    a11y: [
        'Label forwards htmlFor to keep the control association explicit.',
        'Hint/error IDs feed aria-describedby.',
        'Errors set aria-invalid on controlled input.',
    ],
    i18n: fieldI18n,
}

export function FieldDocs() {
    return <DocPage doc={docData} />
}
