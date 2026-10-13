import { Topbar } from '@monority/ui/topbar'
import { Button } from '@monority/ui/button'

export function TopbarBasicExample() {
    return (
        <Topbar>
            <Topbar.Brand>
                <Topbar.BrandMark>M</Topbar.BrandMark>
                <span>Monority UI</span>
            </Topbar.Brand>
            <Topbar.Nav aria-label="Navigation principale">
                <Topbar.Link href="#" active>
                    Documentation
                </Topbar.Link>
                <Topbar.Link href="#">Composants</Topbar.Link>
                <Topbar.Link href="#">Thèmes</Topbar.Link>
            </Topbar.Nav>
            <Topbar.Meta>v0.1.0</Topbar.Meta>
        </Topbar>
    )
}

export function TopbarWithContentExample() {
    return (
        <Topbar>
            <Topbar.Brand>
                <Topbar.BrandMark>M</Topbar.BrandMark>
                <span>Console</span>
            </Topbar.Brand>
            <Topbar.Nav aria-label="Navigation espace de travail">
                <Topbar.Link href="#" active>
                    Projets
                </Topbar.Link>
                <Topbar.Link href="#">Déploiements</Topbar.Link>
                <Topbar.Link href="#">Paramètres</Topbar.Link>
            </Topbar.Nav>
            <Topbar.Status tone="success">Opérationnel</Topbar.Status>
            <Topbar.Actions>
                <Button size="sm" variant="ghost">
                    Documentation
                </Button>
                <Button size="sm" variant="primary">
                    Nouveau projet
                </Button>
            </Topbar.Actions>
        </Topbar>
    )
}
