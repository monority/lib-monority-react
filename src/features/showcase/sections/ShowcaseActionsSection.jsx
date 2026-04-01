import { useState } from 'react'
import { Button, Card, Grid, IconButton, Modal, Section, Text, Title } from '@/components/ui'

export function ShowcaseActionsSection() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Section id="actions" surface className="stack-m">
                <div className="stack-s">
                    <Text className="eyebrow" tone="strong">
                        Actions
                    </Text>
                    <Title as="h2" size="md">
                        Boutons et feedback
                    </Title>
                    <Text tone="base">
                        Les variantes montrent le langage d'action principal du systeme.
                    </Text>
                </div>

                <Grid cols={2} gap="md">
                    <Card padding="md" className="stack-m">
                        <Text tone="strong" size="sm">
                            Variantes
                        </Text>
                        <div className="cluster">
                            <Button>Primary</Button>
                            <Button variant="ghost">Ghost</Button>
                            <Button variant="subtle">Subtle</Button>
                            <Button loading>Loading</Button>
                        </div>
                    </Card>
                    <Card padding="md" className="stack-m">
                        <Text tone="strong" size="sm">
                            Actions secondaires
                        </Text>
                        <div className="cluster">
                            <IconButton label="Ajouter" variant="ghost">
                                <span aria-hidden="true">+</span>
                            </IconButton>
                            <Button size="sm" onClick={() => setIsOpen(true)}>
                                Ouvrir modal
                            </Button>
                        </div>
                    </Card>
                </Grid>
            </Section>

            <Modal open={isOpen} title="Showcase modal" onClose={() => setIsOpen(false)}>
                <Text tone="base">
                    Cette modal sert de demonstration directe dans la page de showcase.
                </Text>
            </Modal>
        </>
    )
}
