import { PasswordInput } from '@monority/ui/password-input'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    PasswordInputBasicPreview,
    PasswordInputSizesExample,
    PasswordInputStatesExample,
    PasswordInputToggleExample,
} from './PasswordInput.examples'

function PasswordInputPlaygroundDemo(props: {
    size: 'sm' | 'md' | 'lg'
    label: string
    hint: string
    showToggle: boolean
    disabled: boolean
    required: boolean
}) {
    const [value, setValue] = useState('')
    return (
        <div style={{ width: '100%', maxWidth: '360px', margin: '0 auto' }}>
            <PasswordInput
                size={props.size}
                label={props.label}
                hint={props.hint}
                showToggle={props.showToggle}
                disabled={props.disabled}
                required={props.required}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}

const passwordInputPlayground = (
    <ComponentPlayground<{
        size: 'sm' | 'md' | 'lg'
        label: string
        hint: string
        showToggle: boolean
        disabled: boolean
        required: boolean
    }>
        componentName="PasswordInput"
        importCode="import { PasswordInput } from '@monority/ui/password-input'"
        getCode={(p) => {
            const propsStr = [
                `  label="${p.label}"`,
                p.hint ? `  hint="${p.hint}"` : '',
                p.size !== 'md' ? `  size="${p.size}"` : '',
                !p.showToggle ? '  showToggle={false}' : '',
                p.disabled ? '  disabled' : '',
                p.required ? '  required' : '',
                '  value={value}',
                '  onChange={(e) => setValue(e.target.value)}',
            ]
                .filter(Boolean)
                .join('\n')

            return `import { useState } from 'react'\nimport { PasswordInput } from '@monority/ui/password-input'\n\nconst [value, setValue] = useState('')\n\n<PasswordInput\n${propsStr}\n/>`
        }}
        controls={[
            {
                name: 'label',
                type: 'text',
                label: 'Libelle (label)',
                defaultValue: 'Mot de passe',
            },
            {
                name: 'hint',
                type: 'text',
                label: 'Indication (hint)',
                defaultValue: '8 caracteres minimum avec chiffres et symboles.',
            },
            {
                name: 'size',
                type: 'select',
                label: 'Dimension (size)',
                defaultValue: 'md',
                options: [
                    { value: 'sm', label: 'Small' },
                    { value: 'md', label: 'Medium' },
                    { value: 'lg', label: 'Large' },
                ],
            },
            {
                name: 'showToggle',
                type: 'boolean',
                label: 'Bouton afficher/masquer',
                defaultValue: true,
            },
            {
                name: 'disabled',
                type: 'boolean',
                label: 'Desactive (disabled)',
                defaultValue: false,
            },
            {
                name: 'required',
                type: 'boolean',
                label: 'Requis (required)',
                defaultValue: false,
            },
        ]}
        render={(props) => <PasswordInputPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'PasswordInput',
    description:
        'A specialized text input for passwords with an integrated visibility toggle and field metadata.',
    importCode: "import { PasswordInput } from '@monority/ui/password-input'",
    usageCode: '<PasswordInput label="Password" hint="8+ characters" />',
    preview: () => <PasswordInputBasicPreview />,
    playground: passwordInputPlayground,
    examples: [
        { title: 'Sizes', content: <PasswordInputSizesExample /> },
        { title: 'Visibility Toggle', content: <PasswordInputToggleExample /> },
        { title: 'States', content: <PasswordInputStatesExample /> },
    ],
    props: [
        {
            name: 'label',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Label rendered above the input.',
        },
        {
            name: 'hint',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Helpful description rendered below the input.',
        },
        {
            name: 'error',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Error message that puts the field in an invalid state.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Height and font density.',
        },
        {
            name: 'showToggle',
            type: 'boolean',
            defaultValue: 'true',
            description: 'Controls whether the visibility toggle button is rendered.',
        },
        {
            name: 'disabled',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Disables user interaction and dims the field.',
        },
        {
            name: 'required',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Marks the field as required.',
        },
    ],
    cssHooks: ['.mr-password-input-field', '.mr-password-input', '[data-size]', '[data-invalid]'],
    tokens: [
        '--mr-bg-input',
        '--mr-text-primary',
        '--mr-border-base',
        '--mr-radius-md',
        '--mr-space-2',
        '--mr-space-3',
    ],
    keyboardNavigation: [
        {
            key: 'Tab',
            action: 'Deplace le focus vers le champ ou vers le bouton de visibilite.',
            context: 'Champ mot de passe',
        },
        {
            key: ['Space', 'Enter'],
            action: 'Bascule la visibilite du mot de passe entre texte en clair et masque.',
            context: 'Bouton d affichage du mot de passe',
        },
    ],
    a11y: [
        'Visibility toggle has accessible label toggling between show and hide.',
        'Proper autocomplete default for password managers.',
        'Field labels and error messages connected via aria-describedby.',
    ],
}

export function PasswordInputDocs() {
    return <DocPage doc={docData} />
}
