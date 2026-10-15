import { Input } from '@monority/ui/input'
import { NumberInput } from '@monority/ui/number-input'
import { PasswordInput } from '@monority/ui/password-input'
import { Stack } from '@monority/ui/stack'

export function InputBasicExample() {
    return <Input label="Email" hint="Use your work email." placeholder="you@company.com" />
}

export function InputSearchExample() {
    return <Input label="Search" placeholder="Search..." type="search" />
}

export function InputClearableExample() {
    return (
        <Input
            label="Recherche rapide"
            placeholder="Tapez un mot-clé..."
            defaultValue="Design System"
            clearable
            hint="Le bouton d'effacement apparaît dès que le champ est non vide."
        />
    )
}

export function InputNumberExample() {
    return <NumberInput label="Quantity" min={0} max={100} step={1} />
}

export function InputPasswordExample() {
    return <PasswordInput label="Password" hint="8+ characters" />
}

export function InputFamilySizesExample() {
    return (
        <Stack gap="md">
            <Stack direction="horizontal" gap="sm">
                <Input label="Input small" size="sm" />
                <Input label="Input medium" size="md" />
                <Input label="Input large" size="lg" />
            </Stack>
            <Stack direction="horizontal" gap="sm">
                <NumberInput label="Number small" size="sm" />
                <NumberInput label="Number medium" size="md" />
                <NumberInput label="Number large" size="lg" />
            </Stack>
            <Stack direction="horizontal" gap="sm">
                <PasswordInput label="Password small" size="sm" />
                <PasswordInput label="Password medium" size="md" />
                <PasswordInput label="Password large" size="lg" />
            </Stack>
        </Stack>
    )
}
