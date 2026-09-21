import { useState } from 'react'
import { Button } from '@monority/ui/button'
import { Callout } from '@monority/ui/callout'
import { Checkbox } from '@monority/ui/checkbox'
import { Input } from '@monority/ui/input'
import { Section } from '@monority/ui/section'
import { Slider } from '@monority/ui/slider'
import { Switch } from '@monority/ui/switch'
import { Textarea } from '@monority/ui/textarea'

export function SettingsComposition() {
    const [saved, setSaved] = useState(false)

    return (
        <Section title="Workspace settings" variant="card" spacing="md">
            <div className="sc-form">
                <Input
                    label="Workspace name"
                    placeholder="Design system docs"
                    hint="Visible to every member of the team."
                />
                <Input
                    label="Contact email"
                    type="email"
                    placeholder="team@company.com"
                    hint="Used for billing receipts only."
                />
                <Textarea
                    label="Team mission"
                    placeholder="What does this workspace own?"
                    resize="vertical"
                />
                <Switch
                    label="Weekly digest"
                    hint="Email every Monday with component updates."
                    defaultChecked
                />
                <Checkbox
                    label="Include failed jobs in the digest"
                    hint="Adds a failures section when checks fail."
                    defaultChecked
                />
                <Slider
                    label="Digest frequency (days)"
                    min={1}
                    max={14}
                    step={1}
                    defaultValue={7}
                />
                {saved && (
                    <Callout
                        tone="success"
                        title="Settings saved"
                        description="Preferences were updated for all 14 members."
                    />
                )}
                <div className="sc-form__actions">
                    <Button variant="secondary">Cancel</Button>
                    <Button onClick={() => setSaved(true)}>Save changes</Button>
                </div>
            </div>
        </Section>
    )
}
