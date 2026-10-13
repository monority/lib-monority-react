import { DocPage, type DocPageData } from '../DocPage'
import { TopbarBasicExample, TopbarWithContentExample } from './Topbar.examples'

const docData: DocPageData = {
    title: 'Topbar',
    description:
        "Barre supérieure de navigation et d'état persistante collée en haut d'écran avec marque, navigation avec rail actif, indicateur de statut et actions.",
    importCode: "import { Topbar } from '@monority/ui/topbar'",
    usageCode: `<Topbar>
  <Topbar.Brand>
    <Topbar.BrandMark>M</Topbar.BrandMark>
    <span>Monority UI</span>
  </Topbar.Brand>
  <Topbar.Nav aria-label="Navigation principale">
    <Topbar.Link href="#" active>Documentation</Topbar.Link>
    <Topbar.Link href="#">Composants</Topbar.Link>
  </Topbar.Nav>
  <Topbar.Status tone="success">Opérationnel</Topbar.Status>
  <Topbar.Actions>
    <Button size="sm">Nouveau</Button>
  </Topbar.Actions>
</Topbar>`,
    preview: () => <TopbarBasicExample />,
    examples: [{ title: 'Avec statut et actions', content: <TopbarWithContentExample /> }],
    props: [
        {
            name: 'children',
            type: 'ReactNode',
            defaultValue: '-',
            description:
                'Contenu de la barre supérieure (Topbar.Brand, Topbar.Nav, Topbar.Actions, etc.).',
        },
    ],
    cssHooks: [
        '.mr-topbar',
        '.mr-topbar__brand',
        '.mr-topbar__brand-mark',
        '.mr-topbar__navigation',
        '.mr-topbar__link',
        '.mr-topbar__actions',
        '.mr-topbar__meta',
        '.mr-topbar__status',
        '.mr-topbar__status-dot',
        '[data-active]',
        '[data-tone]',
    ],
    tokens: [
        '--mr-bg-surface',
        '--mr-bg-canvas',
        '--mr-bg-sunken',
        '--mr-border-subtle',
        '--mr-border-default',
        '--mr-accent-solid',
        '--mr-text-primary',
        '--mr-text-secondary',
        '--mr-space-4',
        '--mr-space-6',
    ],
    a11y: [
        'Élément sémantique <header> avec repère structurel banner.',
        'Conteneur de navigation balisé avec <nav aria-label="...">.',
        'Lien actif annoté avec aria-current="page".',
        "Indicateur de statut accompagné d'un libellé textuel explicite.",
    ],
}

export function TopbarDocs() {
    return <DocPage doc={docData} />
}
