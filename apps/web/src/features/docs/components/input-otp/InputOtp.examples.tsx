import { useState } from 'react'
import { InputOTP } from '@monority/ui/input-otp'
import { Button } from '@monority/ui/button'
import { Callout } from '@monority/ui/callout'
import { Stack } from '@monority/ui/stack'

export function InputOtpBasicExample() {
    const [value, setValue] = useState('')
    const [completedCode, setCompletedCode] = useState<string | null>(null)

    return (
        <Stack gap="md" align="start">
            <InputOTP
                maxLength={6}
                value={value}
                onChange={setValue}
                onComplete={(code) => setCompletedCode(code)}
            />
            {completedCode ? (
                <Callout variant="success" title="Code valide">
                    Code 2FA confirme avec succes : {completedCode}
                </Callout>
            ) : null}
        </Stack>
    )
}

export function InputOtpCompoundExample() {
    const [value, setValue] = useState('123')

    return (
        <Stack gap="md" align="start">
            <InputOTP maxLength={6} value={value} onChange={setValue}>
                <InputOTP.Group>
                    <InputOTP.Slot index={0} />
                    <InputOTP.Slot index={1} />
                    <InputOTP.Slot index={2} />
                </InputOTP.Group>
                <InputOTP.Separator />
                <InputOTP.Group>
                    <InputOTP.Slot index={3} />
                    <InputOTP.Slot index={4} />
                    <InputOTP.Slot index={5} />
                </InputOTP.Group>
            </InputOTP>
            <Button size="sm" variant="secondary" onClick={() => setValue('')}>
                Reinitialiser le code
            </Button>
        </Stack>
    )
}

export function InputOtpDisabledExample() {
    return <InputOTP maxLength={4} defaultValue="12" disabled />
}
