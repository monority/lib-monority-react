import { Badge } from '@monority/ui/badge'
import { Card } from '@monority/ui/card'
import { IconAlertCircle, IconCheck, IconPlay, IconSparkles, IconUpload } from '@monority/ui/icons'
import { Timeline } from '@monority/ui/timeline'
import { useState } from 'react'

export function TimelineBasicExample() {
    return (
        <Timeline
            items={[
                {
                    id: 1,
                    date: "Aujourd'hui à 14h30",
                    title: 'Déploiement effectué',
                    description: "La version 0.2.0 est en ligne sur l'environnement de production.",
                    status: 'success',
                },
                {
                    id: 2,
                    date: "Aujourd'hui à 11h15",
                    title: 'Vérification de sécurité',
                    description: 'Audit automatisé terminé avec 0 vulnérabilité détectée.',
                    status: 'primary',
                },
                {
                    id: 3,
                    date: 'Hier à 17h40',
                    title: 'Revue de code approuvée',
                    description: 'Les modifications de la base CSS ont été validées par l’équipe.',
                    status: 'default',
                },
            ]}
        />
    )
}

export function TimelineCompoundExample() {
    return (
        <Timeline size="md" lineStyle="dashed">
            <Timeline.Item status="success">
                <Timeline.Point icon={<IconCheck size={14} />} status="success" />
                <Timeline.Content>
                    <Timeline.Header>
                        <Timeline.Title>Compilation et bundle production</Timeline.Title>
                        <Timeline.Date>14:32:00</Timeline.Date>
                        <Timeline.Extra>
                            <Badge variant="success" size="sm">
                                Succès
                            </Badge>
                        </Timeline.Extra>
                    </Timeline.Header>
                    <Timeline.Description>
                        Artefacts générés sans avertissement (tsup + turborepo).
                    </Timeline.Description>
                </Timeline.Content>
            </Timeline.Item>

            <Timeline.Item status="in-progress">
                <Timeline.Point icon={<IconUpload size={14} />} status="in-progress" />
                <Timeline.Content>
                    <Timeline.Header>
                        <Timeline.Title>Synchronisation multi-régions</Timeline.Title>
                        <Timeline.Date>14:32:15</Timeline.Date>
                        <Timeline.Extra>
                            <Badge variant="primary" size="sm">
                                En cours
                            </Badge>
                        </Timeline.Extra>
                    </Timeline.Header>
                    <Timeline.Description>
                        Propagation en direct vers 24 nœuds edge mondiaux.
                    </Timeline.Description>
                </Timeline.Content>
            </Timeline.Item>

            <Timeline.Item status="default">
                <Timeline.Point icon={<IconSparkles size={14} />} status="default" />
                <Timeline.Content>
                    <Timeline.Header>
                        <Timeline.Title>Vérification de santé des pods</Timeline.Title>
                        <Timeline.Date>En attente</Timeline.Date>
                        <Timeline.Extra>
                            <Badge variant="default" size="sm">
                                Prévu
                            </Badge>
                        </Timeline.Extra>
                    </Timeline.Header>
                    <Timeline.Description>
                        Tests synthétiques et basculement du trafic résiduel.
                    </Timeline.Description>
                </Timeline.Content>
            </Timeline.Item>
        </Timeline>
    )
}

export function TimelineInteractiveExample() {
    const [selectedStep, setSelectedStep] = useState<string | null>(null)

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-space-4)' }}>
            <Timeline size="sm">
                <Timeline.Item
                    interactive
                    status="success"
                    onClick={() => setSelectedStep('step-1')}
                >
                    <Timeline.Point icon={<IconCheck size={12} />} status="success" />
                    <Timeline.Content>
                        <Timeline.Header>
                            <Timeline.Title>Validation des tests unitaires</Timeline.Title>
                            <Timeline.Date>Étape 1</Timeline.Date>
                            <Timeline.Extra>
                                <Badge variant="success" size="sm">
                                    Complété
                                </Badge>
                            </Timeline.Extra>
                        </Timeline.Header>
                        <Timeline.Description>
                            1568 tests passés avec 0 régression.
                        </Timeline.Description>
                    </Timeline.Content>
                </Timeline.Item>

                <Timeline.Item
                    interactive
                    status="warning"
                    onClick={() => setSelectedStep('step-2')}
                >
                    <Timeline.Point icon={<IconAlertCircle size={12} />} status="warning" />
                    <Timeline.Content>
                        <Timeline.Header>
                            <Timeline.Title>Contrôle de taille des paquets</Timeline.Title>
                            <Timeline.Date>Étape 2</Timeline.Date>
                            <Timeline.Extra>
                                <Badge variant="warning" size="sm">
                                    Attention
                                </Badge>
                            </Timeline.Extra>
                        </Timeline.Header>
                        <Timeline.Description>
                            Le bundle a augmenté de 1.2% (seuil toléré: 2.0%).
                        </Timeline.Description>
                    </Timeline.Content>
                </Timeline.Item>

                <Timeline.Item
                    interactive
                    status="primary"
                    onClick={() => setSelectedStep('step-3')}
                >
                    <Timeline.Point icon={<IconPlay size={12} />} status="primary" />
                    <Timeline.Content>
                        <Timeline.Header>
                            <Timeline.Title>Signature cryptographique</Timeline.Title>
                            <Timeline.Date>Étape 3</Timeline.Date>
                            <Timeline.Extra>
                                <Badge variant="primary" size="sm">
                                    Action requise
                                </Badge>
                            </Timeline.Extra>
                        </Timeline.Header>
                        <Timeline.Description>
                            Cliquez sur cet élément pour approuver la publication.
                        </Timeline.Description>
                    </Timeline.Content>
                </Timeline.Item>
            </Timeline>

            {selectedStep ? (
                <div
                    style={{
                        padding: 'var(--mr-space-3)',
                        borderRadius: 'var(--mr-radius-md)',
                        backgroundColor: 'var(--mr-bg-sunken)',
                        border: '1px solid var(--mr-border-subtle)',
                        fontSize: 'var(--mr-font-size-xs)',
                        fontFamily: 'var(--mr-font-family-mono)',
                    }}
                >
                    Étape sélectionnée : {selectedStep}
                </div>
            ) : null}
        </div>
    )
}

export function TimelineHorizontalExample() {
    return (
        <Card>
            <Card.Header>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Card.Title>Progression de commande</Card.Title>
                    <Badge variant="primary">Expédiée</Badge>
                </div>
            </Card.Header>
            <Card.Content>
                <Timeline
                    orientation="horizontal"
                    items={[
                        { date: '10 Oct', title: 'Commande validée', status: 'success' },
                        { date: '11 Oct', title: 'Préparation en entrepôt', status: 'success' },
                        { date: '12 Oct', title: 'En cours d’acheminement', status: 'in-progress' },
                        {
                            date: 'Estimée 14 Oct',
                            title: 'Livraison au destinataire',
                            status: 'default',
                        },
                    ]}
                />
            </Card.Content>
        </Card>
    )
}
