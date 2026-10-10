import { useState } from 'react'
import { InputOTP } from '@monority/ui/input-otp'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

function InputOTPDemo(props: PlaygroundProps) {
    const [value, setValue] = useState(String(props.defaultValue ?? ''))

    return (
        <InputOTP
            maxLength={Number(props.maxLength ?? 6)}
            value={value}
            onChange={setValue}
            disabled={Boolean(props.disabled)}
        />
    )
}

function codeFor(props: PlaygroundProps): string {
    return `<InputOTP maxLength={${props.maxLength ?? 6}} value={code} onChange={setCode} />`
}

export const inputOtpPlayground: PlaygroundDefinition = {
    slug: 'input-otp',
    label: 'InputOTP',
    docsPath: '/docs/input-otp',
    importStatement: "import { InputOTP } from '@monority/ui/input-otp'",
    controls: [
        {
            name: 'maxLength',
            type: 'select',
            options: ['4', '6', '8'],
        },
        { name: 'disabled', type: 'boolean' },
    ],
    defaultProps: { maxLength: '6', disabled: false },
    render: (props) => <InputOTPDemo {...props} />,
    generateCode: codeFor,
}
