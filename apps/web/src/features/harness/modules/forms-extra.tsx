import { PasswordInput } from '@monority/ui'
import { Sample } from '../Sample'

export function PasswordInputHarness() {
    return (
        <>
            <Sample label="PasswordInput SM">
                <PasswordInput
                    size="sm"
                    label="Master Password (SM)"
                    placeholder="Enter password..."
                    defaultValue="Sup3rS3cr3t!"
                />
            </Sample>
            <Sample label="PasswordInput MD">
                <PasswordInput
                    size="md"
                    label="Master Password (MD)"
                    hint="Must be at least 8 characters"
                    placeholder="Enter password..."
                    defaultValue="Sup3rS3cr3t!"
                />
            </Sample>
            <Sample label="PasswordInput LG">
                <PasswordInput
                    size="lg"
                    label="Master Password (LG)"
                    placeholder="Enter password..."
                    defaultValue="Sup3rS3cr3t!"
                />
            </Sample>
            <Sample label="PasswordInput Error">
                <PasswordInput
                    size="md"
                    label="Password"
                    error="Password is too weak"
                    defaultValue="123456"
                />
            </Sample>
            <Sample label="PasswordInput Disabled">
                <PasswordInput
                    disabled
                    size="md"
                    label="Locked Account"
                    defaultValue="cannot-edit-this"
                />
            </Sample>
        </>
    )
}
