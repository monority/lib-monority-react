import {
    BadgeDelta,
    Card,
    Grid,
    Rating,
    SegmentedControl,
    Stack,
    Stepper,
    Text,
} from '@monority/ui'

export function MoodboardAdvancedControls() {
    return (
        <Grid columns={2}>
            <Card padding="md">
                <Card.Header>
                    <Text size="sm" tone="muted">
                        SEQUENCE & CONTROLS
                    </Text>
                </Card.Header>
                <Card.Content>
                    <Stack gap="md">
                        <SegmentedControl
                            size="sm"
                            defaultValue="preview"
                            options={[
                                { value: 'preview', label: 'Preview' },
                                { value: 'staging', label: 'Staging' },
                                { value: 'production', label: 'Production' },
                            ]}
                        />
                        <Stepper
                            activeStep={1}
                            steps={[
                                { title: 'Validation', description: 'Tests unitaires' },
                                { title: 'Deploiement', description: 'Propagation edge' },
                                { title: 'Surveillance', description: 'Observabilite active' },
                            ]}
                        />
                    </Stack>
                </Card.Content>
            </Card>

            <Card padding="md">
                <Card.Header>
                    <Text size="sm" tone="muted">
                        RATINGS & PERFORMANCE
                    </Text>
                </Card.Header>
                <Card.Content>
                    <Stack gap="md">
                        <Stack direction="horizontal" justify="between" align="center">
                            <Text size="sm" tone="muted">
                                Satisfaction equipe
                            </Text>
                            <Rating value={5} readOnly size="sm" />
                        </Stack>
                        <Stack direction="horizontal" justify="between" align="center">
                            <Text size="sm" tone="muted">
                                Efficacite reseau
                            </Text>
                            <BadgeDelta deltaType="moderate-increase">+28.4%</BadgeDelta>
                        </Stack>
                        <Stack direction="horizontal" justify="between" align="center">
                            <Text size="sm" tone="muted">
                                Temps d execution
                            </Text>
                            <BadgeDelta deltaType="moderate-decrease">-42 ms</BadgeDelta>
                        </Stack>
                    </Stack>
                </Card.Content>
            </Card>
        </Grid>
    )
}
