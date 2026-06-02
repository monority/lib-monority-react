import { Button } from '@/components/actions/button/Button'
import { PageHeader } from '@monority/ui/page-header'

export function PageHeaderBasicExample() {
    return (
        <PageHeader>
            <div className="mr-page-header__main">
                <div className="mr-page-header__eyebrow">Workspace</div>
                <h1 className="mr-page-header__title">Overview</h1>
                <p className="mr-page-header__description">
                    Product health, release status, and team activity in one working view.
                </p>
            </div>
        </PageHeader>
    )
}

export function PageHeaderWithTitleExample() {
    return (
        <PageHeader>
            <div className="mr-page-header__main">
                <div className="mr-page-header__eyebrow">Dashboard</div>
                <h1 className="mr-page-header__title">Welcome back, Avery</h1>
                <p className="mr-page-header__description">
                    Team pipeline stable, 4 items need review today.
                </p>
                <div className="mr-page-header__meta">
                    <span>Updated 5 min ago</span>
                    <span>3 active filters</span>
                </div>
            </div>
        </PageHeader>
    )
}

export function PageHeaderWithActionsExample() {
    return (
        <PageHeader>
            <div className="mr-page-header__main">
                <div className="mr-page-header__eyebrow">Projects</div>
                <h1 className="mr-page-header__title">Projects</h1>
                <p className="mr-page-header__description">
                    Track delivery, health, and ownership across active work.
                </p>
                <div className="mr-page-header__meta">
                    <span>24 active</span>
                    <span>6 at risk</span>
                </div>
            </div>
            <div className="mr-page-header__actions">
                <Button>New project</Button>
                <Button variant="secondary">Export</Button>
            </div>
        </PageHeader>
    )
}
