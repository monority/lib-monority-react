import { InputOTP } from '@monority/ui/input-otp'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { inputOtpI18n } from './InputOtp.messages'
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
                        Code confirmed: <strong>{completed}</strong>
                    </span>
                ) : (
                    <span>
                        Entry in progress ({value.length} / {props.maxLength})
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
                label: 'Number of digits (maxLength)',
                defaultValue: 6,
            },
            {
                name: 'disabled',
                type: 'boolean',
                label: 'Disabled (disabled)',
                defaultValue: false,
            },
        ]}
        render={(props) => <InputOtpPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'InputOTP',
    description:
        'Segmented input for One-Time Password codes, two-factor authentication (2FA), and PIN codes with transparent paste support.',
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
        { title: 'Manual composition with separator', content: <InputOtpCompoundExample /> },
        { title: 'Disabled state', content: <InputOtpDisabledExample /> },
    ],
    props: [
        {
            name: 'value',
            type: 'string',
            defaultValue: '-',
            description: 'Controlled code value.',
        },
        {
            name: 'defaultValue',
            type: 'string',
            defaultValue: "''",
            description: 'Initial uncontrolled value.',
        },
        {
            name: 'maxLength',
            type: 'number',
            defaultValue: '6',
            description: 'Total number of required characters.',
        },
        {
            name: 'pattern',
            type: 'string',
            defaultValue: "'^[0-9]*$'",
            description: 'Regular expression used to filter characters.',
        },
        {
            name: 'inputMode',
            type: "'numeric' | 'text'",
            defaultValue: "'numeric'",
            description: 'Virtual keyboard type shown on mobile.',
        },
        {
            name: 'disabled',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Disables all interaction.',
        },
        {
            name: 'onChange',
            type: '(value: string) => void',
            defaultValue: '-',
            description: 'Callback fired on every input.',
        },
        {
            name: 'onComplete',
            type: '(value: string) => void',
            defaultValue: '-',
            description: 'Callback fired when all slots are filled.',
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
            action: 'Enters the numeric character and automatically moves to the next slot.',
            context: 'Input slot (OTP slot)',
        },
        {
            key: 'Backspace',
            action: 'Clears the current character and moves focus back one slot.',
            context: 'Input slot (OTP slot)',
        },
        {
            key: ['ArrowLeft', 'ArrowRight'],
            action: 'Manually moves the focus position between the slots.',
            context: 'Input slot (OTP slot)',
        },
        {
            key: ['Control', 'v'],
            action: 'Pastes a complete one-time code and fills the slots automatically.',
            context: 'Input slot (OTP slot)',
        },
    ],
    a11y: [
        'Uses an underlying native input with inputMode="numeric" and autoComplete="one-time-code".',
        'Supports standard keyboard input, copy/paste shortcuts, and the backspace key.',
        'Simulated blinking visual caret respecting the prefers-reduced-motion preference.',
        'Accessible to screen readers with a clear label.',
    ],
    i18n: inputOtpI18n,
}

export function InputOtpDocs() {
    return <DocPage doc={docData} />
}
