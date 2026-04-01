import { Button, Card, Grid, Input, Section, Select, Stack, Text, Textarea, Title } from '@/components/ui'

export function ShowcaseFormsSection() {
    return (
        <Section id="forms" surface className="stack-m">
            <div className="stack-s">
                <Text className="eyebrow" tone="strong">
                    Forms
                </Text>
                <Title as="h2" size="md">
                    Champs de formulaire
                </Title>
                <Text tone="base">
                    Les champs sont penses pour partager la meme logique d'accessibilite et de style.
                </Text>
            </div>

            <Grid cols={2} gap="md">
                <Card padding="md" className="stack-m">
                    <Input
                        label="Email"
                        placeholder="you@studio.dev"
                        hint="Exemple d'input standard."
                    />
                    <Select label="Theme" defaultValue="system">
                        <option value="system">System</option>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </Select>
                </Card>
                <Card padding="md" className="stack-m">
                    <Textarea
                        label="Message"
                        placeholder="Decris ici le besoin de la feature..."
                        hint="Textarea multi-lignes pour les contenus plus riches."
                    />
                    <Button fullWidth>Envoyer</Button>
                </Card>
            </Grid>
        </Section>
    )
}
