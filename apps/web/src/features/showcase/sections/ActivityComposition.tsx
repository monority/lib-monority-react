import { Avatar } from '@monority/ui/avatar'
import { Badge } from '@monority/ui/badge'
import { BadgeDelta } from '@monority/ui/badge-delta'
import { Button } from '@monority/ui/button'
import { Card } from '@monority/ui/card'
import { Progress } from '@monority/ui/progress'
import { Section } from '@monority/ui/section'
import { Skeleton } from '@monority/ui/skeleton'
import { Spinner } from '@monority/ui/spinner'
import { Stack } from '@monority/ui/stack'
import { Timeline } from '@monority/ui/timeline'
import { Tooltip } from '@monority/ui/tooltip'

const timelineItems = [
    {
        id: 1,
        date: 'Aujourd hui a 14h30',
        title: 'Deploiement v0.4.1 valide',
        description: 'Artefacts compiles et synchronises sur le reseau de distribution.',
        status: 'success' as const,
    },
    {
        id: 2,
        date: 'Aujourd hui a 14h12',
        title: 'Verification de non-regression',
        description: '105 suites de tests et 1341 assertions executees avec succes.',
        status: 'success' as const,
    },
    {
        id: 3,
        date: 'Aujourd hui a 13h50',
        title: 'Validation des contrastes WCAG',
        description: 'Balayage complet sur les 7 themes actifs sans anomalie de contraste.',
        status: 'in-progress' as const,
    },
]

export function ActivityComposition() {
    return (
        <Section title="Project overview" variant="bordered" spacing="md">
            <Stack gap="md">
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '0.75rem',
                    }}
                >
                    <Card padding="md">
                        <Stack gap="xs">
                            <span className="sc-muted">Couverture de tests</span>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <strong style={{ fontSize: 'var(--mr-text-xl)' }}>99.4%</strong>
                                <BadgeDelta deltaType="increase" size="sm">
                                    +3.2%
                                </BadgeDelta>
                            </div>
                        </Stack>
                    </Card>
                    <Card padding="md">
                        <Stack gap="xs">
                            <span className="sc-muted">Latence mediane TTFB</span>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <strong style={{ fontSize: 'var(--mr-text-xl)' }}>42ms</strong>
                                <BadgeDelta
                                    deltaType="decrease"
                                    isIncreasePositive={false}
                                    size="sm"
                                >
                                    -18ms
                                </BadgeDelta>
                            </div>
                        </Stack>
                    </Card>
                    <Card padding="md">
                        <Stack gap="xs">
                            <span className="sc-muted">Taux d erreur global</span>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <strong style={{ fontSize: 'var(--mr-text-xl)' }}>0.01%</strong>
                                <BadgeDelta deltaType="unchanged" size="sm">
                                    0.0%
                                </BadgeDelta>
                            </div>
                        </Stack>
                    </Card>
                </div>

                <Card padding="md">
                    <Card.Header>
                        <Card.Title>Journal d activite & deploiement</Card.Title>
                    </Card.Header>
                    <Card.Content>
                        <Timeline items={timelineItems} />
                    </Card.Content>
                </Card>

                <Card padding="md">
                    <div className="sc-activity__row">
                        <div>
                            <strong>Revue d architecture terminee</strong>
                            <p className="sc-muted">
                                Toutes les PRs sont fusionnees dans la branche principale.
                            </p>
                        </div>
                        <Tooltip content="Consulter l archive des revues">
                            <Button variant="ghost" size="sm">
                                Voir archive
                            </Button>
                        </Tooltip>
                    </div>
                </Card>

                <Card padding="md">
                    <Progress value={85} label="Progression de la vague de composants" />
                </Card>

                <Card padding="md" aria-busy="true">
                    <div className="sc-activity__row">
                        <div style={{ display: 'grid', gap: '0.5rem', flex: 1 }}>
                            <Skeleton width="42%" height="1rem" />
                            <Skeleton width="68%" height="0.875rem" />
                        </div>
                        <Spinner size="sm" tone="muted" />
                    </div>
                </Card>
            </Stack>
        </Section>
    )
}
