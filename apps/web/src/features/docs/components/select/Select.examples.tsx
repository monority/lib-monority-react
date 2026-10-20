import { Select } from '@monority/ui/select'
import { Stack } from '@monority/ui/stack'

export function SelectBasicExample() {
    return (
        <Select label="Country" data-testid="select-basic">
            <Select.Option value="">Select an option...</Select.Option>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
            <Select.Option value="long">
                A deliberately long country or region option that must stay clear of the chevron
            </Select.Option>
        </Select>
    )
}

export function SelectWithHintExample() {
    return (
        <Select label="Timezone" hint="Select your local timezone">
            <Select.Option value="">Choose...</Select.Option>
            <Select.Option value="utc">UTC</Select.Option>
            <Select.Option value="est">EST</Select.Option>
            <Select.Option value="pst">PST</Select.Option>
        </Select>
    )
}

export function SelectLoadingExample() {
    return (
        <Select
            label="Région de déploiement"
            loading
            options={[{ value: 'eu-west', label: 'Europe (Paris)' }]}
            hint="Le chevron est remplacé par un indicateur de chargement discret."
        />
    )
}

export function SelectInvalidExample() {
    return (
        <Select label="Category" error="Please select a category">
            <Select.Option value="">Select...</Select.Option>
            <Select.Option value="a">Category A</Select.Option>
            <Select.Option value="b">Category B</Select.Option>
        </Select>
    )
}

export function SelectDisabledExample() {
    return (
        <Select label="Disabled" disabled>
            <Select.Option>Cannot interact</Select.Option>
        </Select>
    )
}

export function SelectRequiredExample() {
    return (
        <Select label="Required field" required>
            <Select.Option value="">Select...</Select.Option>
            <Select.Option value="1">Option 1</Select.Option>
        </Select>
    )
}

export function SelectSizesExample() {
    return (
        <Stack direction="horizontal" gap="sm" align="start" style={{ flexWrap: 'wrap' }}>
            <Select label="Small" size="sm">
                <Select.Option>Small</Select.Option>
            </Select>
            <Select label="Medium" size="md">
                <Select.Option>Medium</Select.Option>
            </Select>
            <Select label="Large" size="lg">
                <Select.Option>Large</Select.Option>
            </Select>
        </Stack>
    )
}

export function SelectGroupExample() {
    return (
        <Select label="Technologie frontend" defaultValue="react">
            <Select.Group label="Ecosysteme React">
                <Select.Option value="react">React 19</Select.Option>
                <Select.Option value="next">Next.js</Select.Option>
                <Select.Option value="remix">Remix</Select.Option>
            </Select.Group>
            <Select.Group label="Alternatives">
                <Select.Option value="vue">Vue 3</Select.Option>
                <Select.Option value="svelte">Svelte 5</Select.Option>
            </Select.Group>
        </Select>
    )
}
