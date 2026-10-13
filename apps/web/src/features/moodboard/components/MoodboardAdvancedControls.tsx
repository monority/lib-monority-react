import { BadgeDelta } from '@monority/ui/badge-delta'
import { Card } from '@monority/ui/card'
import { Rating } from '@monority/ui/rating'
import { SegmentedControl } from '@monority/ui/segmented-control'
import { Stack } from '@monority/ui/stack'
import { Stepper } from '@monority/ui/stepper'

export function MoodboardAdvancedControls() {
    return (
        <div className="moodboard-preview__grid">
            <Card className="moodboard-card" padding="md">
                <Card.Header>
                    <span className="moodboard-kicker">SEQUENCE & CONTROLS</span>
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

            <Card className="moodboard-card" padding="md">
                <Card.Header>
                    <span className="moodboard-kicker">RATINGS & PERFORMANCE</span>
                </Card.Header>
                <Card.Content>
                    <Stack gap="md">
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span
                                style={{
                                    fontSize: 'var(--mr-text-sm)',
                                    color: 'var(--mr-fg-muted)',
                                }}
                            >
                                Satisfaction equipe
                            </span>
                            <Rating value={5} readOnly size="sm" />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span
                                style={{
                                    fontSize: 'var(--mr-text-sm)',
                                    color: 'var(--mr-fg-muted)',
                                }}
                            >
                                Efficacite reseau
                            </span>
                            <BadgeDelta deltaType="moderate-increase">+28.4%</BadgeDelta>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span
                                style={{
                                    fontSize: 'var(--mr-text-sm)',
                                    color: 'var(--mr-fg-muted)',
                                }}
                            >
                                Temps d execution
                            </span>
                            <BadgeDelta deltaType="moderate-decrease">-42 ms</BadgeDelta>
                        </div>
                    </Stack>
                </Card.Content>
            </Card>
        </div>
    )
}
