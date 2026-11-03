import type { DocI18n } from '../doc-messages'

export const kbdI18n: DocI18n = {
    fr: {
        description:
            'Libellé sémantique de touche de clavier pour les raccourcis, menus de commandes et textes d’aide.',
        playgroundLabels: {
            size: 'Taille (size)',
            shortcut: 'Combinaison de touches',
        },
        examples: [{ title: 'Tableau de touches' }, { title: 'Tailles' }],
        propDescriptions: {
            children: 'Libellé d’une seule touche.',
            keys: 'Raccourci sous forme de liste ordonnée rendu avec séparateurs.',
            size: 'Taille de la touche.',
        },
        a11y: [
            'Rend la balise native <kbd>.',
            'Utilisez la prop keys pour les raccourcis multi-touches afin que les combinaisons soient toujours séparées de manière cohérente.',
        ],
    },
}
