import { Badge } from '@monority/ui/badge'
import { Card } from '@monority/ui/card'
import { IconAlertCircle, IconCheck, IconPlay, IconSparkles, IconUpload } from '@monority/ui/icons'
import { Timeline } from '@monority/ui/timeline'
import { useState } from 'react'
import { useLocale } from '../../../../shared/i18n'

export function TimelineBasicExample() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'

    return (
        <Timeline
            items={[
                {
                    id: 1,
                    date: isFr ? "Aujourd'hui à 14h30" : 'Today at 2:30 PM',
                    title: isFr ? 'Déploiement effectué' : 'Deployment completed',
                    description: isFr
                        ? "La version 0.2.0 est en ligne sur l'environnement de production."
                        : 'Version 0.2.0 is live in production.',
                    status: 'success',
                },
                {
                    id: 2,
                    date: isFr ? "Aujourd'hui à 11h15" : 'Today at 11:15 AM',
                    title: isFr ? 'Vérification de sécurité' : 'Security audit',
                    description: isFr
                        ? 'Audit automatisé terminé avec 0 vulnérabilité détectée.'
                        : 'Automated scan finished with 0 vulnerabilities detected.',
                    status: 'primary',
                },
                {
                    id: 3,
                    date: isFr ? 'Hier à 17h40' : 'Yesterday at 5:40 PM',
                    title: isFr ? 'Revue de code approuvée' : 'Pull request approved',
                    description: isFr
                        ? 'Les modifications de la base CSS ont été validées par l’équipe.'
                        : 'CSS foundation changes were approved by the team.',
                    status: 'default',
                },
            ]}
        />
    )
}

export function TimelineCompoundExample() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'

    return (
        <Timeline size="md" lineStyle="dashed">
            <Timeline.Item status="success">
                <Timeline.Point icon={<IconCheck size={14} />} status="success" />
                <Timeline.Content>
                    <Timeline.Header>
                        <Timeline.Title>
                            {isFr
                                ? 'Compilation et bundle production'
                                : 'Build and production bundle'}
                        </Timeline.Title>
                        <Timeline.Date>14:32:00</Timeline.Date>
                        <Timeline.Extra>
                            <Badge variant="success" size="sm">
                                {isFr ? 'Succès' : 'Success'}
                            </Badge>
                        </Timeline.Extra>
                    </Timeline.Header>
                    <Timeline.Description>
                        {isFr
                            ? 'Artefacts générés sans avertissement (tsup + turborepo).'
                            : 'Artifacts generated without warnings (tsup + turborepo).'}
                    </Timeline.Description>
                </Timeline.Content>
            </Timeline.Item>

            <Timeline.Item status="in-progress">
                <Timeline.Point icon={<IconUpload size={14} />} status="in-progress" />
                <Timeline.Content>
                    <Timeline.Header>
                        <Timeline.Title>
                            {isFr
                                ? 'Synchronisation multi-régions'
                                : 'Multi-region synchronization'}
                        </Timeline.Title>
                        <Timeline.Date>14:32:15</Timeline.Date>
                        <Timeline.Extra>
                            <Badge variant="primary" size="sm">
                                {isFr ? 'En cours' : 'In progress'}
                            </Badge>
                        </Timeline.Extra>
                    </Timeline.Header>
                    <Timeline.Description>
                        {isFr
                            ? 'Propagation en direct vers 24 nœuds edge mondiaux.'
                            : 'Live propagation across 24 edge nodes worldwide.'}
                    </Timeline.Description>
                </Timeline.Content>
            </Timeline.Item>

            <Timeline.Item status="default">
                <Timeline.Point icon={<IconSparkles size={14} />} status="default" />
                <Timeline.Content>
                    <Timeline.Header>
                        <Timeline.Title>
                            {isFr ? 'Vérification de santé des pods' : 'Pod health check'}
                        </Timeline.Title>
                        <Timeline.Date>{isFr ? 'En attente' : 'Pending'}</Timeline.Date>
                        <Timeline.Extra>
                            <Badge variant="default" size="sm">
                                {isFr ? 'Prévu' : 'Scheduled'}
                            </Badge>
                        </Timeline.Extra>
                    </Timeline.Header>
                    <Timeline.Description>
                        {isFr
                            ? 'Tests synthétiques et basculement du trafic résiduel.'
                            : 'Synthetic tests and residual traffic rerouting.'}
                    </Timeline.Description>
                </Timeline.Content>
            </Timeline.Item>
        </Timeline>
    )
}

export function TimelineInteractiveExample() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'
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
                            <Timeline.Title>
                                {isFr ? 'Validation des tests unitaires' : 'Unit test validation'}
                            </Timeline.Title>
                            <Timeline.Date>{isFr ? 'Étape 1' : 'Step 1'}</Timeline.Date>
                            <Timeline.Extra>
                                <Badge variant="success" size="sm">
                                    {isFr ? 'Complété' : 'Passed'}
                                </Badge>
                            </Timeline.Extra>
                        </Timeline.Header>
                        <Timeline.Description>
                            {isFr
                                ? '1568 tests passés avec 0 régression.'
                                : '1,568 tests passed with 0 regressions.'}
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
                            <Timeline.Title>
                                {isFr ? 'Contrôle de taille des paquets' : 'Package size check'}
                            </Timeline.Title>
                            <Timeline.Date>{isFr ? 'Étape 2' : 'Step 2'}</Timeline.Date>
                            <Timeline.Extra>
                                <Badge variant="warning" size="sm">
                                    {isFr ? 'Attention' : 'Warning'}
                                </Badge>
                            </Timeline.Extra>
                        </Timeline.Header>
                        <Timeline.Description>
                            {isFr
                                ? 'Le bundle a augmenté de 1.2% (seuil toléré: 2.0%).'
                                : 'Bundle size increased by 1.2% (threshold: 2.0%).'}
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
                            <Timeline.Title>
                                {isFr ? 'Signature cryptographique' : 'Cryptographic signature'}
                            </Timeline.Title>
                            <Timeline.Date>{isFr ? 'Étape 3' : 'Step 3'}</Timeline.Date>
                            <Timeline.Extra>
                                <Badge variant="primary" size="sm">
                                    {isFr ? 'Action requise' : 'Action required'}
                                </Badge>
                            </Timeline.Extra>
                        </Timeline.Header>
                        <Timeline.Description>
                            {isFr
                                ? 'Cliquez sur cet élément pour approuver la publication.'
                                : 'Click this item to approve release publication.'}
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
                    {isFr ? 'Étape sélectionnée :' : 'Selected step:'} {selectedStep}
                </div>
            ) : null}
        </div>
    )
}

export function TimelineHorizontalExample() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'

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
                    <Card.Title>{isFr ? 'Progression de commande' : 'Order tracking'}</Card.Title>
                    <Badge variant="primary">{isFr ? 'Expédiée' : 'Shipped'}</Badge>
                </div>
            </Card.Header>
            <Card.Content>
                <Timeline
                    orientation="horizontal"
                    items={
                        isFr
                            ? [
                                  { date: '10 Oct', title: 'Commande validée', status: 'success' },
                                  {
                                      date: '11 Oct',
                                      title: 'Préparation en entrepôt',
                                      status: 'success',
                                  },
                                  {
                                      date: '12 Oct',
                                      title: 'En cours d’acheminement',
                                      status: 'in-progress',
                                  },
                                  {
                                      date: 'Estimée 14 Oct',
                                      title: 'Livraison au destinataire',
                                      status: 'default',
                                  },
                              ]
                            : [
                                  { date: 'Oct 10', title: 'Order confirmed', status: 'success' },
                                  {
                                      date: 'Oct 11',
                                      title: 'Warehouse dispatch',
                                      status: 'success',
                                  },
                                  { date: 'Oct 12', title: 'In transit', status: 'in-progress' },
                                  {
                                      date: 'Est. Oct 14',
                                      title: 'Out for delivery',
                                      status: 'default',
                                  },
                              ]
                    }
                />
            </Card.Content>
        </Card>
    )
}
