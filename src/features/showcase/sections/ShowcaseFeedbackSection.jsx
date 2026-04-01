import { Card, Grid, Section, Skeleton, Text, Title, Toast, Tooltip } from '@/components/ui'

export function ShowcaseFeedbackSection() {
    return (
        <Section id="feedback" surface className="stack-m">
            <div className="stack-s">
                <Text className="eyebrow" tone="strong">
                    Feedback
                </Text>
                <Title as="h2" size="md">
                    Skeleton, tooltip et toast
                </Title>
                <Text tone="base">
                    Ces composants aident a rendre l'application plus vivante et plus claire pour l'utilisateur.
                </Text>
            </div>

            <Grid cols={2} gap="md">
                <Card padding="md" className="stack-m">
                    <Tooltip content="Info contextuelle de demonstration">
                        <button type="button" className="ui-btn ui-btn--ghost ui-btn--sm">
                            Hover me
                        </button>
                    </Tooltip>
                    <div className="stack-s">
                        <Skeleton style={{ width: '100%', height: '1.1rem' }} />
                        <Skeleton style={{ width: '76%', height: '1.1rem' }} />
                        <Skeleton style={{ width: '58%', height: '1.1rem' }} />
                    </div>
                </Card>
                <Card padding="md" className="stack-m">
                    <Toast
                        title="Mise a jour disponible"
                        description="Le design system a ete enrichi avec des composants de feedback."
                    />
                    <Toast
                        tone="success"
                        title="Composant ajoute"
                        description="Le starter dispose maintenant d'un toast de base."
                    />
                </Card>
            </Grid>
        </Section>
    )
}
