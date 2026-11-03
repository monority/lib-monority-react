import type { DocI18n } from '../doc-messages'

export const topbarI18n: DocI18n = {
    fr: {
        description:
            'Barre supérieure de navigation et d’état persistante collée en haut d’écran avec marque, navigation avec rail actif, indicateur de statut et actions.',
        playgroundLabels: {
            activeTab: 'Onglet actif',
            statusTone: 'Statut système',
            showStatus: 'Afficher le statut',
        },
        examples: [{ title: 'Avec statut et actions' }],
        propDescriptions: {
            children:
                'Contenu de la barre supérieure (Topbar.Brand, Topbar.Nav, Topbar.Actions, etc.).',
        },
        a11y: [
            'Élément sémantique <header> avec repère structurel banner.',
            'Conteneur de navigation balisé avec <nav aria-label="...">.',
            'Lien actif annoté avec aria-current="page".',
            'Indicateur de statut accompagné d’un libellé textuel explicite.',
        ],
    },
}
