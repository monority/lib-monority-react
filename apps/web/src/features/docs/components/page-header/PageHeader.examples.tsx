import { Button } from '@monority/ui/button'
import { PageHeader } from '@monority/ui/page-header'
import { Text } from '@monority/ui/text'

export function PageHeaderBasicExample() {
    return (
        <PageHeader>
            <PageHeader.Main>
                <PageHeader.Kicker>Workspace</PageHeader.Kicker>
                <PageHeader.Title>Overview</PageHeader.Title>
                <PageHeader.Description>
                    Product health, release status, and team activity in one working view.
                </PageHeader.Description>
            </PageHeader.Main>
        </PageHeader>
    )
}

export function PageHeaderWithTitleExample() {
    return (
        <PageHeader>
            <PageHeader.Main>
                <PageHeader.Kicker>Dashboard</PageHeader.Kicker>
                <PageHeader.Title>Welcome back, Avery</PageHeader.Title>
                <PageHeader.Description>
                    Team pipeline stable, 4 items need review today.
                </PageHeader.Description>
                <PageHeader.Meta>
                    <Text size="sm" tone="muted">
                        Updated 5 min ago
                    </Text>
                    <Text size="sm" tone="muted">
                        3 active filters
                    </Text>
                </PageHeader.Meta>
            </PageHeader.Main>
        </PageHeader>
    )
}

export function PageHeaderWithActionsExample() {
    return (
        <PageHeader>
            <PageHeader.Main>
                <PageHeader.Kicker>Projects</PageHeader.Kicker>
                <PageHeader.Title>Projects</PageHeader.Title>
                <PageHeader.Description>
                    Track delivery, health, and ownership across active work.
                </PageHeader.Description>
                <PageHeader.Meta>
                    <Text size="sm" tone="muted">
                        24 active
                    </Text>
                    <Text size="sm" tone="muted">
                        6 at risk
                    </Text>
                </PageHeader.Meta>
            </PageHeader.Main>
            <PageHeader.Actions>
                <Button>New project</Button>
                <Button variant="secondary">Export</Button>
            </PageHeader.Actions>
        </PageHeader>
    )
}
