import { DocPage, type DocPageData } from '../DocPage'
import { ComponentPlayground } from '../ComponentPlayground'
import { Field } from '@monority/ui/field'
import { Input } from '@monority/ui/input'
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

function FieldPlayground() {
    return (
        <ComponentPlayground
            title="Field"
            description="Configurez les métadonnées de champ de formulaire : libellé, indice, astérisque obligatoire et message d'erreur."
            controls={[
                {
                    type: 'text',
                    prop: 'label',
                    label: 'Libellé (label)',
                    defaultValue: 'Nom du projet',
                },
                {
                    type: 'boolean',
                    prop: 'required',
                    label: 'Champ obligatoire (required)',
                    defaultValue: true,
                },
                {
                    type: 'text',
                    prop: 'hint',
                    label: 'Indice d’aide (hint)',
                    defaultValue: 'Utilisez un identifiant unique en minuscules.',
                },
                {
                    type: 'select',
                    prop: 'state',
                    label: 'État de validation',
                    defaultValue: 'default',
                    options: [
                        { value: 'default', label: 'Normal / Valide' },
                        { value: 'error', label: 'Erreur de saisie' },
                    ],
                },
            ]}
            renderCode={(props) => {
                const hasError = props.state === 'error'
                return `<Field
  label="${props.label}"${props.required ? '\n  required' : ''}${props.hint ? `\n  hint="${props.hint}"` : ''}${hasError ? '\n  error="Ce nom de projet est déjà réservé."' : ''}
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
                            error={hasError ? 'Ce nom de projet est déjà réservé.' : undefined}
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
}

export function FieldDocs() {
    return <DocPage doc={docData} />
}
