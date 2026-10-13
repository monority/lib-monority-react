import { Button } from '@monority/ui/button'
import { PageHeader } from '@monority/ui/page-header'

export function MoodboardPageHeader() {
    return (
        <PageHeader role="group" aria-label="Page header">
            <PageHeader.Kicker>INFRASTRUCTURE / CONTROL PLANE</PageHeader.Kicker>
            <PageHeader.Title as="h2">Release control</PageHeader.Title>
            <PageHeader.Description>
                One system for shipping observable changes across every environment.
            </PageHeader.Description>
            <PageHeader.Actions>
                <Button variant="primary" size="sm">
                    Deploy
                </Button>
                <Button variant="ghost" size="sm">
                    Inspect
                </Button>
            </PageHeader.Actions>
        </PageHeader>
    )
}
