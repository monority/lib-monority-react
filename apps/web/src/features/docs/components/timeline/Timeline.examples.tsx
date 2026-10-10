import { Timeline } from '@monority/ui/timeline'
import { Card } from '@monority/ui/card'
import { Badge } from '@monority/ui/badge'

export function TimelineBasicExample() {
    return (
        <Timeline
            items={[
                {
                    id: 1,
                    date: "Aujourd'hui a 14h30",
                    title: 'Deploiement effectue',
                    description: "La version 0.2.0 est en ligne sur l'environnement de production.",
                    status: 'success',
                },
                {
                    id: 2,
                    date: "Aujourd'hui a 11h15",
                    title: 'Verification de securite',
                    description: 'Audit automatise termine avec 0 vulnerabilite detectee.',
                    status: 'primary',
                },
                {
                    id: 3,
                    date: 'Hier a 17h40',
                    title: 'Revue de code approuvee',
                    description: "Les modifications de la base CSS ont ete validees par l'equipe.",
                    status: 'default',
                },
            ]}
        />
    )
}

export function TimelineCompoundExample() {
    return (
        <Timeline>
            <Timeline.Item status="success">
                <Timeline.Point />
                <Timeline.Content>
                    <Timeline.Date>Etape 1</Timeline.Date>
                    <Timeline.Title>Initialisation du projet</Timeline.Title>
                    <Timeline.Description>
                        Configuration du monorepo et des outils de compilation.
                    </Timeline.Description>
                </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item status="in-progress">
                <Timeline.Point />
                <Timeline.Content>
                    <Timeline.Date>Etape 2 (en cours)</Timeline.Date>
                    <Timeline.Title>Conception des nouveaux composants</Timeline.Title>
                    <Timeline.Description>
                        Ajout de Sheet, InputOTP et Timeline au systeme.
                    </Timeline.Description>
                </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item status="default">
                <Timeline.Point />
                <Timeline.Content>
                    <Timeline.Date>Etape 3 (a venir)</Timeline.Date>
                    <Timeline.Title>Publication et diffusion</Timeline.Title>
                    <Timeline.Description>
                        Generation du changelog et publication npm.
                    </Timeline.Description>
                </Timeline.Content>
            </Timeline.Item>
        </Timeline>
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
                    <Badge variant="primary">Expediee</Badge>
                </div>
            </Card.Header>
            <Card.Content>
                <Timeline
                    orientation="horizontal"
                    items={[
                        { date: '10 Oct', title: 'Commande validee', status: 'success' },
                        { date: '11 Oct', title: 'Preparation en entrepot', status: 'success' },
                        { date: '12 Oct', title: "En cours d'acheminement", status: 'in-progress' },
                        {
                            date: 'Estimee 14 Oct',
                            title: 'Livraison au destinataire',
                            status: 'default',
                        },
                    ]}
                />
            </Card.Content>
        </Card>
    )
}
