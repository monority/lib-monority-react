import { RadioGroup } from '@monority/ui/radio-group'

export function RadioGroupBasicExample() {
    return (
        <RadioGroup
            label="Options"
            defaultValue="md"
            items={[
                { value: 'sm', label: 'Default' },
                { value: 'md', label: 'Value' },
            ]}
        />
    )
}

export function RadioGroupInvalidExample() {
    return (
        <RadioGroup
            label="Plan"
            error="Please select a plan"
            invalid
            defaultValue=""
            items={[
                { value: 'free', label: 'Free' },
                { value: 'pro', label: 'Pro' },
                { value: 'enterprise', label: 'Enterprise' },
            ]}
        />
    )
}

export function RadioGroupWithDescriptionExample() {
    return (
        <RadioGroup
            data-testid="radio-described"
            label="Notification preference"
            defaultValue="mention"
            items={[
                { value: 'all', label: 'All notifications', description: 'Receive everything' },
                {
                    value: 'mention',
                    label: 'Mentions only',
                    description: 'Only when someone mentions you',
                },
                { value: 'none', label: 'None', description: 'Opt out of all notifications' },
            ]}
        />
    )
}

export function RadioGroupChoiceCardExample() {
    return (
        <RadioGroup
            label="Billing plan"
            defaultValue="pro"
            items={[
                { value: 'basic', label: 'Basic', description: 'Up to 10 projects' },
                { value: 'pro', label: 'Pro', description: 'Unlimited projects' },
                { value: 'enterprise', label: 'Enterprise', description: 'Custom solutions' },
            ]}
        />
    )
}

export function RadioGroupFieldsetExample() {
    return (
        <RadioGroup
            label="Theme preference"
            defaultValue="system"
            items={[
                { value: 'light', label: 'Light mode' },
                { value: 'dark', label: 'Dark mode' },
                { value: 'system', label: 'System default' },
            ]}
        />
    )
}
