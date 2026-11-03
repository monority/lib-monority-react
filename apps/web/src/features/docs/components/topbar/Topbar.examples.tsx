import { Button } from '@monority/ui/button'
import { Topbar } from '@monority/ui/topbar'
import { useLocale } from '../../../../shared/i18n'

export function TopbarBasicExample() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'

    return (
        <Topbar>
            <Topbar.Brand>
                <Topbar.BrandMark>M</Topbar.BrandMark>
                <span>Monority UI</span>
            </Topbar.Brand>
            <Topbar.Nav aria-label={isFr ? 'Navigation principale' : 'Primary navigation'}>
                <Topbar.Link href="#" active>
                    {isFr ? 'Documentation' : 'Documentation'}
                </Topbar.Link>
                <Topbar.Link href="#">{isFr ? 'Composants' : 'Components'}</Topbar.Link>
                <Topbar.Link href="#">{isFr ? 'Thèmes' : 'Themes'}</Topbar.Link>
            </Topbar.Nav>
            <Topbar.Meta>v1.0.0</Topbar.Meta>
        </Topbar>
    )
}

export function TopbarWithContentExample() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'

    return (
        <Topbar>
            <Topbar.Brand>
                <Topbar.BrandMark>M</Topbar.BrandMark>
                <span>Console</span>
            </Topbar.Brand>
            <Topbar.Nav aria-label={isFr ? 'Navigation espace de travail' : 'Workspace navigation'}>
                <Topbar.Link href="#" active>
                    {isFr ? 'Projets' : 'Projects'}
                </Topbar.Link>
                <Topbar.Link href="#">{isFr ? 'Déploiements' : 'Deployments'}</Topbar.Link>
                <Topbar.Link href="#">{isFr ? 'Paramètres' : 'Settings'}</Topbar.Link>
            </Topbar.Nav>
            <Topbar.Status tone="success">{isFr ? 'Opérationnel' : 'Operational'}</Topbar.Status>
            <Topbar.Actions>
                <Button size="sm" variant="ghost">
                    {isFr ? 'Documentation' : 'Documentation'}
                </Button>
                <Button size="sm" variant="primary">
                    {isFr ? 'Nouveau projet' : 'New project'}
                </Button>
            </Topbar.Actions>
        </Topbar>
    )
}
