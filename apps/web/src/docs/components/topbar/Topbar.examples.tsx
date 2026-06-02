import { Topbar } from '@monority/ui/topbar'
import { Button } from '@/components/actions/button/Button'

export function TopbarBasicExample() {
    return (
        <Topbar>
            <div className="mr-topbar__brand">Monority UI</div>
            <nav className="mr-topbar__navigation" aria-label="Primary">
                <a href="#" aria-current="page">
                    Overview
                </a>
                <a href="#">Components</a>
                <a href="#">Tokens</a>
            </nav>
            <div className="mr-topbar__meta">v0.1.0</div>
        </Topbar>
    )
}

export function TopbarWithContentExample() {
    return (
        <Topbar>
            <div className="mr-topbar__brand">My App</div>
            <nav className="mr-topbar__navigation" aria-label="Workspace">
                <a href="#" aria-current="page">
                    Dashboard
                </a>
                <a href="#">Projects</a>
                <a href="#">Activity</a>
            </nav>
            <div className="mr-topbar__actions">
                <Button size="sm" variant="ghost">
                    Profile
                </Button>
                <Button size="sm">Sign out</Button>
            </div>
        </Topbar>
    )
}
