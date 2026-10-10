import { useState } from 'react'
import { Button } from '@monority/ui/button'
import { Callout } from '@monority/ui/callout'
import { Checkbox } from '@monority/ui/checkbox'
import { Input } from '@monority/ui/input'
import { Section } from '@monority/ui/section'
import { Sheet } from '@monority/ui/sheet'
import { Slider } from '@monority/ui/slider'
import { Stack } from '@monority/ui/stack'
import { Switch } from '@monority/ui/switch'
import { Textarea } from '@monority/ui/textarea'

export function SettingsComposition() {
    const [saved, setSaved] = useState(false)
    const [sheetOpen, setSheetOpen] = useState(false)

    return (
        <Section title="Workspace settings" variant="card" spacing="md">
            <Stack gap="md">
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
                    <Button variant="ghost" onClick={() => setSheetOpen(true)}>
                        Securite & acces avances
                    </Button>
                    <Button variant="secondary">Cancel</Button>
                    <Button onClick={() => setSaved(true)}>Save changes</Button>
                </div>
            </Stack>

            <Sheet
                open={sheetOpen}
                title="Securite et autorisations"
                description="Configurez les acces administrateur et les restrictions de conformite."
                side="right"
                onClose={() => setSheetOpen(false)}
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setSheetOpen(false)}>
                            Fermer
                        </Button>
                        <Button variant="primary" onClick={() => setSheetOpen(false)}>
                            Appliquer les regles
                        </Button>
                    </>
                }
            >
                <Stack gap="md">
                    <Switch
                        label="Authentification double facteur obligatoire"
                        hint="Exige un code OTP pour tous les collaborateurs."
                        defaultChecked
                    />
                    <Switch
                        label="Restreindre aux adresses IP autorisees"
                        hint="Bloque les connexions externes hors VPN d entreprise."
                    />
                    <Input
                        label="Domaines de messagerie valides"
                        defaultValue="@monority.dev, @company.com"
                        hint="Separer les domaines par des virgules."
                    />
                </Stack>
            </Sheet>
        </Section>
    )
}
