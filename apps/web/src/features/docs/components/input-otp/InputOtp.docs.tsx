import { useState } from 'react'
import { InputOTP } from '@monority/ui/input-otp'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    InputOtpBasicExample,
    InputOtpCompoundExample,
    InputOtpDisabledExample,
} from './InputOtp.examples'

function InputOtpPlaygroundDemo(props: {
    maxLength: number
    disabled: boolean
}) {
    const [value, setValue] = useState('')
    const [completed, setCompleted] = useState<string | null>(null)

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--mr-space-4)',
            }}
        >
            <InputOTP
                maxLength={props.maxLength}
                disabled={props.disabled}
                value={value}
                onChange={(v) => {
                    setValue(v)
                    if (v.length < props.maxLength) setCompleted(null)
                }}
                onComplete={setCompleted}
            />
            <div style={{ fontSize: 'var(--mr-font-size-sm)', color: 'var(--mr-text-primary)' }}>
                {completed ? (
                    <span>
                        Code confirme : <strong>{completed}</strong>
                    </span>
                ) : (
                    <span>
                        Saisie en cours ({value.length} / {props.maxLength})
                    </span>
                )}
            </div>
        </div>
    )
}

const inputOtpPlayground = (
    <ComponentPlayground<{
        maxLength: number
        disabled: boolean
    }>
        componentName="InputOTP"
        importCode="import { InputOTP } from '@monority/ui/input-otp'"
        getCode={(p) => {
            const propsStr = [
                `  maxLength={${p.maxLength}}`,
                p.disabled ? '  disabled' : '',
                '  value={value}',
                '  onChange={setValue}',
                '  onComplete={(code) => console.log(code)}',
            ]
                .filter(Boolean)
                .join('\n')

            return `import { useState } from 'react'\nimport { InputOTP } from '@monority/ui/input-otp'\n\nconst [value, setValue] = useState('')\n\n<InputOTP\n${propsStr}\n/>`
        }}
        controls={[
            {
                name: 'maxLength',
                type: 'number',
                label: 'Nombre de chiffres (maxLength)',
                defaultValue: 6,
            },
            {
                name: 'disabled',
                type: 'boolean',
                label: 'Desactive (disabled)',
                defaultValue: false,
            },
        ]}
        render={(props) => <InputOtpPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'InputOTP',
    description:
        'Champ de saisie segmente pour codes One-Time Password, verification double facteur (2FA) et codes PIN avec support transparent du collage.',
    importCode: "import { InputOTP } from '@monority/ui/input-otp'",
    usageCode: `const [value, setValue] = useState('')

<InputOTP
  maxLength={6}
  value={value}
  onChange={setValue}
  onComplete={(code) => console.log('Code 2FA complete:', code)}
/>`,
    preview: () => <InputOtpBasicExample />,
    playground: inputOtpPlayground,
    examples: [
        { title: 'Composition manuelle avec separateur', content: <InputOtpCompoundExample /> },
        { title: 'Etat desactive', content: <InputOtpDisabledExample /> },
    ],
    props: [
        {
            name: 'value',
            type: 'string',
            defaultValue: '-',
            description: 'Valeur controlee du code.',
        },
        {
            name: 'defaultValue',
            type: 'string',
            defaultValue: "''",
            description: 'Valeur initiale incontrolee.',
        },
        {
            name: 'maxLength',
            type: 'number',
            defaultValue: '6',
            description: 'Nombre total de caracteres requis.',
        },
        {
            name: 'pattern',
            type: 'string',
            defaultValue: "'^[0-9]*$'",
            description: 'Expression reguliere de filtrage des caracteres.',
        },
        {
            name: 'inputMode',
            type: "'numeric' | 'text'",
            defaultValue: "'numeric'",
            description: 'Type de clavier virtuel affiche sur mobile.',
        },
        {
            name: 'disabled',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Desactive toute interaction.',
        },
        {
            name: 'onChange',
            type: '(value: string) => void',
            defaultValue: '-',
            description: 'Rappel declenche a chaque saisie.',
        },
        {
            name: 'onComplete',
            type: '(value: string) => void',
            defaultValue: '-',
            description: 'Rappel declenche lorsque tous les slots sont remplis.',
        },
    ],
    cssHooks: [
        '.mr-input-otp',
        '.mr-input-otp__native-input',
        '.mr-input-otp__group',
        '.mr-input-otp__slot',
        '.mr-input-otp__separator',
        '.mr-input-otp__caret',
        '[data-disabled]',
        '[data-active]',
        '[data-filled]',
    ],
    tokens: [
        '--mr-bg-field',
        '--mr-border-default',
        '--mr-border-subtle',
        '--mr-ring-focus',
        '--mr-font-family-mono',
        '--mr-size-control-lg',
        '--mr-duration-state',
        '--mr-duration-pulse',
    ],
    keyboardNavigation: [
        {
            key: '0-9',
            action: 'Saisie du caractere numerique et deplacement automatique vers la case suivante.',
            context: 'Case de saisie (slot OTP)',
        },
        {
            key: 'Backspace',
            action: 'Efface le caractere courant et recule le focus d une case.',
            context: 'Case de saisie (slot OTP)',
        },
        {
            key: ['ArrowLeft', 'ArrowRight'],
            action: 'Deplace manuellement la position du focus entre les differentes cases.',
            context: 'Case de saisie (slot OTP)',
        },
        {
            key: ['Control', 'v'],
            action: 'Colle un code a usage unique complet et remplit automatiquement les cases.',
            context: 'Case de saisie (slot OTP)',
        },
    ],
    a11y: [
        'Utilise un champ natif sous-jacent avec inputMode="numeric" et autoComplete="one-time-code".',
        'Permet la saisie clavier standard, les raccourcis copier/coller et la touche retour arriere.',
        'Curseur visuel clignotant simule respectant la preference prefers-reduced-motion.',
        "Accessible aux lecteurs d'ecran avec libelle clair.",
    ],
}

export function InputOtpDocs() {
    return <DocPage doc={docData} />
}
