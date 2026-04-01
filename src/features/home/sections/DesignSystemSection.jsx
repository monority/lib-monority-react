import {
    Badge,
    Button,
    Divider,
    EmptyState,
    Grid,
    IconButton,
    Section,
    Select,
    Stack,
    Text,
    Textarea,
    Title,
} from '@/components/ui'

export function DesignSystemSection({ content }) {
    return (
        <Section id="tokens" spacing="md" surface className="token-panel stack-m">
            <div className="cluster between">
                <Title as="h2" size="md">
                    {content.title}
                </Title>
                <Badge>{content.badge}</Badge>
            </div>
            <Text tone="base" size="md">
                {content.description}
            </Text>
            <Grid cols={2} gap="md" className="token-grid">
                {content.tokenItems.map((item) => (
                    <Text key={item} className="ui-chip" tone="base">
                        {item}
                    </Text>
                ))}
            </Grid>
            <Divider label={content.dividerLabel} />
            <Grid cols={2} gap="lg" className="token-grid">
                <Stack gap="m">
                    <Select
                        label="Theme preset"
                        defaultValue="system"
                        hint="Base de select reutilisable."
                    >
                        <option value="system">System</option>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </Select>
                    <Textarea
                        label="Project notes"
                        placeholder="Documente rapidement le contexte d'une feature..."
                        hint="Textarea simple, propre et coherente avec Input."
                    />
                    <div className="cluster">
                        <Button size="sm">Action</Button>
                        <IconButton label="Ouvrir les options" variant="ghost" size="sm">
                            <span aria-hidden="true">+</span>
                        </IconButton>
                    </div>
                </Stack>
                <EmptyState
                    title="UI extensible"
                    description="Ajoute de nouvelles primitives sans casser la logique du systeme."
                    action={
                        <Button variant="subtle" size="sm">
                            Continuer la base
                        </Button>
                    }
                />
            </Grid>
        </Section>
    )
}
